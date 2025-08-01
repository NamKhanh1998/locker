import { useQuery } from '@tanstack/react-query'
import { extractSuiType } from '../utils'
import axios from 'axios'
import { flatMap, uniqBy } from 'lodash'
import { getCoinsMeta } from './useFetchTokensMeta'
import { SwapTokensMap } from '../config/swapList'

const getCoinMetaOnChainAndLocal = async (token: {
  address: string
  price: string
}) => {
  const localData = SwapTokensMap?.[token?.address?.toLowerCase()]

  if (localData) {
    return {
      ...localData,
      price: token?.price,
    }
  }

  return null

  // const coinMeta = await getCoinsMeta(token?.address)

  // return {
  //   ...token,
  //   name: coinMeta?.name,
  //   symbol: coinMeta?.symbol,
  //   decimals: coinMeta?.decimals,
  //   logoUrl: coinMeta?.iconUrl,
  //   narratives: [],
  // }
}

const getTrendingPoolsByPage = async (page: number) => {
  const url = `https://api.geckoterminal.com/api/v2/networks/sui-network/trending_pools?page=${page}`
  const res = await axios.get(url)

  const modifyData: any = []

  res?.data?.data?.forEach((item: any) => {
    const relationships = item?.relationships
    const attributes = item?.attributes

    const baseToken = relationships?.base_token?.data?.id
    const price = attributes?.base_token_price_usd
    const liquidity = attributes?.reserve_in_usd

    if (Number(liquidity) > 1000) {
      modifyData.push({
        address: extractSuiType(baseToken),
        price,
      })
    }
  })

  return modifyData
}

const pages = [1, 2, 3]

const getTrendingPools = async () => {
  const promises: any = []
  const metaPromises: any = []

  for (let index = 0; index < pages.length; index++) {
    const page = pages[index]
    promises.push(getTrendingPoolsByPage(page))
  }

  const result = await Promise.all(promises)

  const uniqData = uniqBy(flatMap(result), 'address')

  for (let index = 0; index < uniqData.length; index++) {
    const element = uniqData[index]
    metaPromises?.push(getCoinMetaOnChainAndLocal(element))
  }

  const metaRes = await Promise.all(metaPromises)

  return metaRes
    ?.filter((_) => !!_)
    ?.map((_, index) => ({ ..._, rank: index + 1 }))
}

export const useFetchTrendingPools = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trending-pools'],
    queryFn: getTrendingPools,
    enabled: true,
    staleTime: 60 * 10000,
    retry: 2,
  })

  return {
    data,
    isLoading,
  }
}
