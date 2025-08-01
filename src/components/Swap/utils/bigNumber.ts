import BigNumber from 'bignumber.js'
import { isNumber, isUndefined } from 'lodash'
import { SlippageTolerance } from '../state/userSippage'
import { QuoteResponse } from '@7kprotocol/sdk-ts'

export const BIG_ZERO = new BigNumber(0)
export const BIG_ONE = new BigNumber(1)
export const BIG_TEN = new BigNumber(10)

export const MIN_SUI = 0.05

export const getBalanceAmount = (amount: string, decimals: number) => {
  if (!isNumber(decimals)) return BIG_ZERO
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

export const tryParseDecimalAmount = (amount: string, decimals: number) => {
  if (!isNumber(decimals)) return BIG_ZERO
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceValue = (amount: string, price: string) => {
  if (
    !amount ||
    !price ||
    !isNumber(Number(amount)) ||
    !isNumber(Number(price))
  )
    return BIG_ZERO

  return new BigNumber(amount).times(price)
}

export const displayBalanceValue = (amount: string, price: string) => {
  if (isUndefined(price) || !price) {
    return '-'
  }

  const value = getBalanceValue(amount, price)
  const valueNumber = Number(value)

  if (valueNumber < 0.0001) {
    return '<0.0001'
  }

  return `~${valueNumber?.toLocaleString(undefined, {
    maximumFractionDigits: 3,
  })}`
}

export const getSlippage = (
  userSlippage: SlippageTolerance | string,
  quoteResponse?: QuoteResponse | null
) => {
  if (userSlippage === SlippageTolerance.AUTO) {
    return (quoteResponse?.priceImpact || 0) + 0.01
  }

  return Number(userSlippage || 1) / 100
}
