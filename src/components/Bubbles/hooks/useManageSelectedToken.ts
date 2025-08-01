import { atom, useAtom } from 'jotai'
import { CoingeckoCoinData } from '../data.type'

export const selectedTokenAtom = atom<{
  selectedToken: null | CoingeckoCoinData
}>({
  selectedToken: null,
})

export const useManageSelectedToken = () => {
  const [data, setSelectedToken] = useAtom(selectedTokenAtom)

  return {
    selectedToken: data.selectedToken,
    setSelectedToken,
  }
}
