import {
  escapeRegNumberExp,
  inputRegex,
  normalizeInput,
} from '@/components/Swap/utils'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export interface IQuickBuy {
  amount: string
}

const initState: IQuickBuy = {
  amount: '3',
}

export const quickBuyState = atomWithStorage<IQuickBuy>(
  'quickbuy:amount',
  initState
)

const enforcer = (nextUserInput: string) => {
  const escapedInput = escapeRegNumberExp(nextUserInput)

  if (nextUserInput === '' || inputRegex.test(escapedInput)) {
    const rawValue = normalizeInput(nextUserInput)
    return rawValue
  }
}

export const useQuickBuyAmount = () => {
  const [data, setData] = useAtom(quickBuyState)

  const onChangQuickBuy = (value: string) => {
    const val = enforcer(value)

    if (Number(val) > 1000) {
      setData({ amount: '1000' })
      return
    }

    setData({ amount: val || '' })
  }

  return {
    data,
    onChangQuickBuy,
  }
}
