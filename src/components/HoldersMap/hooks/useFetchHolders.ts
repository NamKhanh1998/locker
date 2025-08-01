import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useMemo } from 'react'
import { assignGroupsToNodes } from '../utils'
import { colorRange } from '../config'

const getHoldersMap = async (address: string) => {
  if (!address) return
  const res = await axios.get(`api/holders-bubblemap/${address}`)

  return res?.data
}

export const useHoldersMap = (address: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['holders-map', address],
    queryFn: () => getHoldersMap(address),
    enabled: Boolean(address),
    staleTime: 60 * 60000,
    retry: 1,
  })

  const transformData = useMemo(() => {
    if (!data) return undefined

    const nodesWithGroup = assignGroupsToNodes(data?.nodes, data?.links)
    const nodesWithColor = nodesWithGroup?.map((_: any) => ({
      ..._,
      color: colorRange(_?.group),
    }))
    return {
      nodes: nodesWithColor,
      links: data?.links,
    }
  }, [data])

  return { data: JSON.stringify(transformData), isLoading }
}
