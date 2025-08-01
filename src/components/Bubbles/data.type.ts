import { NarrativeType } from '../Heatmap/type'

export interface SparklineData {
  price: number[]
}
export interface CoingeckoCoinData {
  id: string
  symbol: string
  marketCap?: number
  website: string
  address: string
  h24: number
  h1: number
  telegram: string
  h6: number
  logoUrl: string
  coingeckoId: string
  volume: number
  pairAddress: string
  activePairAddress?: string
  price: string
  name: string
  twitter: string
  week: number
  ath: number
  high24h: number
  month: number
  year: number
  atl: number
  low24h: number
  rank: number
  isPartner?: boolean
  totalLiquidity: number
  narratives?: NarrativeType[]
  new?: boolean
}

export type CoingeckoHistoryResponse = [number, number, number, number][]
