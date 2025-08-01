import axios from 'axios'

import fsSuiTokens from '@/firestore/sui'
import fsSolTokens from '@/firestore/sol'
import fsBeraTokens from '@/firestore/bera'
import { chunk, flatMap, keyBy, orderBy, sumBy } from 'lodash'
import { tokensList as suiTokensList } from '@/config/tokens/sui'
import { tokensList as solTokensList } from '@/config/tokens/solana'
import { tokensList as berachainTokensList } from '@/config/tokens/berachain'

import { Chain } from '@/components/Bubbles/bubbles.types'

import fsRaidenX from '@/firestore/raidenX'
import { getFromCache } from './firestore-cache'

const apiKey = 'CG-4qQpZs6EL4iHuH4gYQR51mYX'
const apiKey2 = 'CG-B8BkJFtUmjZW9GEquuSc4gw1'

const getTopTokenCgk = async (chain: Chain) => {
  let slug = 'sui-ecosystem'
  if (chain === Chain.SOL) {
    slug = 'solana-ecosystem'
  }

  if (chain === Chain.BERA) {
    slug = 'berachain-ecosystem'
  }
  const useApiKey = chain === Chain.SUI ? apiKey : apiKey2

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&price_change_percentage=1h,24h,7d,30d,1y&locale=en&category=${slug}&x_cg_demo_api_key=${useApiKey}`

  const res = await axios.get(url)

  return res.data
}

const getTokenList = (chain: Chain) => {
  if (chain === Chain.SUI) {
    return suiTokensList
  }

  if (chain === Chain.SOL) {
    return solTokensList
  }

  return berachainTokensList
}

const getPairInfo = async (tokenAddres: string, chain: Chain) => {
  if (!tokenAddres) return

  let slug = 'sui'

  if (chain === Chain.SOL) {
    slug = 'solana'
  }

  if (chain === Chain.BERA) {
    slug = 'berachain'
  }

  const dexScreenUrl = `https://api.dexscreener.com/token-pairs/v1/${slug}/${tokenAddres}`

  try {
    const pairInfoRes = await axios.get(dexScreenUrl)

    const pairs = pairInfoRes?.data || []

    const filteredPair = pairs?.filter(
      (pair: any) =>
        pair?.baseToken?.address?.toLowerCase() === tokenAddres?.toLowerCase()
    )

    const orderedPairs = orderBy(
      filteredPair,
      (_: any) => Number(_?.liquidity?.usd) || 0,
      'desc'
    )

    const pair = orderedPairs?.at(0)

    const totalLiquidity = sumBy(
      pairs,
      (_: any) => Number(_?.liquidity?.usd) || 0
    )

    const totalVolume = sumBy(
      pairs,
      (_: any) => Number(_?.volume?.['h24']) || 0
    )

    return pair ? { ...pair, totalLiquidity, totalVolume } : null
  } catch (error) {
    return null
  }
}

const getTokenInfo = async (token: any, chain: Chain) => {
  const pair = await getPairInfo(token?.address, chain)
  console.log(token?.symbol)

  const fdv = pair ? pair?.fdv : 0
  const mkc = pair ? pair?.marketCap : 0
  const totalLiquidity = pair ? pair?.totalLiquidity : 0
  const volume = pair ? pair?.totalVolume || pair?.volume?.['h24'] : 0

  const h1PriceChangePercentage = pair ? pair?.priceChange?.h1 || 0 : 0
  const h6PriceChangePercentage = pair?.priceChange?.h6 || 0
  const h24PriceChangePercentage = pair?.priceChange?.h24 || 0

  return {
    ...token,
    activePairAddress: pair?.pairAddress,
    marketCap: mkc || fdv,
    volume,
    price: pair?.priceUsd || 0,
    h1: h1PriceChangePercentage,
    h6: h6PriceChangePercentage,
    h24: h24PriceChangePercentage,
    totalLiquidity,
  }
}

