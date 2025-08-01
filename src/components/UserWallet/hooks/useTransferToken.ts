import { ICurrency } from '@/components/Swap/state'
import { isSui } from '@/components/Swap/utils'
import { tryParseDecimalAmount } from '@/components/Swap/utils/bigNumber'
import { suiClient } from '@/config/sui'
import { useCurrentAccount, useSignTransaction } from '@mysten/dapp-kit'
import { isValidSuiAddress } from '@mysten/sui/utils'
import { Transaction } from '@mysten/sui/transactions'

const getStructType = (tokenAddress: string) => {
  return `0x2::coin::Coin<${tokenAddress?.trim()}>`
}

export const getOwnedTokenIds = async (
  tokenAddress: string,
  address: string
) => {
  if (!address) throw new Error('Invalid address')

  let coinIds: string[] = []
  let nextCursor: string | null | undefined = null
  let hasMore = true

  do {
    const res = await suiClient.getOwnedObjects({
      owner: address,
      filter: {
        StructType: getStructType(tokenAddress),
      },
      options: {
        showContent: true,
      },
      limit: 50,

      ...(nextCursor ? { cursor: nextCursor } : {}),
    })

    const pageCoinIds = res.data
      .map((obj) => obj.data?.objectId)
      .filter(Boolean) as string[]

    coinIds = [...coinIds, ...pageCoinIds]

    hasMore = res.hasNextPage
    nextCursor = res.nextCursor
  } while (nextCursor && hasMore)

  if (coinIds.length === 0) throw new Error('Not enough balance.')

  return coinIds
}

export const useTransferToken = () => {
  const account = useCurrentAccount()
  const { mutateAsync: signTransaction } = useSignTransaction()

  const handleSend = async (
    token: ICurrency,
    amount: string,
    receipt: string
  ) => {
    if (
      !account?.address ||
      !amount ||
      !isValidSuiAddress(receipt) ||
      receipt?.trim()?.toLowerCase() === account?.address?.toLowerCase()
    )
      return

    const tx = new Transaction()

    const amountToSend = tryParseDecimalAmount(
      amount,
      token.decimals
    )?.toString()

    if (isSui(token)) {
      const [coin] = tx.splitCoins(tx.gas, [amountToSend])
      tx.transferObjects([coin], receipt)
    } else {
      const coinIds = await getOwnedTokenIds(token?.address, account?.address)

      const [primaryCoin, ...rest] = coinIds.map((id) => tx.object(id))

      if (rest?.length) tx.mergeCoins(primaryCoin, rest)

      const [splitCoin] = tx.splitCoins(primaryCoin, [amountToSend])

      tx.transferObjects([splitCoin], receipt)
    }

    const { bytes, signature } = await signTransaction({
      transaction: tx,
    })

    const executeResult = await suiClient.executeTransactionBlock({
      transactionBlock: bytes,
      signature,
      options: {
        showRawEffects: true,
      },
    })
  }

  return { handleSend }
}
