import { useQuery } from '@tanstack/react-query'
import { getTokenPrice, getSuiPrice } from '@7kprotocol/sdk-ts'
import { isSui } from '../utils'
import { getPairInfo } from './useFetchPriceForUserBalances'

export const getPriceFromDex = async (address: string) => {
  const pair = await getPairInfo(address)

  return pair?.priceUsd || 0
}

export const getPrice = async (address: string) => {
  if (isSui(address)) {
    const price = await getSuiPrice()

    return price
  }

  const price = await getTokenPrice(address)
  if (price) {
    return price
  } else {
    const dexPrice = await getPriceFromDex(address)
    return dexPrice
  }
}

export const useCurrencyPrice = (address: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['currency-price', address],
    queryFn: () => getPrice(address),
    enabled: Boolean(address),
    staleTime: 60 * 2000,
    retry: 2,
  })

  return {
    price: data,
    isLoading,
  }
}
