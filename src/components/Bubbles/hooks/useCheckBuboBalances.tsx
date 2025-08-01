import Flex from '@/components/commonStyled/Flex'
import Text from '@/components/commonStyled/Text'
import { MIN_AMOUNT_HOLDER, tokenAddress } from '@/config/constant'
import { suiClient } from '@/config/sui'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const BuboImg = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.1s;
  &:hover {
    transform: scale(1.06);
  }
`

async function getBuboBalance(address?: string) {
  if (!address) return null

  try {
    const balance = await suiClient.getBalance({
      owner: address,
      coinType: tokenAddress.bubbo,
    })

    return balance?.totalBalance
  } catch (error) {
    console.error('Error fetching token balance:', error)
  }
}

const Content = () => {
  return (
    <Flex alignItems="center">
      <BuboImg
        alt="buy"
        src="/avatar.png"
      />
      <Text
        ml="10px"
        color="gray"
      >
        Welcome BUBO holder 👋
      </Text>
    </Flex>
  )
}

export const useCheckBuboBalances = (showWelcomeText: boolean = false) => {
  const currentAccount = useCurrentAccount()

  const { data, isLoading } = useQuery({
    queryKey: ['bubboBalance', currentAccount?.address],
    queryFn: () => getBuboBalance(currentAccount?.address),
    enabled: Boolean(currentAccount?.address),
    staleTime: 60 * 60000,
    retry: 2,
  })

  const { balance, isBalancesValid } = useMemo(() => {
    const balance = Number(data || 0) / 10 ** 6

    return {
      balance: Number(data || 0) / 10 ** 6,
      isBalancesValid: balance >= MIN_AMOUNT_HOLDER,
    }
  }, [data])

  useEffect(() => {
    if (currentAccount?.address && balance > 0 && showWelcomeText) {
      toast.info(<Content />, {
        position: 'top-center',
        icon: false,
        className: 'custom-toast',
        progressClassName: 'custom-toast-progress',
      })
    }
  }, [currentAccount?.address, balance])

  return { balance, isBalancesValid, isLoading }
}
