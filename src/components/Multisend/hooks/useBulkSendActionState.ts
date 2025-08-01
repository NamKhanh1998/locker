import { atom, useAtom } from 'jotai'

export interface IBulkSendActionState {
  attemptingTxn: boolean
  errorMessage: string | undefined
  txHash: string | undefined
  showConfirmModal: boolean
}

const initState: IBulkSendActionState = {
  attemptingTxn: false,
  errorMessage: undefined,
  txHash: undefined,
  showConfirmModal: false,
}

export const bulkSendActionState = atom<IBulkSendActionState>(initState)

export const useBulkSendActionState = () => {
  const [data, setData] = useAtom(bulkSendActionState)

  return {
    bulkSendActionState: data,
    setBulkSendActionState: setData,
  }
}
