import { FEE_ADDRESS, SUI } from '@/components/Swap/state'
import { tryParseDecimalAmount } from '@/components/Swap/utils/bigNumber'
import { suiClient } from '@/config/sui'
import { buildTx, getQuote } from '@7kprotocol/sdk-ts'
import { useCurrentAccount, useSignTransaction } from '@mysten/dapp-kit'
import BigNumber from 'bignumber.js'
import { useCallback, useState } from 'react'
import { useQuickBuyAmount } from './useQuickBuyAmount'
import { toast } from 'react-toastify'
import { isRejected } from '@/components/Swap/utils'

const fetchQuote = async (tokenAdress: string, buyAmount: number) => {
  const formatInputValue = new BigNumber(buyAmount).decimalPlaces(9)?.toString()

  const amountIn = tryParseDecimalAmount(formatInputValue, Number(9))

  try {
    const quoteResponse = await getQuote({
      tokenIn: SUI.address,
      tokenOut: tokenAdress,
      amountIn: amountIn?.toString(),

      sources: [
        'suiswap',
        'turbos',
        'cetus',
        'bluemove',
        'kriya',
        'kriya_v3',
        'aftermath',
        'deepbook',
        'flowx',
      ],
    })

    return quoteResponse
  } catch (error) {
    return null
  }
}

export const useQuickBuy = () => {
  const [{ attemptingTxn, buyingToken }, setData] = useState({
    attemptingTxn: false,
    buyingToken: '',
  })

  const {
    data: { amount },
  } = useQuickBuyAmount()

  const currentAccount = useCurrentAccount()
  const { mutateAsync: signTransaction } = useSignTransaction()

  const onQuickBuy = useCallback(
    async (tokenAdress: string) => {
      setData({
        attemptingTxn: true,
        buyingToken: tokenAdress,
      })

      const quoteResponse = await fetchQuote(tokenAdress, Number(amount))

      if (!quoteResponse) {
        toast.error('Cannot find a route for this token pair')

        setData({
          attemptingTxn: false,
          buyingToken: '',
        })
        return
      }

      if (currentAccount?.address && quoteResponse) {
        let builtTx
        try {
          const result = await buildTx({
            quoteResponse,
            accountAddress: currentAccount?.address,
            slippage: 5 / 100,

            commission: {
              partner: FEE_ADDRESS,
              commissionBps: 10,
            },
          })

          builtTx = result?.tx
        } catch (error) {
          setData({
            attemptingTxn: false,
            buyingToken: '',
          })
          toast.error('Cannot find a route for this token pair')
        }

        if (builtTx) {
          try {
            const { bytes, signature } = await signTransaction({
              transaction: builtTx,
            })

            const executeResult = await suiClient.executeTransactionBlock({
              transactionBlock: bytes,
              signature,
              options: {
                showRawEffects: true,
              },
            })

            const { digest } = executeResult

            // Wait for transaction confirmation
            const confirmedTx = await suiClient.waitForTransaction({ digest })

            toast.success('Quick Buy Successful')
            setData({
              attemptingTxn: false,
              buyingToken: '',
            })
          } catch (error) {
            setData({
              attemptingTxn: false,
              buyingToken: '',
            })

            if (isRejected((error as any)?.message)) {
              toast.error('Request Denied.')
              return
            }
            toast.error('Swap failed due to an unexpected error.')
          }
        }
      }
    },
    [amount, currentAccount, signTransaction]
  )

  return {
    attemptingTxn,
    buyingToken,
    onQuickBuy,
  }
}
