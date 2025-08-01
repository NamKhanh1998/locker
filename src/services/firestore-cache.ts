import fsCache, { CacheItem } from '@/firestore/cache'

const isCacheExpired = (cacheDuration: number, cacheTime?: number) => {
  if (!cacheTime) return true

  const durationInMilisecond = cacheDuration * 1000
  const now = new Date().getTime()

  return cacheTime + durationInMilisecond < now
}

export const getFromCache = async (
  name: string,
  cacheDuration: number,
  fnGetData: () => Promise<any>
) => {
  const cacheData = await fsCache.get(name)

  if (!cacheData || isCacheExpired(cacheDuration, cacheData.updatedAt)) {
    console.log(
      'No cache data or cache expired. New data updated at',
      new Date().getTime()
    )

    const newValue = await fnGetData()
    const newValueJson = JSON.stringify(newValue)

    const updatedCache: CacheItem = {
      name,
      value: newValueJson,
    }

    await fsCache.update(updatedCache)

    return newValue
  }

  return JSON.parse(cacheData.value)
}
