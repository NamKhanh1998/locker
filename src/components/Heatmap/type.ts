export enum BlockSize {
  MKC = 'marketCap',
  PERFORMANCE = 'performance',
  VOLUME = 'volume',
  LIQUIDITY = 'totalLiquidity',
}

export enum PriceChangePercentage {
  HOUR = 'h1',
  SIXHOURS = 'h6',
  DAY = 'h24',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export interface Options {
  blockSize: BlockSize
  performance: PriceChangePercentage
  narrative: NarrativeType
}

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

export enum NarrativeType {
  ALL = '',
  DEFI = 'DeFi',
  MEME = 'Meme',
  AI = 'AI',
  OTHERS = 'Others',
  NEW = 'New',
}
