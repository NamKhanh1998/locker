import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export enum ViewMode {
  PAIR = 'Pair',
  BASEQUOTE = 'Base-Quote',
}
export interface ChartState {
  showChart: boolean
  invert: boolean
  viewBy: ViewMode
}

const initState: ChartState = {
  showChart: true,
  invert: false,
  viewBy: ViewMode.PAIR,
}

export const slippageState = atom<ChartState>(initState)

export const useManageChart = () => {
  const [data, setData] = useAtom(slippageState)

  return {
    chart: data,
    setChart: setData,
  }
}
