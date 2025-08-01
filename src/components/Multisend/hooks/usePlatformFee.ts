import { useQuery } from '@tanstack/react-query'
import { suiClient } from '@/config/sui'
import { Transaction } from '@mysten/sui/transactions'
import { FeeCollector } from '../config'
import { getBalanceAmount } from '@/components/Swap/utils/bigNumber'

const estimateGas = async () => {
  const feeObj = await suiClient.getObject({
    id: FeeCollector,
    options: { showContent: true },
  })
  const fee = Number((feeObj?.data?.content as any)?.fields?.fee_amount)

  return getBalanceAmount(fee?.toString(), 9)?.toString()
}

export const usePlatformFee = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['usePlatformFee'],
    queryFn: () => {
      return estimateGas()
    },
    enabled: true,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return { fee: data, isLoading }
}
