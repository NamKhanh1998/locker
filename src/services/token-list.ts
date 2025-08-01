import axios from 'axios'
import { keyBy, orderBy } from 'lodash'
import fs from 'fs'
import path from 'path'

export const getTokenDetail = async (id: any) => {
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&x_cg_demo_api_key=CG-UEVLBWVP3UL1vB4aNm1XnfX6`

  const res = await axios.get(url)

  const data = res?.data

  return { address: data?.platforms?.berachain }
}

// export const getTopTokensOnSui = async () => {
//   const res = await axios.get(
//     'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=true&price_change_percentage=1h,24h,7d,30d,1y&locale=en&category=sui-ecosystem&x_cg_demo_api_key=CG-UEVLBWVP3UL1vB4aNm1XnfX6'
//   )

//   return res?.data
// }

export const getTopTokensOnSui = async () => {
  const res = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&price_change_percentage=1h,24h,7d,30d,1y&locale=en&category=berachain-ecosystem&x_cg_demo_api_key=CG-UEVLBWVP3UL1vB4aNm1XnfX6'
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
          coingeckoId: token?.id,
          symbol: token?.symbol,
          name: token?.name,
          logoUrl: token?.['image'],
        })
      }
    }
  }

  return results
}

export const getPairInfoByAddress = async (tokenAddress: string) => {
  if (!tokenAddress) return

  const dexScreenUrl = `https://api.dexscreener.com//token-pairs/v1/berachain/${tokenAddress}`
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
      name: baseToken?.name,
      symbol: baseToken?.symbol,
      pairAddress: selectedItem?.pairAddress,
      website: selectedItem?.info?.websites?.[0]?.url || '',
      x: socials?.['twitter']?.url || '',
      telegram: socials?.['telegram']?.url || '',
      // logoUrl: selectedItem?.info?.imageUrl,
    }
  }

  return pairInfoRes.data
}

export const getPairInfoByPairAddress = async (pairAddress: string) => {
  if (!pairAddress) return

  const dexScreenUrl = `https://api.dexscreener.com/latest/dex/pairs/berachain/${pairAddress}`
  const pairInfoRes = await axios.get(dexScreenUrl)

  const result = pairInfoRes?.data?.pairs

  console.log(result)

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
      address: baseToken?.address,
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

export const downloadImages = async (tokens: any[], savePath: string) => {
  // Đảm bảo thư mục tồn tại
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath, { recursive: true })
  }

  await Promise.all(
    tokens.map(async (token, index) => {
      try {
        const response = await axios.get(token?.logoUrl, {
          responseType: 'arraybuffer',
        })
        const fileName = path.join(
          savePath,
          `${token?.pairAddress?.toLowerCase()}.png`
        )
        fs.writeFileSync(fileName, response.data)
        console.log(`✅ Downloaded: ${fileName}`)
      } catch (error) {
        console.error(`❌ Failed to download ${token?.logoUrl}:`, error)
      }
    })
  )

  console.log('🎉 All images downloaded!')
}
