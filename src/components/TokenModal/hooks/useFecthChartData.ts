import { Chain } from '@/components/Bubbles/bubbles.types'
import { useManageOptions } from '@/components/Bubbles/hooks/useManageOptions'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'

export enum Period {
  HOUR = 'Hour',
  DAY = 'Day',
  WEEK = 'Week',
  MONTH = 'Month',
}

const getLimit = (period: Period): number => {
  switch (period) {
    case Period.HOUR:
      return 60
    case Period.DAY:
      return 96
    case Period.WEEK:
      return 168
    case Period.MONTH:
      return 180
  }
}

const getTimeFrame = (period: Period) => {
  switch (period) {
    case Period.HOUR:
      return 'minute'
    case Period.DAY:
      return 'minute'
    case Period.WEEK:
      return 'hour'
    case Period.MONTH:
      return 'hour'
  }
}

const getAggregate = (period: Period) => {
  switch (period) {
    case Period.HOUR:
      return 'aggregate=1'
    case Period.DAY:
      return 'aggregate=15'
    case Period.WEEK:
      return 'aggregate=1'
    case Period.MONTH:
      return 'aggregate=4'
  }
}

const getChartData = async (
  pairAdress: string,
  chain: Chain,
  period: Period = Period.DAY
) => {
  if (!pairAdress) return []

  const geckoSlug =
    chain === Chain.SUI
      ? 'sui-network'
      : chain === Chain.SOL
      ? 'solana'
      : 'berachain'

  const limit = getLimit(period)
  const timeFrame = getTimeFrame(period)
  const aggregate = getAggregate(period)

  const url = `https://api.geckoterminal.com/api/v2/networks/${geckoSlug}/pools/${pairAdress}/ohlcv/${timeFrame}?currency=usd&limit=${limit}${
    aggregate ? `&${aggregate}` : ''
  }`

  const res = await axios.get(url)

  const ohlcv = res?.data?.data?.attributes?.ohlcv_list || []
  return ohlcv
    ?.map((item: any) => {
      return {
        time: item?.[0],
        value: item?.[1],
      }
    })
    .reverse()
}

export const useFecthChartData = (
  pairAdress: string | undefined,
  period?: Period
) => {
  const {
    options: { chain },
  } = useManageOptions()

  const { data, isLoading } = useQuery({
    queryKey: ['chartData', pairAdress, period],
    queryFn: () => getChartData(pairAdress!, chain, period),
    enabled: Boolean(pairAdress) && Boolean(chain),
    staleTime: 60 * 60000,
    retry: 2,
  })

  return { data, isLoading }
}
