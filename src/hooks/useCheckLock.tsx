import { suiClient } from '@/config/sui'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

async function getBuboBalance(address?: string) {
  const { data } = await axios.get(`/api/lock?address=${address}`)

  const result: any = []

  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    const objData = await suiClient.getObject({
      id: element?.objectId,
      options: { showContent: true },
    })

    const newData = {
      ...element,
      isClose:
        (objData?.data?.content as any)?.fields?.closed &&
        (objData?.data?.content as any)?.fields?.end_time <
          new Date().getTime(),
    }

    result.push(newData)
  }
  return result?.filter((_: any) => !_?.isClose)
}

export const useCheckLock = () => {
  const currentAccount = useCurrentAccount()

  const { data, isLoading } = useQuery({
    queryKey: ['useCheckLock', currentAccount?.address],
    queryFn: () => getBuboBalance(currentAccount?.address),
    enabled: Boolean(currentAccount?.address),
    staleTime: 60 * 60000,
    retry: 2,
  })

  return { data, isLoading }
}
