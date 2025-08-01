import { ICurrency } from '@/components/Swap/state'
import { atom, useAtom } from 'jotai'
import { useCallback, useEffect, useMemo } from 'react'
import { convertInputToData, verifyTheInput } from '../utils'
import { size } from 'lodash'
import { useCurrentAccount } from '@mysten/dapp-kit'

export interface ICurrencyWBalance extends ICurrency {
  balance: string
}

export interface IBulkSendState {
  selectToken: ICurrencyWBalance | null
  textAreaValue: string
}

const initState: IBulkSendState = {
  selectToken: null,
  textAreaValue: '',
}

const emptyData = { amounts: [], recipients: [], errors: [] }

export const bulkSendState = atom<IBulkSendState>(initState)

export const useManageBulkSendState = () => {
  const [{ textAreaValue, selectToken }, setData] = useAtom(bulkSendState)

  const currentAccount = useCurrentAccount()

  const onChangeTextAreaValue = useCallback((val: string) => {
    setData((p) => ({
      ...p,
      textAreaValue: val,
    }))
  }, [])

  const onSelectToken = useCallback((token: ICurrencyWBalance) => {
    setData((p) => ({
      ...p,
      selectToken: token,
    }))
  }, [])

  const { amounts, recipients, errors } = useMemo(() => {
    if (!textAreaValue) {
      return emptyData
    }

    const inputErrors = verifyTheInput(textAreaValue, selectToken)
    if (size(inputErrors) > 0) return { ...emptyData, errors: inputErrors }

    const { addresses, amounts } = convertInputToData(textAreaValue)

    return {
      amounts,
      recipients: addresses,
      errors: [],
    }
  }, [textAreaValue])

  useEffect(() => {
    setData((p) => ({ ...p, selectToken: null }))
  }, [currentAccount?.address])

  return {
    bulkSendState: { textAreaValue, selectToken },
    setBulkSendState: setData,
    onChangeTextAreaValue,
    onSelectToken,
    amounts,
    recipients,
    errors,
  }
}
