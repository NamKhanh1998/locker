import { holdersDb as db } from '.'

export interface CacheItem {
  name: string
  value: string
  updatedAt?: number
}

const collections = 'holders-caches'

export const create = async (cache: CacheItem) => {
  const cacheData = await db
    .collection(collections)
    .doc(cache.name)
    .set({
      ...cache,
      createAt: new Date().getTime(),
    })

  return {
    ...cacheData,
    docId: cache.name,
  }
}

export const update = async (cache: CacheItem) => {
  const cacheData = await db
    .collection(collections)
    .doc(cache.name)
    .set(
      {
        ...cache,
        updatedAt: new Date().getTime(),
      },
      { merge: true }
    )

  return {
    ...cacheData,
    docId: cache.name,
  }
}

export const get = async (name: string): Promise<CacheItem> => {
  const cacheData = await db.collection(collections).doc(name).get()
  return cacheData.data() as CacheItem
}

export const getAll = async () => {
  const snapshot = await db.collection(collections).get()

  const caches: CacheItem[] = []
  snapshot.forEach((doc) => {
    caches.push(doc.data() as CacheItem)
  })

  return caches
}

export const remove = async (name: string) => {
  const cacheItems = db.collection(collections)
  await cacheItems.doc(name).delete()

  return name
}

const fsHoldersCache = {
  create,
  update,
  get,
  getAll,
  remove,
}

export default fsHoldersCache
