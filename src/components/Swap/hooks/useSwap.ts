import { suiClient } from '@/config/sui'
import { setSuiClient, getQuote, buildTx } from '@7kprotocol/sdk-ts'
import { useCurrentAccount, useSignTransaction } from '@mysten/dapp-kit'
import { useQuery } from '@tanstack/react-query'
import { FEE_ADDRESS, ICurrency, useSwapState } from '../state'
import useDebounce from '@/hooks/useDebounce'
import { getSlippage, tryParseDecimalAmount } from '../utils/bigNumber'
import BigNumber from 'bignumber.js'
import { useSwapActionState } from '../state/swapActionState'
import { getSwapErrorMessage } from '../utils'
import { isEmpty, isNumber } from 'lodash'
import { useUserSippage } from '../state/userSippage'

setSuiClient(suiClient)

const fetchQuote = async (stringifyInputs: string) => {
  if (!stringifyInputs) return null
  const parsedInputs = JSON.parse(stringifyInputs)

  const {
    inputCurrency,
    outputCurrency,
    inputValue,
  }: {
    inputCurrency: ICurrency
    outputCurrency: ICurrency
    inputValue: string
  } = parsedInputs

  if (
    !inputCurrency ||
    !outputCurrency ||
    !inputValue ||
    !isNumber(inputCurrency?.decimals)
  )
    return null

  const formatInputValue = new BigNumber(inputValue)
    .decimalPlaces(inputCurrency?.decimals)
    ?.toString()

  const amountIn = tryParseDecimalAmount(
    formatInputValue,
    inputCurrency?.decimals
  )

  try {
    const quoteResponse = await getQuote({
      tokenIn: inputCurrency.address,
      tokenOut: outputCurrency.address,
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
        'deepbook_v3',
        'flowx',
        'flowx_v3',
        'bluefin',
        'springsui',
        'obric',
        'stsui',
        'steamm',
        'magma',
      ],
    })

    return quoteResponse
  } catch (error) {
    throw error
  }
}

export const useSwap = () => {
  const { mutateAsync: signTransaction } = useSignTransaction()
  const currentAccount = useCurrentAccount()

  const { setSwapActionstate } = useSwapActionState()
  const { activeSlippage } = useUserSippage()

  const {
    swapState: { inputCurrency, outputCurrency, inputValue },
  } = useSwapState()

  const debounceInputs = useDebounce(
    JSON.stringify({ inputCurrency, outputCurrency, inputValue }),
    300
  )

  const {
    data: quoteResponse,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['quote-swap', debounceInputs],
    queryFn: () => fetchQuote(debounceInputs),
    enabled:
      Boolean(inputCurrency) &&
      Boolean(outputCurrency) &&
      Boolean(Number(inputValue)) &&
      Boolean(debounceInputs),
    staleTime: 60 * 1000,
    retry: 2,
  })

  const excuteSwap = async (callBack?: () => void) => {
    if (!quoteResponse || !currentAccount?.address || isLoading) return

    const { tokenIn, tokenOut, returnAmount, routes } = quoteResponse

    if (!tokenIn || !tokenOut || !returnAmount || isEmpty(routes)) return

    const result = await buildTx({
      quoteResponse,
      accountAddress: currentAccount?.address,
      slippage: getSlippage(activeSlippage, quoteResponse),

      commission: {
        partner: FEE_ADDRESS,
        commissionBps: 100,
      },
    })

    const builtTx = result?.tx

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

        setSwapActionstate((p) => ({
          ...p,
          attemptingTxn: false,
          swapErrorMessage: undefined,
          txHash: digest,
        }))

        // Wait for transaction confirmation
        const confirmedTx = await suiClient.waitForTransaction({ digest })

        callBack?.()
      } catch (error) {
        setSwapActionstate((p) => ({
          ...p,
          attemptingTxn: false,
          swapErrorMessage: getSwapErrorMessage(error),
        }))
        console.error('Transaction failed:', error)
      }
    }
  }

  return { excuteSwap, quoteResponse, quoteError: error, isLoading, refetch }
}
