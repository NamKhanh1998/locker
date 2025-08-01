import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { orderBy } from 'lodash'

const getPool = async (address: string) => {
  const url = `https://api.dexscreener.com/token-pairs/v1/sui/${address}
`
  const res = await axios.get(url)
  const data = res?.data

  const filterData = orderBy(
    data?.filter((_: any) => Number(_?.liquidity?.usd) > 0),
    'liquidity.usd',
    'desc'
  )
  return filterData
}

export const useFetchPools = (address: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['pools', address],
    queryFn: () => getPool(address),
    enabled: Boolean(address),
    staleTime: 60 * 60000,
    retry: 2,
  })

  return { data, isLoading }
}
