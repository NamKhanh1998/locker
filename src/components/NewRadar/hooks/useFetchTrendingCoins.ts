import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchTrendingCoins = async () => {
  const res = await axios.get(`/api/token-trending`)

  return res?.data
}

export const useFetchTrendingCoins = (enabled: boolean) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['useFetchTrendingCoins'],
    queryFn: fetchTrendingCoins,
    enabled: enabled,
    staleTime: 60 * 2000,
    retry: 2,
  })

  return {
    coins: data,
    isLoading,
    refetch,
  }
}