const updateTokens = async (chain: Chain) => {
  const topTokensOnCgk = await getTopTokenCgk(chain)

  const topTokensOnCgkMap = keyBy(topTokensOnCgk, 'id')

  const raidenXData = chain === Chain.SUI ? await fsRaidenX.getAll() : null

  let raidenXDataMap = null

  if (raidenXData) {
    raidenXDataMap = keyBy(raidenXData, (_) => _?.id)
  }

  const tokensList = getTokenList(chain)

  const promises: any = []

  for (let index = 0; index < tokensList.length; index++) {
    const token = tokensList[index]

    if (token?.pairAddress) {
      promises.push(getTokenInfo(token, chain))
    }
  }

  const chunks = chunk(promises, 100)

  let results = []

  for (let index = 0; index < chunks.length; index++) {
    const chunk = chunks[index]

    const data = await Promise.all(chunk)

    results.push(data)
  }

  const flatmapData = flatMap(results)

  const filteredData = flatmapData.filter(
    (token: any) => token !== null && Boolean(token?.pairAddress)
  )

  const dataWithCoingeckoData = filteredData?.map((token: any) => {
    const cgkData = topTokensOnCgkMap?.[token?.coingeckoId]

    const raidenXToken = raidenXDataMap
      ? raidenXDataMap?.[token?.address?.toLowerCase()]
      : null

    return {
      ...token,
      id: token?.pairAddress,
      week:
        cgkData?.['price_change_percentage_7d_in_currency'] ||
        raidenXToken?.priceStats?.oneWeek ||
        0,
      month:
        cgkData?.['price_change_percentage_30d_in_currency'] ||
        raidenXToken?.priceStats?.oneMonth ||
        0,
      year:
        cgkData?.['price_change_percentage_1y_in_currency'] ||
        raidenXToken?.priceStats?.oneYear ||
        0,
      ath: cgkData?.ath || 0,
      atl: cgkData?.atl || 0,
      high24h: cgkData?.['high_24h'] || 0,
      low24h: cgkData?.['low_24h'] || 0,
      rank: cgkData?.['market_cap_rank'] || '',
      price: token?.price || cgkData?.current_price || 0,
      marketCap: token?.marketCap || cgkData?.['market_cap'] || 0,
      updatedAt: new Date(),
    }
  })

  const validTokens = []
  const unValidTokens = []

  for (let index = 0; index < dataWithCoingeckoData.length; index++) {
    const token = dataWithCoingeckoData[index]

    if (
      (token?.marketCap > 0 || token?.volume > 0) &&
      token?.totalLiquidity > 0
    ) {
      validTokens.push(token)
    } else {
      unValidTokens.push(token)
    }
  }

  let fs = fsSuiTokens

  if (chain === Chain.SOL) {
    fs = fsSolTokens
  }

  if (chain === Chain.BERA) {
    fs = fsBeraTokens
  }

  if (validTokens.length > 0) {
    await fs.batchUpsert(validTokens)
  }

  if (unValidTokens.length > 0) {
    await fs.batchRemove(unValidTokens)
  }

  return {
    validTokens,
    unValidTokens,
  }
}

// const updateTokens = async (chain: any) => {

// const res: any = []
// for (let index = 0; index < tokens.length; index++) {
//   const element = tokens[index]
//   if (element.coingeckoId) {
//     const r = await getTokenDetail(element.coingeckoId)
//     if (r?.address) {
//       res.push({
//         ...element,
//         address: r?.address,
//       })
//     }
//   }
// }
// return res
// DOWNLOAD IMG
// const items = tokens?.filter((_) => !!_?.logoUrl)
// const chunks = chunk(items, 20)
// for (let index = 0; index < chunks.length; index++) {
//   const chunk = chunks[index]
//   await downloadImages(chunk, './downloads')
// }
// INFO from dexscreen
// const res: any = await Promise.all(
//   tokens.map(async (token) => {
//     const res = await getPairInfoByPairAddress(token?.pairAddress)
//     return res ? { ...token, ...res } : null
//   })
// )
// return res
// return data
// return data
// // Lọc bỏ các giá trị null (tránh push undefined vào mảng)
// return data.filter(Boolean)
// const promises: any = []
// for (let index = 0; index < tokensList.length; index++) {
//   const token = tokensList[index]
//   if (token?.pid) {
//     promises.push(getTokenInfo(token))
//   }
// }
// const data = await Promise.all(promises)
// const filteredData = data.filter((token) => token !== null)
// if (filteredData.length > 0) {
//   await fsTokens.batchUpsert(filteredData)
// }
// return filteredData
// }

const getTokenFromCache = async (chain: Chain) => {
  const cacheName = `${chain}-tokens`

  const tokens = await getFromCache(cacheName, 300, async () => {
    if (chain == Chain.SUI) {
      const result = await fsSuiTokens.getAll()

      return result
    }
    if (chain == Chain.SOL) {
      const result = await fsSolTokens.getAll()

      return result
    }
    if (chain == Chain.BERA) {
      const result = await fsBeraTokens.getAll()

      return result
    }
  })

  return tokens
}

const tokenService = {
  updateTokens,
  getTokenFromCache,
}

export default tokenService
