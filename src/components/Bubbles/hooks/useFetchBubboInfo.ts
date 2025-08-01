import axios from 'axios'
import useSWRImmutable from 'swr/immutable'

export const useFetchBubboInfo = () => {
  const { isLoading, data } = useSWRImmutable(`BUBBO_INFO`, async () => {
    const dexScreenUrl = `https://api.dexscreener.com/latest/dex/pairs/sui/0xa063edd0ac9df821c82041e558d3ecfd3987d6e3904b460f17f39ee16643d7e5`
    const res = await axios.get(dexScreenUrl)

    return res.data?.pair
  })

  return { isLoading, data }
}
