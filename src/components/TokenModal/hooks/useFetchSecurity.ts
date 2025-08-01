import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getSecurity = async (address: string) => {
  const res = await axios.get(`/api/safety-check/${address}`)

  return res?.data
}

export const useFetchSecurity = (address: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['security', address],
    queryFn: () => getSecurity(address),
    enabled: Boolean(address),
    staleTime: 60 * 60000,
    retry: 2,
  })

  return { data, isLoading }
}
