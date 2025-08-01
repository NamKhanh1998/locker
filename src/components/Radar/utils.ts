import { isNumber } from 'lodash'
import { formatNumber } from '../utils'

export const getChangeColor = (percent: number) => {
  if (percent === 0) return '#bcb9b9'
  if (percent > 0) return '#51f55c'
  return '#ff6666'
}

export const getChangeBgColor = (percent: number) => {
  if (percent === 0) return '#706f6e'
  if (percent > 0) return '#50ff5093'
  return '#b43a3a'
}

export const formatPercent = (percent?: number) => {
  if (Number(percent) > 1000) return formatNumber(percent!)

  if (isNumber(percent) || isNumber(Number(percent))) {
    return percent?.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  return '0'
}
