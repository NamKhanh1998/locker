import { useQuery } from '@tanstack/react-query'
import { suiClient } from '@/config/sui'
import { Transaction } from '@mysten/sui/transactions'

interface UseEstimateGasFeeProps {
  txb: Transaction | null
  sender: string | null
  enabled?: boolean
}

const estimateGas = async (txb: Transaction | null, sender: string | null) => {
  if (txb && sender) {
    const res = await suiClient.devInspectTransactionBlock({
      transactionBlock: txb,
      sender,
    })

    const gasUsed = res.effects?.gasUsed
    if (!gasUsed) throw new Error('Failed to estimate gas')

    const estimated =
      Number(gasUsed.computationCost) +
      Number(gasUsed.storageCost) -
      Number(gasUsed.storageRebate)

    return Math.ceil(estimated * 1.2)
  }
}

export const useEstimateGasFee = ({
  txb,
  sender,
  enabled = true,
}: UseEstimateGasFeeProps) => {
  return useQuery({
    queryKey: ['estimate-gas-fee', txb, sender],
    queryFn: () => {
      return estimateGas(txb, sender)
    },
    enabled: enabled && !!txb && !!sender,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  })
}
