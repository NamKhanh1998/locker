import { suiClient } from '@/config/sui'
import { useQuery } from '@tanstack/react-query'
import { SwapTokensList } from '../config/swapList'

export async function getCoinsMeta(address?: string) {
  if (!address) return null

  try {
    const coinMeta = await suiClient.getCoinMetadata({
      coinType: address,
    })

    return coinMeta
  } catch (error) {
    console.error('Error fetching token coinMeta:', error)
  }
}

const newList = SwapTokensList.slice(100, 200)

const getAllMeta = async () => {
  const promises = []

  for (let index = 0; index < newList.length; index++) {
    const element = newList[index]

    promises.push(getCoinsMeta(element?.address))
  }

  const result = await Promise.all(promises)

  return newList?.map((_, index) => ({
    ..._,
    decimals: result[index]?.decimals,
  }))
}

export const useFetchTokensMeta = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['coinMeta'],
    queryFn: () => getAllMeta(),
    enabled: true,
    staleTime: 600 * 1000,
    retry: 3,
  })

  console.log(data)

  return {
    balances: data,
    isLoading,
    refetch,
  }
}
