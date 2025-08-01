import { isSui } from '@/components/Swap/utils'
import {
  BIG_ZERO,
  tryParseDecimalAmount,
} from '@/components/Swap/utils/bigNumber'
import { getOwnedTokenIds } from '@/components/UserWallet/hooks/useTransferToken'
import { suiClient } from '@/config/sui'
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSignTransaction,
} from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { size } from 'lodash'
import { useCallback } from 'react'
import { BulkSendPackage, FeeCollector } from '../config'
import { getErrorMessage } from '../utils'
import { useBulkSendActionState } from './useBulkSendActionState'
import { ICurrencyWBalance } from './useManageBulkSendState'

const prepareSplitCoin = async (
  txb: Transaction,
  token: ICurrencyWBalance,
  totalAmounts: any,
  userAddress: string
) => {
  if (isSui(token)) {
    const [_splitCoin] = txb.splitCoins(txb.gas, [totalAmounts.toNumber()])
    return _splitCoin
  }

  const coinIds = await getOwnedTokenIds(token.address, userAddress)
  const [primaryCoin, ...rest] = coinIds.map((id) => txb.object(id))

  if (rest.length) txb.mergeCoins(primaryCoin, rest)

  const [_splitCoin] = txb.splitCoins(primaryCoin, [totalAmounts.toNumber()])
  return _splitCoin
}

export const useBulkSend = () => {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction()
  const { mutateAsync: signTransaction } = useSignTransaction()
  const currentAccount = useCurrentAccount()

  const { setBulkSendActionState } = useBulkSendActionState()

  const onExcute = useCallback(
    async (
      token: ICurrencyWBalance,
      addressList: string[],
      amountsList: string[]
    ) => {
      setBulkSendActionState((p) => ({
        ...p,
        showConfirmModal: true,
        attemptingTxn: true,
      }))
      try {
        const txb = new Transaction()

        const userAddress = currentAccount?.address
        if (!userAddress) throw new Error('User address not found')

        // Parse amounts and calculate total
        let totalAmounts = BIG_ZERO
        const parsedAmounts: string[] = amountsList.map((item) => {
          const amount = tryParseDecimalAmount(item, token.decimals)
          totalAmounts = totalAmounts.plus(amount)
          return amount.toString()
        })

        if (size(addressList) !== parsedAmounts.length) {
          throw new Error('Address list and amounts list size mismatch')
        }

        // Get fee object
        const feeObj = await suiClient.getObject({
          id: FeeCollector,
          options: { showContent: true },
        })
        const fee = Number((feeObj?.data?.content as any)?.fields?.fee_amount)

        // Split fee
        const [splitFee] = txb.splitCoins(txb.gas, [fee])

        // Handle split coin logic
        const splitCoin = await prepareSplitCoin(
          txb,
          token,
          totalAmounts,
          userAddress
        )

        // Build move call
        txb.moveCall({
          target: `${BulkSendPackage}::bulk_sender::bulk_send`,
          typeArguments: [token.address],
          arguments: [
            txb.object(FeeCollector),
            splitCoin,
            splitFee,
            txb.pure.vector('u64', parsedAmounts),
            txb.pure.vector('address', addressList),
          ],
        })

        // calculate gas
        const res = await suiClient.devInspectTransactionBlock({
          transactionBlock: txb,
          sender: userAddress,
        })

        const gasUsed = res.effects?.gasUsed
        if (!gasUsed) throw new Error('Failed to estimate gas')

        const estimatedGas =
          Number(gasUsed.computationCost) +
          Number(gasUsed.storageCost) -
          Number(gasUsed.storageRebate)

        const gasWithBuffer = Math.ceil(estimatedGas * 1.2)
        txb.setGasBudget(gasWithBuffer)

        const { bytes, signature } = await signTransaction({ transaction: txb })

        const { digest } = await suiClient.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: { showRawEffects: true },
        })

        setBulkSendActionState((p) => ({
          ...p,
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: digest,
        }))
      } catch (error: any) {
        console.log(error)

        setBulkSendActionState((p) => ({
          ...p,
          attemptingTxn: false,
          errorMessage: getErrorMessage(error),
        }))
      }
    },
    [signAndExecute, currentAccount, setBulkSendActionState]
  )

  return { onExcute }
}
