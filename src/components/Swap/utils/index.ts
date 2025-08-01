import { size } from 'lodash'
import { ICurrency, SUI } from '../state'

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function escapeRegNumberExp(string: string): string {
  return string.replace(/[,.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export const inputRegex = RegExp(`^\\d*(\\\\[.,]\\d*)*$`)

export const normalizeInput = (inputValue: string) => {
  const lastIndexIsDecimal =
    inputValue?.length > 0
      ? inputValue[inputValue?.length - 1] === ',' ||
        inputValue[inputValue?.length - 1] === '.'
      : false
  const decimalIndex = lastIndexIsDecimal
    ? inputValue?.length - 1
    : inputValue?.indexOf('.')

  if (decimalIndex >= 0) {
    const intergerPart = inputValue
      ?.slice(0, decimalIndex)
      ?.replace(/([,.])/g, '')
    const decimalPart = inputValue
      ?.slice(decimalIndex + 1)
      ?.replace(/([,.])/g, '')
    return `${intergerPart}.${decimalPart}`
  }

  return inputValue?.replace(/[,.]/g, '')
}

export const displayValueFormatted = (value: string | number) => {
  const decimalParts = value?.toString()?.split('.')

  if (decimalParts?.length < 2)
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  const formatedInterger = decimalParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${formatedInterger}.${decimalParts[1]}`
}

export function filterTokens(tokens: ICurrency[], search: string): ICurrency[] {
  if (!search) return tokens

  const isCoinType = isSuiTokenType(search)

  if (isCoinType) {
    return tokens.filter((token) => {
      return (
        token?.address?.trim()?.toLowerCase() === search?.trim()?.toLowerCase()
      )
    })
  }

  const lowerSearchParts = (search as string)
    .toLowerCase()
    .split(/\s+/)
    .filter((s) => s.length > 0)

  if (lowerSearchParts.length === 0) {
    return tokens
  }

  const matchesSearch = (s?: string): boolean => {
    if (!s) return false // Ensure safety for undefined values
    const sParts = s
      .toLowerCase()
      .split(/\s+/)
      .filter((s_) => s_.length > 0)

    return lowerSearchParts.every(
      (p) =>
        p.length === 0 ||
        sParts.some(
          (sp) => sp.startsWith(p) || sp.endsWith(p) || sp.includes(p)
        )
    )
  }

  return tokens.filter((token) => {
    return matchesSearch(token.symbol) || matchesSearch(token.name)
  })
}

function isICurrency(obj: any): obj is ICurrency {
  return obj && typeof obj === 'object' && 'symbol' in obj // Adjust based on actual structure
}

export const isSui = (currency: ICurrency | string) => {
  if (isICurrency(currency)) {
    return currency.address.toLowerCase() === SUI.address.toLowerCase()
  }

  return currency.toLowerCase() === SUI.address.toLowerCase()
}

export const isRejected = (message: string) => {
  return message?.includes('rejected')
}

export const getSwapErrorMessage = (error: any) => {
  const message = error?.message

  if (isRejected(message)) {
    return 'Request Denied'
  }

  return 'Swap failed, please increase the slippage and try again.'
}

export function extractSuiType(str: string) {
  const splits = str?.split('_')

  return size(splits) ? splits?.[1] : null
}

export function isSuiTokenType(type: string) {
  const regex =
    /^0x[a-fA-F0-9]{64}::[a-zA-Z_][a-zA-Z0-9_]*::[a-zA-Z_][a-zA-Z0-9_]*$/
  return typeof type === 'string' && regex.test(type)
}
