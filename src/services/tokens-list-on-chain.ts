import { chunk, keyBy, orderBy } from 'lodash'
import { getTokenDetail } from './token-list'
import axios from 'axios'
import fsSolBubbo from '@/firestore/sol'
import { Chain } from '@/components/Bubbles/bubbles.types'

const getPairInfo = async (pairAddress: string, chain: string) => {
  if (!pairAddress) return

  const dexScreenUrl = `https://api.dexscreener.com/latest/dex/pairs/${chain}/${pairAddress}`

  const pairInfoRes = await axios.get(dexScreenUrl)

  const pair = pairInfoRes.data?.pairs?.find(
    (pair: any) =>
      pair?.pairAddress?.toLowerCase() === pairAddress?.toLowerCase()
  )

  return pair || null
}

const getTokenInfo = async (token: any, chain: string) => {
  const pair = await getPairInfo(token?.pairAddress, chain)

  const fdv = pair ? pair?.fdv : 0
  const mkc = pair ? pair?.marketCap : 0
  const volume = pair ? pair?.volume?.['h24'] : 0

  const h1PriceChangePercentage = pair ? pair?.priceChange?.h1 || 0 : 0
  const h6PriceChangePercentage = pair?.priceChange?.h6 || 0
  const h24PriceChangePercentage = pair?.priceChange?.h24 || 0

  return {
    ...token,
    marketCap: mkc || fdv,
    volume,
    price: pair?.priceUsd || 0,
    h1: h1PriceChangePercentage,
    h6: h6PriceChangePercentage,
    h24: h24PriceChangePercentage,
  }
}

const getTopTokensByChain = async (chain: string) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=true&price_change_percentage=1h,24h,7d,30d,1y&locale=en&category=${chain}-ecosystem&x_cg_demo_api_key=CG-UEVLBWVP3UL1vB4aNm1XnfX6`
  )

  const data = res?.data

  const results: any = []

  if (data) {
    for (let index = 0; index < data.length; index++) {
      const token = data[index]

      if (
        !(token?.symbol || ('' as string))?.includes('usd') &&
        !(token?.symbol || ('' as string))?.includes('btc') &&
        !(token?.symbol || ('' as string))?.includes('staked') &&
        token?.total_volume > 1
      ) {
        results.push({
          ...token,
          coingeckoId: token?.id,
          logoUrl: token?.['image'],
        })
      }
    }
  }

  return results
}

const getPairInfoByAddress = async (tokenAddress: string, chain?: string) => {
  if (!tokenAddress) return

  const dexScreenUrl = `https://api.dexscreener.com//token-pairs/v1/${chain}/${tokenAddress}`
  const pairInfoRes = await axios.get(dexScreenUrl)
  const result = pairInfoRes?.data

  if (result?.length > 0) {
    const orderedData = orderBy(
      result,
      (_) => Number(_?.volume?.['h24'] || 0),
      'desc'
    )

    const selectedItem = orderedData?.[0]

    const socials = keyBy(selectedItem?.info?.socials, 'type')

    const baseToken = selectedItem?.baseToken
    const qToken = selectedItem?.quoteToken

    return {
      coingeckoId: '',
      name: baseToken?.name,
      symbol: baseToken?.symbol,
      pairAddress: selectedItem?.pairAddress,
      website: selectedItem?.info?.websites?.[0]?.url || '',
      x: socials?.['twitter']?.url || '',
      telegram: socials?.['telegram']?.url || '',
      logoUrl: selectedItem?.info?.imageUrl,
    }
  }

  return pairInfoRes.data
}

const fetchTokenDetailsInChunks = async (
  tokens: { coingeckoId: string; logoUrl: string }[],
  chain: string
) => {
  const chunkedTokens = chunk(tokens, 30) // Split into chunks of 30
  let allDetails: any[] = []
  for (const tokenChunk of chunkedTokens) {
    // Fetch token details (max 30 at a time)
    const tokenPromises = tokenChunk.map(({ coingeckoId }) =>
      getTokenDetail(coingeckoId)
    )
    const results = await Promise.allSettled(tokenPromises)

    const validResults = results
      .filter((result, index) => result.status === 'fulfilled' && result.value)
      .map((result: any, index) => ({
        ...result.value,
        logoUrl: tokenChunk[index].logoUrl, // Include logoUrl
      }))

    const enrichedTokens = await Promise.allSettled(
      validResults.map(async (token) => {
        const tokenAddress = token?.platforms?.[chain]

        if (!tokenAddress) return null

        const pairInfo = await getPairInfoByAddress(tokenAddress, chain)

        return {
          ...pairInfo,
          coingeckoId: token?.id,
          logoUrl: token?.logoUrl,
        }
      })
    )

    // Store results
    allDetails.push(
      ...enrichedTokens
        .filter((result) => result.status === 'fulfilled' && result.value)
        .map((result) => (result as PromiseFulfilledResult<any>).value)
    )

    console.log(`Processed ${allDetails.length} tokens so far...`)

    if (chunkedTokens.length > 1) {
      console.log('Rate limit reached! Waiting 1 minute before continuing...')
      await new Promise((resolve) => setTimeout(resolve, 70000)) // Wait 60 seconds
    }
  }

  return allDetails
}

const updateTokensOnChain = async (
  tokensList: any,
  chain: string,
  tokensCoingecko: any
) => {
  const promises: any = []
  const topTokensOnCgkMap = keyBy(tokensCoingecko, 'coingeckoId')

  for (let index = 0; index < tokensList.length; index++) {
    const token = tokensList[index]

    if (token?.pairAddress) {
      promises.push(getTokenInfo(token, chain))
    }
  }

  const data = await Promise.all(promises)

  const filteredData = data.filter((token) => token !== null)

  const dataWithCoingeckoData = filteredData?.map((token) => {
    const cgkData = topTokensOnCgkMap?.[token?.coingeckoId]

    return {
      ...token,
      id: token?.pairAddress,
      week: cgkData?.['price_change_percentage_7d_in_currency'] || 0,
      month: cgkData?.['price_change_percentage_30d_in_currency'] || 0,
      year: cgkData?.['price_change_percentage_1y_in_currency'] || 0,
      ath: cgkData?.ath,
      atl: cgkData?.atl,
      high24h: cgkData?.['high_24h'],
      low24h: cgkData?.['low_24h'],
      rank: cgkData?.['market_cap_rank'] || '',
      price: token?.price || cgkData?.current_price,
      marketCap: token?.marketCap || cgkData?.['market_cap'] || 0,
      updatedAt: new Date(),
    }
  })

  const validTokens: any = []
  const unValidTokens = []

  for (let index = 0; index < dataWithCoingeckoData.length; index++) {
    const token = dataWithCoingeckoData[index]

    if (token?.marketCap > 0 || token?.volume > 0) {
      validTokens.push(token)
    } else {
      unValidTokens.push(token)
    }
  }

  if (validTokens.length > 0) {
    if (chain == Chain.SOL) {
      await fsSolBubbo.batchUpsert(validTokens)
    }
  }

  if (unValidTokens.length > 0) {
    if (chain == Chain.SOL) {
      await fsSolBubbo.batchRemove(unValidTokens)
    }
  }

  return {
    validTokens,
    unValidTokens,
  }
}

export const tokensListOnChainService = {
  getTopTokensByChain,
  fetchTokenDetailsInChunks,
  updateTokensOnChain,
}
