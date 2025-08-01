import { Text } from 'pixi.js'
import { CoingeckoCoinData } from './data.type'

export enum PriceChangePercentage {
  HOUR = 'h1',
  SIXHOURS = 'h6',
  DAY = 'h24',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum BubbleSize {
  MKC = 'marketCap',
  PERFORMANCE = 'performance',
  VOLUME = 'volume',
  LIQUIDITY = 'totalLiquidity',
}

export type Circle = {
  id: string
  x: number
  y: number
  vx: number
  vy: number
  color: string
  dragging: boolean
  targetRadius: number
  symbol: string
  coinName: string
  radius: number
  [PriceChangePercentage.HOUR]: number
  [PriceChangePercentage.DAY]: number
  [PriceChangePercentage.SIXHOURS]: number
  [PriceChangePercentage.WEEK]: number
  [PriceChangePercentage.MONTH]: number
  [PriceChangePercentage.YEAR]: number
  [BubbleSize.MKC]: number
  [BubbleSize.VOLUME]: number
  [BubbleSize.LIQUIDITY]: number
  image: string
  text2: Text | null
  token: CoingeckoCoinData
  childUpdated: boolean
}

export interface ChangeState {
  [PriceChangePercentage.HOUR]: number
  [PriceChangePercentage.SIXHOURS]: number
  [PriceChangePercentage.DAY]: number
  [PriceChangePercentage.WEEK]: number
  [PriceChangePercentage.MONTH]: number
  [PriceChangePercentage.YEAR]: number
}

export enum Chain {
  SUI = 'sui',
  SOL = 'sol',
  BERA = 'berachain',
}

export enum SpecialSortType {
  GAINERS = 'Gainers',
  LOSERS = 'Losers',
  NEW = 'News',
}

export interface OptionsI {
  performance: PriceChangePercentage
  bubbleSize: BubbleSize
  page: number
  pagesRange: Array<any>
  pageSize: number
  chain: Chain
  specialSortType: null | SpecialSortType
  bubbleColor: Colors
}

export enum Colors {
  RED_GREEN = 'redandgreen',
  BLUE_YELLOW = 'blueandyellow',
  PINK_MINT = 'pinkmint',
  NEUTRAL = 'neutral',
}
