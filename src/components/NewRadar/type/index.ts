export type TokenAnalytics = {
  buyVolume1h: string
  buyVolume24h: string
  buyVolume5m: string
  buyVolume6h: string
  coin: string
  coinDev: string
  coinDevHoldings: string
  coinDevHoldingsPercentage: string
  coinMetadata: {
    _id: string
    coinType: string
    decimals: string
    id: string
    name: string
    supply: string
    symbol: string
    iconUrl: string
  }
  coinPrice: string
  coinSupply: string
  fullyDilutedMarketCap: string
  isCoinHoneyPot: string
  isMintable: string
  lpBurnt: string
  marketCap: string
  percentagePriceChange1h: string
  percentagePriceChange24h: string
  percentagePriceChange5m: string
  percentagePriceChange6h: string
  percentageTokenSupplyInLiquidity: string
  price1hAgo: string
  price24hAgo: string
  price5mAgo: string
  price6hAgo: string
  sellVolume1h: string
  sellVolume24h: string
  sellVolume5m: string
  sellVolume6h: string
  suspiciousActivities: string[]
  timeCreated: string
  tokensBurned: string
  tokensBurnedPercentage: string
  tokensInLiquidity: string
  top10HolderPercentage: string
  top20HolderPercentage: string
  totalLiquidityUsd: string
  volume1h: string
  volume24h: string
  volume5m: string
  volume6h: string
}

export enum TabType {
  TRENDING = 'Trending',
  New = 'New',
}
