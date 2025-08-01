import { TokenAnalytics } from '@/components/NewRadar/type'
import { nexaKey } from '@/config/apiKey'
import axios from 'axios'
import { chunk, flatMap, toUpper, uniq, uniqBy } from 'lodash'
import { getFromCache, getFromCacheNoUpdate } from './nexa-token-cache'
import dayjs from 'dayjs'
import { BUBO } from '@/components/Swap/state'

const stable = ['USDC', 'USDT']

const getTrendingTokens = async () => {
  const url = `https://api-ex.insidex.trade/coins/trending`

  const res = await axios.get(url, {
    headers: {
      'x-api-key': nexaKey,
    },
  })

  const coins = res.data as TokenAnalytics[]

  const filterCoins = coins?.filter(
    (coin) => !stable?.includes(toUpper(coin?.coinMetadata?.symbol))
  )

  return filterCoins
}

const getNewTokens = async () => {
  const updatedAt = dayjs().subtract(6, 'hour').unix()
  const url = `https://api.mevx.io/api/v1/pools?chain=sui&limit=100&offset=0&marketCap[lte]=1000000000&interval=24h&orderBy=createdAt desc&updatedAt[gte]=${updatedAt}&context=trending`

  const res = await axios.get(url)

  const pools = res.data?.pools

  const uniqTokens = uniqBy(pools, 'baseToken')
  return uniqTokens?.map((_: any) => _?.baseToken)
}

const getTokenMarketData = async (coinTypes: string[]) => {
  const mainUrl = `https://api-ex.insidex.trade/coins/multiple/market-data?coins=`

  const chunks = chunk(coinTypes, 20)

  const tokens = []

  for (let index = 0; index < chunks.length; index++) {
    const chunk = chunks[index]

    const coinTypeStr = chunk.join(',')
    const newUrl = `${mainUrl}${coinTypeStr}`

    try {
      const res = await axios.get(newUrl, {
        headers: {
          'x-api-key': nexaKey,
        },
      })

      const result = res.data
      tokens.push(result)
    } catch (error) {
      console.log(error)

      continue
    }
  }

  return flatMap(tokens)?.filter(
    (token: TokenAnalytics) => Number(token?.volume24h || 0) > 100
  )
}

const getTrendingTokensOnRaidenX = async () => {
  const url =
    'https://api.raidenx.io/api/v1/sui/pairs/trending?page=1&limit=100&resolution=24h&network=sui'

  const res = await axios.get(url)

  const filterData = res?.data?.filter(
    (token: any) =>
      (token?.bondingCurve === null || token?.bondingCurve === 1) &&
      Number(token?.stats?.volume?.['24h'] || 0) > 500
  )
  return filterData?.map((_: any) => _?.tokenBase?.address)
}

export const syncTrendingTokens = async () => {
  const cacheName = 'trending-tokens'

  try {
    const marketData = await getFromCache(cacheName, 0, async () => {
      const trendingTokens = await getTrendingTokens()
      const _trendingTokens = await getTrendingTokensOnRaidenX()

      const trendingTokensCoinTypes = trendingTokens?.map(
        (coin) => coin.coinMetadata.coinType
      )

      const combineAddress = uniq(
        [...trendingTokensCoinTypes, ..._trendingTokens, BUBO.address]?.filter(
          (_) => !!_
        )
      )
      const marketData = await getTokenMarketData(combineAddress as string[])

      return marketData
    })
    return marketData
  } catch (error) {}
}

export const syncNewTokens = async () => {
  const cacheName = 'new-tokens'
  try {
    const marketData = await getFromCache(cacheName, 0, async () => {
      const newTokens = await getNewTokens()

      const marketData = await getTokenMarketData(newTokens)

      const serializeData = marketData?.filter((coin: TokenAnalytics) => {
        let timeCreated = Number(coin?.timeCreated || 0)

        if (timeCreated > 1e10) {
          timeCreated = Math.floor(timeCreated / 1000)
        }
        const timeAgo = dayjs().diff(dayjs.unix(timeCreated), 'second')

        return Number(coin?.timeCreated || 0) > 0 && timeAgo < 60 * 60 * 24
      })
      return serializeData
    })
    return marketData
  } catch (error) {}
}

export const getTrendingCoins = async () => {
  const cacheName = 'trending-tokens'

  const result = await getFromCacheNoUpdate(cacheName)

  return result
}

export const getNewCoins = async () => {
  const cacheName = 'new-tokens'

  const result = await getFromCacheNoUpdate(cacheName)

  return result
}
