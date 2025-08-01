import { tryParseDecimalAmount } from '@/components/Swap/utils/bigNumber'
import { getOwnedTokenIds } from '@/components/UserWallet/hooks/useTransferToken'
import { suiClient } from '@/config/sui'
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSignTransaction,
} from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { toast } from 'react-toastify'
import { useCallback } from 'react'
import axios from 'axios'

const configObjId =
  '0xf8e8da152bec621832460f56382948bee950b225edf82d952609385ed9adfecd'

export const useCallMoveFunction = () => {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction()
  const { mutateAsync: signTransaction } = useSignTransaction()

  const currentAddress = useCurrentAccount()

  const lock = useCallback(
    async (coinType: string, amount: string, recipient: string) => {
      if (!coinType || !amount || !recipient) return

      try {
        const txb = new Transaction()
        txb.setGasBudget(100_000_000)

        const coinMeta = await suiClient.getCoinMetadata({
          coinType: coinType,
        })

        const amountBN = tryParseDecimalAmount(
          amount,
          coinMeta?.decimals!
        ).toNumber()

        const coinIds = await getOwnedTokenIds(
          coinType,
          currentAddress?.address!
        )

        const [primaryCoin, ...rest] = coinIds.map((id) => txb.object(id))

        if (rest?.length) txb.mergeCoins(primaryCoin, rest)

        const [splitCoin] = txb.splitCoins(primaryCoin, [amountBN])

        const unlockTime = new Date().getTime() + 10 * 1000

        txb.moveCall({
          target:
            '0xda75412b5ef25bcb2ff150caeb804d0864c477c28978d19feeb8ce51a9c4e3e5::locker::create_lock',
          typeArguments: [coinType],
          arguments: [
            txb.object(configObjId),
            splitCoin,
            txb.pure.address(recipient),
            txb.pure.u64(amountBN?.toString()),
            txb.pure.u64(unlockTime),
            txb.object('0x6'),
          ],
        })

        const { bytes, signature } = await signTransaction({
          transaction: txb,
        })

        const executeResult = await suiClient.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: {
            showRawEffects: true,
            showBalanceChanges: true,
            showObjectChanges: true,
          },
        })

        const objChanges = executeResult.objectChanges
        console.log(objChanges)

        const lockContract = objChanges?.find((obj: any) =>
          (obj?.objectType as string).includes(`locker::LockContract`)
        )

        const data = {
          ...lockContract,
          recipient: recipient,
          id: (lockContract as any)?.objectId,
          token: coinType,
          amount,
        }

        await axios.post('/api/lock', data)
        toast.success('Transaction executed successfully')
        console.log('✅ Transaction executed successfully:', executeResult)
        return executeResult
      } catch (err: any) {
        toast.error('Transaction failed')
        console.log('❌ Transaction failed:', err)
        throw new Error(`Failed to execute dispatch: ${err?.message || err}`)
      }
    },
    [signAndExecute, currentAddress]
  )

  const unlock = useCallback(
    async (locker: string, coinType: string) => {
      if (!locker) return

      try {
        const txb = new Transaction()
        txb.setGasBudget(100_000_000)

        txb.moveCall({
          target:
            '0xda75412b5ef25bcb2ff150caeb804d0864c477c28978d19feeb8ce51a9c4e3e5::locker::unlock',
          typeArguments: [coinType],

          arguments: [
            txb.object(configObjId),
            txb.object(locker),
            txb.object('0x6'),
          ],
        })

        const { bytes, signature } = await signTransaction({
          transaction: txb,
        })

        const executeResult = await suiClient.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: {
            showRawEffects: true,
            showBalanceChanges: true,
            showObjectChanges: true,
          },
        })

        // const objChanges = executeResult.objectChanges
        // console.log(objChanges)

        // const lockContract = objChanges?.find((obj: any) =>
        //   (obj?.objectType as string).includes(`locker::LockContract`)
        // )

        // await axios.post('/api/lock', data)
        toast.success('Transaction executed successfully')
        console.log('✅ Transaction executed successfully:', executeResult)
        return executeResult
      } catch (err: any) {
        toast.error('Transaction failed')
        console.log('❌ Transaction failed:', err)
      }
    },
    [signAndExecute, currentAddress]
  )

  return { lock, unlock }
}
