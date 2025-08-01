import { useMemo } from 'react'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import { useFetchAndManageCoins } from '../Bubbles/hooks/useFetchCoins'
import { AmountIn, useManageMkcOf } from './useManageMkcOf'

export const useCalculateForMkcOf = () => {
  const { fullDataMap, isLoading } = useFetchAndManageCoins()

  const {
    mkcOfState: { baseToken, quoteToken, amount, amountIn },
  } = useManageMkcOf()

  const { baseTokenInfo, quoteTokenInfo } = useMemo(() => {
    if (!fullDataMap) {
      return {
        baseTokenInfo: null,
        quoteTokenInfo: null,
      }
    }

    const baseTokenInfo = fullDataMap?.[
      baseToken.address.toLowerCase()
    ] as CoingeckoCoinData
    const quoteTokenInfo = fullDataMap?.[
      quoteToken.address.toLowerCase()
    ] as CoingeckoCoinData

    return {
      baseTokenInfo,
      quoteTokenInfo,
    }
  }, [fullDataMap, baseToken, quoteToken])

  const {
    marketCapRatio,
    priceWithQuoteRatio,
    profit,
    initAmount,
    targetAmount,
    targetPrice,
  } = useMemo(() => {
    const baseMarketCap = Number(baseTokenInfo?.marketCap) || 0
    const quoteMarketCap = Number(quoteTokenInfo?.marketCap) || 0

    const marketCapRatio = quoteMarketCap / baseMarketCap

    const priceWithQuoteRatio = marketCapRatio * Number(baseTokenInfo?.price)

    let profit = 0
    let initAmount = 0
    let targetAmount = 0

    const targetPrice = marketCapRatio * Number(baseTokenInfo?.price)

    if (amountIn === AmountIn.USD) {
      initAmount = Number(amount)
      targetAmount = Number(amount) * marketCapRatio
      profit = targetAmount - initAmount
    }

    if (amountIn === AmountIn.TOKEN) {
      const currentPrice = Number(baseTokenInfo?.price)
      initAmount = Number(amount || 0) * currentPrice
      targetAmount = initAmount * marketCapRatio
      profit = profit = targetAmount - initAmount
    }

    return {
      marketCapRatio,
      priceWithQuoteRatio,
      profit,
      initAmount,
      targetAmount,
      targetPrice,
    }
  }, [baseTokenInfo, quoteTokenInfo, amount, amountIn])

  return {
    baseTokenInfo,
    quoteTokenInfo,
    marketCapRatio,
    priceWithQuoteRatio,
    profit,
    initAmount,
    targetAmount,
    targetPrice,
    isLoading,
  }
}
