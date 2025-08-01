import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

export const FEE_ADDRESS =
  '0x875ef3dbde04975bbf1eb36b9325dfd937f74a855cd1b3de2d595b92f3c98406'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export enum SearchNarrative {
  NEW = 'New',
  DEFAULT = 'Default',
  MEME = 'Meme',
  TRENDING = 'Trending',
}
export interface ICurrency {
  coingeckoId: string
  symbol: string
  name: string
  address: string
  pairAddress: string
  website: string
  twitter: string
  telegram: string
  decimals: number
  logoUrl?: string
  import?: boolean
}

export const SUI: ICurrency = {
  coingeckoId: 'sui',
  symbol: 'SUI',
  name: 'Sui',
  address: '0x2::sui::SUI',
  pairAddress:
    '0x5eb2dfcdd1b15d2021328258f6d5ec081e9a0cdcfa9e13a0eaeb9b5f7505ca78',
  website: 'https://sui.io/',
  twitter: 'https://x.com/SuiNetwork',
  telegram: '',
  decimals: 9,
}

export const BUBO: ICurrency = {
  address:
    '0x145e6f90d261dc18a591b6127f5ebd56803812d4ee1852da0154d4c400828096::bubo::BUBO',
  coingeckoId: '',
  pairAddress:
    '0xf0620fb9b64f53d78b96955154ab78367b640604355524e008367b14b05fcf87',
  website: 'https://www.bubbo.fun/',
  twitter: 'https://x.com/bubbofun',
  telegram: 'https://t.me/bubbo_fun',
  decimals: 6,
  name: 'Bubbo',
  symbol: 'BUBO',
}

export const USDC: ICurrency = {
  coingeckoId: '',
  symbol: 'USDC',
  name: 'Native USDC',
  address:
    '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC',
  pairAddress:
    '0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105',
  website: '',
  twitter: '',
  telegram: '',
  decimals: 6,
}

export const LOFI: ICurrency = {
  coingeckoId: 'lofi-2',
  symbol: 'lofi',
  name: 'LOFI',
  address:
    '0xf22da9a24ad027cccb5f2d496cbe91de953d363513db08a3a734d361c7c17503::LOFI::LOFI',
  pairAddress:
    '0xd6918afa64d432b84b48088d165b0dda0b7459463a7d66365f7ff890cae22d2d',
  website: 'https://lofitheyeti.com/',
  twitter: 'https://x.com/lofitheyeti',
  telegram: 'https://t.me/LofiOnSui',
  logoUrl:
    'https://coin-images.coingecko.com/coins/images/52058/large/LOFI.png?1732454544',
  decimals: 9,
}

export interface ISwapState {
  inputCurrency: ICurrency
  outputCurrency: ICurrency
  inputValue: string
  outputValue: string
}

const initState: ISwapState = {
  inputCurrency: SUI,
  outputCurrency: BUBO,
  inputValue: '',
  outputValue: '',
}

export const swapState = atom<ISwapState>(initState)

export const useSwapState = () => {
  const [data, setData] = useAtom(swapState)

  return {
    swapState: data,
    setSwapState: setData,
  }
}

export const useSwapActionHandler = () => {
  const {
    swapState: { inputCurrency, outputCurrency, outputValue, inputValue },
    setSwapState,
  } = useSwapState()

  const onSelectCurrency = useCallback(
    (field: Field, currency: ICurrency) => {
      if (field === Field.INPUT) {
        if (currency?.address === outputCurrency.address) {
          onSwitchCurrencies()
        } else {
          setSwapState((p) => ({ ...p, inputCurrency: currency }))
        }
      }

      if (field === Field.OUTPUT) {
        if (currency?.address === inputCurrency.address) {
          onSwitchCurrencies()
        } else {
          setSwapState((p) => ({ ...p, outputCurrency: currency }))
        }
      }
    },
    [inputCurrency, outputCurrency]
  )

  const onTypeInput = useCallback((value: string) => {
    if (value) {
      setSwapState((p) => ({
        ...p,
        inputValue: value,
      }))
    } else {
      setSwapState((p) => ({
        ...p,
        inputValue: value,
        outputValue: '',
      }))
    }
  }, [])

  const onSwitchCurrencies = useCallback(() => {
    const oldInputCurrency = { ...inputCurrency }
    const oldOutputCurrency = { ...outputCurrency }
    const oldOutputValue = outputValue

    setSwapState((p) => ({
      ...p,
      inputCurrency: oldOutputCurrency,
      outputCurrency: oldInputCurrency,
      inputValue: oldOutputValue,
      outputValue: '',
    }))
  }, [inputCurrency, outputCurrency, outputValue])

  return {
    onSelectCurrency,
    onTypeInput,
    onSwitchCurrencies,
  }
}
