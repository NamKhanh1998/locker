import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchNewCoins = async () => {
  const res = await axios.get(`/api/token-new`)

  return res?.data
}

export const useFetchNewCoins = (enable: boolean) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['useFetchNewCoins'],
    queryFn: fetchNewCoins,
    enabled: enable,
    staleTime: 60 * 2000,
    retry: 2,
  })

  return {
    coins: data,
    isLoading,
    refetch,
  }
}
