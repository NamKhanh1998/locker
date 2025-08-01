import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export enum SlippageTolerance {
  AUTO = 'Auto',
  ONE = 1,
  THREE = 3,
  FIVE = 5,
}

export interface IUserSliagge {
  slippage: SlippageTolerance
  customSlippage: string
}

const initState: IUserSliagge = {
  slippage: SlippageTolerance.AUTO,
  customSlippage: '',
}

export const slippageState = atomWithStorage<IUserSliagge>(
  'slippageState',
  initState
)

export const useUserSippage = () => {
  const [data, setData] = useAtom(slippageState)

  return {
    userSlippage: data,
    setUserSlippage: setData,
    activeSlippage: data?.customSlippage || data.slippage,
  }
}
