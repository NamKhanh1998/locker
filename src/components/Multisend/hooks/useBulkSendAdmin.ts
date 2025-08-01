import { Transaction } from '@mysten/sui/transactions'
import { AdminCap, BulkSendPackage, FeeCollector } from '../config'
import { useSignTransaction } from '@mysten/dapp-kit'
import { suiClient } from '@/config/sui'
import { toast } from 'react-toastify'

export const useBulkSendAdmin = () => {
  const { mutateAsync: signTransaction } = useSignTransaction()

  const onChangeFee = async (fee: number) => {
    const txb = new Transaction()
    txb.setGasBudget(100_000_000)

    txb.moveCall({
      target: `${BulkSendPackage}::bulk_sender::set_fee`,

      arguments: [
        txb.object(AdminCap),
        txb.object(FeeCollector),

        txb.pure.u64(fee),
      ],
    })

    const { bytes, signature } = await signTransaction({
      transaction: txb,
    })

    const { digest } = await suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature,
      options: {
        showRawEffects: true,
      },
    })

    toast.success('Change done')
  }

  const onWithdrawFee = async () => {
    const txb = new Transaction()
    txb.setGasBudget(100_000_000)

    txb.moveCall({
      target: `${BulkSendPackage}::bulk_sender::withdraw_fee`,

      arguments: [txb.object(AdminCap), txb.object(FeeCollector)],
    })

    const { bytes, signature } = await signTransaction({
      transaction: txb,
    })

    const { digest } = await suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature,
      options: {
        showRawEffects: true,
      },
    })

    toast.success('WithdrawFee done')
  }

  return { onChangeFee, onWithdrawFee }
}
