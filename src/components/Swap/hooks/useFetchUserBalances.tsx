import { suiClient } from '@/config/sui'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useQuery } from '@tanstack/react-query'

async function getUserBalances(address?: string) {
  if (!address) return null

  try {
    const balances = await suiClient.getAllBalances({
      owner: address,
    })

    return balances
  } catch (error) {
    console.error('Error fetching token balances:', error)
  }
}

export const useFetchUserBalances = () => {
  const currentAccount = useCurrentAccount()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-balances', currentAccount?.address],
    queryFn: () => getUserBalances(currentAccount?.address),
    enabled: Boolean(currentAccount?.address),
    staleTime: 60 * 2000,
    retry: 3,
  })

  return {
    balances: data,
    isLoading,
    refetch,
  }
}
