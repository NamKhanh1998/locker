import {
  BubbleSize,
  Chain,
  Colors,
  OptionsI,
  PriceChangePercentage,
  SpecialSortType,
} from '@/components/Bubbles/bubbles.types'

import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'
import { useCheckBuboBalances } from './useCheckBuboBalances'

const initOptions: OptionsI = {
  performance: PriceChangePercentage.DAY,
  bubbleSize: BubbleSize.PERFORMANCE,
  page: 1,
  pagesRange: [],
  pageSize: 100,
  chain: Chain.SUI,
  specialSortType: null,
  bubbleColor: Colors.RED_GREEN,
}

export const rememberOptionsAtom = atomWithStorage<OptionsI>(
  'users_settings',
  initOptions
)

export const optionsAtom = atom<OptionsI>(initOptions)

export const luxuryOptionsAtom = atomWithStorage<{
  rememberSetting: boolean
}>('holder_settings', {
  rememberSetting: false,
})

export const useManageOptions = () => {
  const [holderSettings, setHolderSettings] = useAtom(luxuryOptionsAtom)

  const { isBalancesValid } = useCheckBuboBalances()

  const [options, setOptions] = useAtom(
    holderSettings.rememberSetting && isBalancesValid
      ? rememberOptionsAtom
      : optionsAtom
  )

  const onSelectSpecialSort = useCallback(
    (type: SpecialSortType | null) => {
      if (!type) {
        setOptions((p) => ({
          ...p,
          page: 1,
          specialSortType: null,
          performance: PriceChangePercentage.DAY,
        }))
        return
      }

      setOptions((p) => ({
        ...p,
        page: 1,
        specialSortType: type,
        performance: PriceChangePercentage.DAY,
      }))
    },
    [setOptions]
  )

  const onSelectChain = useCallback(
    (chain: Chain) => {
      setOptions((p) => ({ ...p, page: 1, chain, specialSortType: null }))
    },
    [setOptions]
  )

  return {
    options,
    setOptions,
    onSelectSpecialSort,
    onSelectChain,
    holderSettings,
    setHolderSettings,
  }
}
