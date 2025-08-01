import fsCache, { CacheItem } from '@/firestore/holders-map-cache'

const isCacheExpired = (cacheDuration: number, cacheTime?: number) => {
  if (!cacheTime) return true

  const durationInMilisecond = cacheDuration * 1000
  const now = new Date().getTime()

  return cacheTime + durationInMilisecond < now
}

export const getFromCache = async (
  name: string,
  cacheDuration: number,
  fnGetData: () => Promise<any>,
  fallBack?: () => Promise<any>
) => {
  const cacheData = await fsCache.get(name)

  if (!cacheData || isCacheExpired(cacheDuration, cacheData.updatedAt)) {
    console.log(
      'No cache data or cache expired. New data updated at',
      new Date().getTime()
    )

    try {
      const newValue = await fnGetData()
      const newValueJson = JSON.stringify(newValue)

      const updatedCache: CacheItem = {
        name,
        value: newValueJson,
      }

      await fsCache.update(updatedCache)

      return newValue
    } catch (error) {
      console.log('error')

      if (cacheData) {
        return JSON.parse(cacheData.value)
      } else if (fallBack) {
        console.log('fetch Data suiscan')

        const fallBackData = await fallBack()
        return fallBackData
      }
    }
  }

  return JSON.parse(cacheData.value)
}

export const getFromCacheNoUpdate = async (name: string) => {
  const cacheData = await fsCache.get(name)

  if (cacheData) {
    return JSON.parse(cacheData.value)
  }
}
