import { SUI } from '@/components/Swap/state'
import { suiClient } from '@/config/sui'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useQuery } from '@tanstack/react-query'

async function getUserSuiBalances(address?: string) {
  if (!address) return null

  try {
    const balances = await suiClient.getBalance({
      coinType: SUI.address,
      owner: address,
    })

    return balances
  } catch (error) {
    console.error('Error fetching token balances:', error)
  }
}

export const useFetchUserSuiBalances = () => {
  const currentAccount = useCurrentAccount()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['user-sui-balances', currentAccount?.address],
    queryFn: () => getUserSuiBalances(currentAccount?.address),
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
