import { CoinBalance } from '@mysten/sui/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { keyBy, orderBy } from 'lodash'
import { useMemo } from 'react'
import { SwapTokensMap } from '../config/swapList'
import { getPrice } from './useCurrencyPrice'

export const getPairInfo = async (address: string) => {
  const dexScreenUrl = `https://api.dexscreener.com/token-pairs/v1/sui/${address}`

  try {
    const pairInfoRes = await axios.get(dexScreenUrl)

    const pairs = pairInfoRes?.data || []

    const filteredPair = pairs?.filter(
      (pair: any) =>
        pair?.baseToken?.address?.toLowerCase() === address?.toLowerCase()
    )

    const orderedPairs = orderBy(
      filteredPair,
      (_: any) => Number(_?.liquidity?.usd) || 0,
      'desc'
    )

    const pair = orderedPairs?.at(0)

    return pair
  } catch (error) {
    return null
  }
}

const getPriceWithCoinMeta = async (address: string) => {
  const price = await getPrice(address)

  return {
    price: price || 0,
    address: address?.toLowerCase(),
  }
}

const getPrices = async (balances: CoinBalance[] | undefined | null) => {
  if (!balances) return null

  const promises = []

  for (let index = 0; index < balances.length; index++) {
    const balance = balances[index]

    if (
      SwapTokensMap?.[balance?.coinType.toLowerCase()] &&
      Number(balance?.totalBalance) > 0
    ) {
      promises.push(getPriceWithCoinMeta(balance?.coinType))
    }
  }

  const results = await Promise.all(promises)

  const filteredRes = results?.filter((_) => Boolean(_))

  return keyBy(filteredRes, (_) => _?.address?.toLowerCase())
}

export const useFetchPriceForUserBalances = (
  balances: CoinBalance[] | undefined | null
) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['balances-price', balances],
    queryFn: () => getPrices(balances),
    enabled: Boolean(balances),
    staleTime: 60 * 1000,
    retry: 1,
  })

  const balancesWithPrice = useMemo(() => {
    if (!data || isLoading) return balances

    return balances?.map((balance) => {
      const coinMeta = data?.[balance.coinType.toLowerCase()]

      return {
        ...balance,
        price: coinMeta?.price,
      }
    })
  }, [balances, data, isLoading])

  return { balancesWithPrice }
}
