import { useEffect, useMemo } from 'react'
import { useFetchUserBalances } from './useFetchUserBalances'
import { isEmpty, keyBy, orderBy } from 'lodash'
import { ICurrency } from '../state'
import { getBalanceAmount } from '../utils/bigNumber'
import { useFetchPriceForUserBalances } from './useFetchPriceForUserBalances'

import { useFetchTrendingPools } from './useFetchTrendingPools'
import { useCombineTokenList } from './useCombineTokenList'

export const useCombineTokenListWithBalances = () => {
  const swapTokensList = useCombineTokenList()

  const { balances, isLoading, refetch } = useFetchUserBalances()
  const { balancesWithPrice } = useFetchPriceForUserBalances(balances)
  const { data: trendingPools, isLoading: trendingPoolsLoading } =
    useFetchTrendingPools()

  const balancesMap = useMemo(() => {
    if (isLoading || !balancesWithPrice) return {}

    return keyBy(balancesWithPrice, (_) => _?.coinType?.toLowerCase())
  }, [isLoading, balancesWithPrice])

  const tokenListWithBalance = useMemo(() => {
    if (isEmpty(balancesMap)) return swapTokensList

    return swapTokensList?.map((token: ICurrency) => {
      const item = balancesMap?.[token?.address?.toLowerCase()] as any
      const rawBalance = item?.totalBalance || '0'

      const balance = getBalanceAmount(rawBalance, token?.decimals)

      return {
        ...token,
        balance: balance?.toString(),
        price: item?.price,
      }
    })
  }, [balancesMap, swapTokensList])

  const sortedTokenListWithBalance = useMemo(() => {
    return orderBy(
      tokenListWithBalance,
      (_) => {
        if (_?.balance && _?.price) {
          return Number(_?.balance) * Number(_?.price)
        }

        return Number(_?.balance || 0)
      },
      'desc'
    )
  }, [tokenListWithBalance])

  // trending tokens
  const trendingListWithBalance = useMemo(() => {
    if (isEmpty(balancesMap)) return trendingPools || []

    return trendingPools?.map((token: ICurrency, index) => {
      const item = balancesMap?.[token?.address?.toLowerCase()] as any
      const rawBalance = item?.totalBalance || '0'

      const balance = getBalanceAmount(rawBalance, token?.decimals)

      return {
        ...token,
        balance: balance?.toString(),
        price: item?.price,
      }
    })
  }, [balancesMap, trendingPools, trendingPoolsLoading])

  const sortedTrendingListWithBalance = useMemo(() => {
    return orderBy(
      trendingListWithBalance,
      (_) => {
        if (_?.balance && _?.price) {
          return Number(_?.balance) * Number(_?.price || 0)
        }

        return Number(_?.balance || 0)
      },
      'desc'
    )
  }, [trendingListWithBalance])

  return {
    tokenListWithBalance: sortedTokenListWithBalance,
    trendingListWithBalance: sortedTrendingListWithBalance,
    balancesMap,
    refetch,
    isLoading,
  }
}
