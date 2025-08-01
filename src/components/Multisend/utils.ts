import { isValidSuiAddress } from '@mysten/sui/utils'
import {
  Decoration,
  DecorationSet,
  EditorView,
  Range,
  ViewPlugin,
  ViewUpdate,
} from '@uiw/react-codemirror'
import { size } from 'lodash'
import { isRejected } from '../Swap/utils'
import { ICurrencyWBalance } from './hooks/useManageBulkSendState'

export function isValidAmount(amount: string): boolean {
  if (Number(amount) <= 0) return false
  return /^\s*\d+(\.\d+)?\s*$/.test(amount)
}

export function isValidAmountWithToken(
  amount: string,
  token?: ICurrencyWBalance | null
): boolean {
  if (Number(amount) <= 0) return false

  if (!/^\s*\d+(\.\d+)?\s*$/.test(amount)) return false

  const decimalPart = amount.trim().split('.')[1]
  if (decimalPart && decimalPart.length > token?.decimals!) {
    return false
  }

  return true
}

export function isValidLine(line: string): boolean {
  const seprateChar = line?.includes(',') ? ',' : line?.includes('=') ? '=' : ''
  if (!seprateChar) return false

  const parts = line.split(seprateChar)

  if (parts.length !== 2) return false

  const [address, amount] = parts.map((part) => part.trim())

  if (!isValidSuiAddress(address)) return false
  if (!isValidAmount(amount)) return false

  return true
}

export const errorDecoration = Decoration.line({
  attributes: { style: 'color: rgb(200, 65, 65)' },
})

export const errorHighlighter = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = this.buildDecorations(view)
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.buildDecorations(update.view)
      }
    }

    buildDecorations(view: EditorView): DecorationSet {
      const builder: Range<Decoration>[] = []

      for (let { from, to } of view.visibleRanges) {
        let line = view.state.doc.lineAt(from)
        while (line.from <= to) {
          const text = line.text.trim()
          if (text && !isValidLine(text)) {
            builder.push(errorDecoration.range(line.from))
          }
          if (line.to === view.state.doc.length) break
          line = view.state.doc.lineAt(line.to + 1)
        }
      }

      return Decoration.set(builder)
    }
  },
  {
    decorations: (v) => v.decorations,
  }
)

export const lineHeightExtension = EditorView.theme({
  '.cm-line': {
    lineHeight: '1.8', // ← You can change this to your desired value
  },
})

export const verifyTheInput = (
  input: string,
  selectToken?: ICurrencyWBalance | null
) => {
  const lines = input.split('\n').filter((line) => line.trim() !== '')

  const errorMap: string[] = []

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]

    const seprateChar = line?.includes(',')
      ? ','
      : line?.includes('=')
      ? '='
      : ''

    if (!seprateChar) {
      const errorText = `Line ${
        index + 1
      }: Invalid separator character. Please use ',' or '='.`
      errorMap.push(errorText)
      continue
    }

    const parts = line.split(seprateChar)

    if (parts.length !== 2) {
      const errorText = `Line ${
        index + 1
      }: Invalid format. Each line must contain one address and one amount.`
      errorMap.push(errorText)
      continue
    }

    const [address, amount] = parts.map((part) => part.trim())

    if (!isValidSuiAddress(address)) {
      const errorText = `Line ${index + 1}: Invalid address.`
      errorMap.push(errorText)
      continue
    }
    if (!isValidAmount(amount)) {
      const errorText = `Line ${
        index + 1
      }: Invalid amount format. Use '.' as the decimal separator.`
      errorMap.push(errorText)
      continue
    }

    if (selectToken && !isValidAmountWithToken(amount, selectToken)) {
      const errorText = `Line ${
        index + 1
      }: Invalid amount. Use '.' as the decimal separator and max ${
        selectToken.decimals
      } decimals.`
      errorMap.push(errorText)
      continue
    }
  }

  if (size(lines) < 2) {
    const errorText = `Please enter at least 2 addresses.`
    errorMap.push(errorText)
  }

  return errorMap
}

export const convertInputToData = (input: string) => {
  const lines = input.split('\n').filter((line) => line.trim() !== '')

  const amounts = []
  const addresses = []

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]

    const seprateChar = line?.includes(',')
      ? ','
      : line?.includes('=')
      ? '='
      : ''

    const parts = line.split(seprateChar)
    const [address, amount] = parts.map((part) => part.trim())

    if (isValidSuiAddress(address) && isValidAmount(amount)) {
      addresses.push(address)
      amounts.push(amount)
    }
  }

  return {
    amounts,
    addresses,
  }
}

export const getErrorMessage = (error: any) => {
  const message = error?.message

  if (isRejected(message || error)) {
    return 'Request Denied'
  }

  if (message?.includes('Balance of gas')) {
    return 'Insufficient Gas. Make sure you have enough SUI in your wallet to cover the transaction fee.'
  }

  return 'Transaction execution failed.'
}
