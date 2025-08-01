import { PriceChangePercentage } from '../Bubbles/bubbles.types'
import { NarrativeType } from '../Heatmap/type'

export enum SortBy {
  HOUR = 'h1',
  SIXHOURS = 'h6',
  DAY = 'h24',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  PRICE = 'price',
  MARKETCAP = 'marketCap',
  LIQ = 'totalLiquidity',
  VOLUME = 'volume',
}
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IOptions {
  sortBy: null | SortBy
  sortDirection: null | SortDirection
  narrative: null | NarrativeType
}

export const initOptions: {
  sortBy: null | SortBy
  sortDirection: null | SortDirection
  narrative: null | NarrativeType
} = {
  sortBy: null,
  sortDirection: SortDirection.DESC,
  narrative: null,
}
