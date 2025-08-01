import useSWRImutable from 'swr/immutable'
import { useEffect, useMemo } from 'react'
import { useManageOptions } from './useManageOptions'
import axios from 'axios'
import { delay, isEmpty, keyBy, orderBy, size } from 'lodash'
import { PriceChangePercentage, SpecialSortType } from '../bubbles.types'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export async function getCoins(chain: string) {
  const res = await axios.get(`/api/tokens/${chain}`)

  const orderData = orderBy(res.data, 'marketCap', 'desc')?.filter(
    (_) => !isEmpty(_)
  )

  return orderData
}

const getPageRanges = (totalItems: number, itemsPerPage = 100) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  return Array.from({ length: totalPages }, (_, i) => {
    const start = i * itemsPerPage + 1
    const end = Math.min((i + 1) * itemsPerPage, totalItems)
    return { page: i + 1, range: `${start}-${end}` }
  })
}

export const useFetchAndManageCoins = () => {
  const {
    options: { page, pageSize, chain, specialSortType },
    setOptions,
  } = useManageOptions()

  const { isLoading, data } = useSWRImutable(
    [`bubbles_coins_${chain}`, chain],
    () => getCoins(chain)
  )

  useEffect(() => {
    if (data) {
      const pagesArray = getPageRanges(size(data), pageSize)

      setOptions((p) => ({ ...p, pagesRange: pagesArray as any }))
    }
  }, [data, pageSize])

  const paginatedData = useMemo(() => {
    if (!data) return []

    if (!specialSortType) {
      return data.slice((page - 1) * pageSize, page * pageSize)
    }

    const sortedBy24hChangeData = orderBy(
      data,
      PriceChangePercentage.DAY,
      'desc'
    )

    if (specialSortType === SpecialSortType.GAINERS) {
      return sortedBy24hChangeData
        .slice(0, 15)
        ?.filter((_) => _?.[PriceChangePercentage.DAY] > 0)
    }

    if (specialSortType === SpecialSortType.NEW) {
      return data?.filter((_) => _?.new)
    }

    return sortedBy24hChangeData
      .slice(-15)
      ?.filter((_) => _?.[PriceChangePercentage.DAY] < 0)
  }, [page, data, pageSize, specialSortType])

  const fullDataMap = useMemo(() => {
    if (!data) return {}

    return keyBy(data, (_) => _?.address?.toLowerCase())
  }, [data])

  return { isLoading, data: paginatedData, fullData: data, fullDataMap }
}
