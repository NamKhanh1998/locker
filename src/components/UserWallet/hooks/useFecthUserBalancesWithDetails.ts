import { SwapTokensMap } from '@/components/Swap/config/swapList'
import {
  getPrice,
  getPriceFromDex,
} from '@/components/Swap/hooks/useCurrencyPrice'
import { getCoinsMeta } from '@/components/Swap/hooks/useFetchTokensMeta'
import { useFetchUserBalances } from '@/components/Swap/hooks/useFetchUserBalances'
import { getBalanceAmount } from '@/components/Swap/utils/bigNumber'
import { CoinBalance } from '@mysten/sui/client'
import { useQuery } from '@tanstack/react-query'
import { isEmpty, orderBy } from 'lodash'

const getCoinMetaOnChainAndLocal = async (address: string) => {
  if (!address) return null
  const localData = SwapTokensMap?.[address?.toLowerCase()]

  if (localData) {
    return {
      ...localData,
    }
  }

  const coinMeta = await getCoinsMeta(address)

  return {
    address,
    name: coinMeta?.name,
    symbol: coinMeta?.symbol,
    decimals: coinMeta?.decimals,
    logoUrl: coinMeta?.iconUrl,
    narratives: [],
  }
}

const getBalancesDetail = async (balances?: null | CoinBalance[]) => {
  if (!balances) return

  const metaPromises = balances?.map((item) =>
    getCoinMetaOnChainAndLocal(item?.coinType)
  )
  const pricePromises = balances?.map((item) => getPrice(item?.coinType))

  const metaRes = await Promise.all(metaPromises)
  const priceRes = await Promise.all(pricePromises)

  const results: any = []

  balances?.forEach((item, index) => {
    const balance = getBalanceAmount(
      item?.totalBalance,
      metaRes?.[index]?.decimals
    )

    if (balance.gt(0)) {
      results.push({
        ...metaRes?.[index],
        price: priceRes?.[index] || '',
        balance: balance?.toString(),
      })
    }
  })

  return orderBy(
    results,
    (_) => Number(_?.balance || 0) * Number(_?.price || 0),
    'desc'
  )
}

export const useFecthUserBalancesWithDetails = () => {
  const { balances } = useFetchUserBalances()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-balances-and-details', balances],
    queryFn: () => getBalancesDetail(balances),
    enabled: !isEmpty(balances),
    staleTime: 60 * 10000,
    retry: 2,
  })

  return { data, isLoading, refetch }
}
