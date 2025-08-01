import { atom, useAtom } from 'jotai'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import { useFetchAndManageCoins } from '../Bubbles/hooks/useFetchCoins'
import { useCallback, useEffect } from 'react'
import { BUBO, ICurrency, LOFI } from '../Swap/state'

export enum AmountIn {
  USD = 'USD',
  TOKEN = 'Token',
}
export interface IMkcOfState {
  baseToken: ICurrency
  quoteToken: ICurrency
  amountIn: AmountIn
  amount: number
}

const initState: IMkcOfState = {
  baseToken: BUBO,
  quoteToken: LOFI,
  amountIn: AmountIn.TOKEN,
  amount: 100,
}

export const mkcOfState = atom<IMkcOfState>(initState)

export const useManageMkcOf = () => {
  const [data, setData] = useAtom(mkcOfState)

  const onSelectBaseToken = useCallback(
    (token: ICurrency) => {
      setData((p) => ({ ...p, baseToken: token }))
    },
    [setData]
  )

  const onSelectQuoteToken = useCallback(
    (token: ICurrency) => {
      setData((p) => ({ ...p, quoteToken: token }))
    },
    [setData]
  )

  const onSwicthTokens = useCallback(() => {
    const oldBase = data.baseToken
    const oldQuote = data.quoteToken

    setData((p) => ({ ...p, quoteToken: oldBase, baseToken: oldQuote }))
  }, [setData, data])

  return {
    mkcOfState: data,
    setMkcOfstate: setData,
    onSelectBaseToken,
    onSelectQuoteToken,
    onSwicthTokens,
  }
}
