import { useMemo } from 'react'
import { ChangeState, PriceChangePercentage } from '../bubbles.types'

export const useBtnChangeState = (coins: any) => {
  const changeState: ChangeState = useMemo(() => {
    if (!coins) {
      return {
        [PriceChangePercentage.HOUR]: 0,
        [PriceChangePercentage.SIXHOURS]: 0,
        [PriceChangePercentage.DAY]: 0,
        [PriceChangePercentage.WEEK]: 0,
        [PriceChangePercentage.MONTH]: 0,
        [PriceChangePercentage.YEAR]: 0,
      }
    }

    let hour = 0
    let sixHours = 0
    let day = 0
    let week = 0
    let month = 0
    let year = 0

    for (let index = 0; index < coins.length; index++) {
      const coin = coins[index]

      if (coin?.[PriceChangePercentage.HOUR] > 0) hour += 1
      if (coin?.[PriceChangePercentage.HOUR] < 0) hour -= 1

      if (coin?.[PriceChangePercentage.SIXHOURS] > 0) sixHours += 1
      if (coin?.[PriceChangePercentage.SIXHOURS] < 0) sixHours -= 1

      if (coin?.[PriceChangePercentage.DAY] > 0) day += 1
      if (coin?.[PriceChangePercentage.DAY] < 0) day -= 1

      if (coin?.[PriceChangePercentage.WEEK] > 0) week += 1
      if (coin?.[PriceChangePercentage.WEEK] < 0) week -= 1

      if (coin?.[PriceChangePercentage.MONTH] > 0) month += 1
      if (coin?.[PriceChangePercentage.MONTH] < 0) month -= 1

      if (coin?.[PriceChangePercentage.YEAR] > 0) year += 1
      if (coin?.[PriceChangePercentage.YEAR] < 0) year -= 1
    }

    return {
      [PriceChangePercentage.HOUR]: hour,
      [PriceChangePercentage.SIXHOURS]: sixHours,
      [PriceChangePercentage.DAY]: day,
      [PriceChangePercentage.WEEK]: week,
      [PriceChangePercentage.MONTH]: month,
      [PriceChangePercentage.YEAR]: year,
    }
  }, [coins])

  return changeState
}
