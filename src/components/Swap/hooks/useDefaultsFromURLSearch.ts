import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { Field, useSwapActionHandler } from '../state'
import { SwapTokensMap } from '../config/swapList'
import { isString } from 'lodash'

export const useDefaultsFromURLSearch = () => {
  const { onSelectCurrency } = useSwapActionHandler()
  const { query } = useRouter()

  const { inputCurrencyId, outputCurrencyId } = useMemo(() => {
    return {
      inputCurrencyId: query?.inputCurrencyId,
      outputCurrencyId: query?.outputCurrencyId,
    }
  }, [query])

  useEffect(() => {
    if (
      inputCurrencyId &&
      isString(inputCurrencyId) &&
      SwapTokensMap?.[(inputCurrencyId as string)?.toLowerCase()]
    ) {
      const inputCurrency =
        SwapTokensMap?.[(inputCurrencyId as string)?.toLowerCase()]
      onSelectCurrency(Field.INPUT, inputCurrency)
    }

    if (
      outputCurrencyId &&
      isString(outputCurrencyId) &&
      SwapTokensMap?.[(outputCurrencyId as string)?.toLowerCase()]
    ) {
      const outputCurrency =
        SwapTokensMap?.[(outputCurrencyId as string)?.toLowerCase()]
      onSelectCurrency(Field.OUTPUT, outputCurrency)
    }
  }, [inputCurrencyId, outputCurrencyId])
}
