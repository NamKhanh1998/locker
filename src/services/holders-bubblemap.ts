import { nexaKey } from '@/config/apiKey'
import axios from 'axios'
import { keyBy, uniqWith } from 'lodash'
import { getFromCache, getFromCacheNoUpdate } from './holders-map-cache'
import fsHoldersCache from '@/firestore/holders-map-cache'
import { tokensList } from '@/config/tokens/sui'

const getHoldersListFromSuiScan = async (page: number, address: string) => {
  try {
    const baseUrl = `https://api.blockberry.one/sui/v1/coins/${address}/holders?page=${page}&size=50&orderBy=DESC&sortBy=AMOUNT`
    const res = await axios.get(baseUrl, {
      headers: {
        'x-api-key': 'xYpT8QcMYsC9yyh8mP6wlHwyNMrKA1',
      },
    })

    return res?.data?.content
  } catch (error) {
    console.log(error)
  }
}

const getTop100HoldersSuiScan = async (address: string) => {
  const page0 = await getHoldersListFromSuiScan(0, address)

  const holders = [...page0]?.map((holder, index) => ({
    rank: index + 1,
    id: holder?.holderAddress,
    user: holder?.holderAddress,
    balance: holder?.amount,
    percentage: holder?.percentage,
    balanceUsd: holder?.usdAmount,
  }))

  return {
    nodes: holders,
    links: [],
  }
}

export const getHoldersList = async (coinType: string) => {
  const url = `https://api-ex.insidex.trade/coin-holders/${coinType}/holders?limit=100&skip=0`
  const res = await axios.get(url, {
    headers: {
      'x-api-key': nexaKey,
    },
  })

  return res.data?.map((holder: any) => ({
    id: holder?.user,
    rank: holder?.rank,
    user: holder?.user,
    balance: holder?.balanceScaled,
    percentage: holder?.percentage,
    balanceUsd: holder?.balanceUsd,
  }))
}

export const getUserTransfer = async (address: string) => {
  try {
    const url = `https://api-ex.insidex.trade/social-graph/${address}/start`
    const res = await axios.get(url, {
      headers: {
        'x-api-key': nexaKey,
      },
    })

    console.log(address)

    return res?.data
  } catch (error) {
    console.log('link error', error)

    return []
  }
}

const getHoldersBubbleMapData = async (coinType: string) => {
  const holders = await getHoldersList(coinType)

  const holdersMap = keyBy(holders, 'user')

  const linksPromises: any[] = []

  for (let index = 0; index < Math.min(holders.length, 90); index++) {
    const holder = holders[index]

    if (holder?.user) {
      linksPromises.push(getUserTransfer(holder?.user))
    }
  }

  const linksRes = await Promise.all(linksPromises)

  const rawLinks: any = []

  linksRes?.forEach((item) => {
    const links = item?.links

    for (let index = 0; index < links.length; index++) {
      const element = links[index]

      const source = element?.source
      const target = element?.target

      if (holdersMap?.[target] && holdersMap?.[source]) {
        rawLinks.push(element)
      }
    }
  })

  const uniqueBySourceTarget = uniqWith(
    rawLinks,
    (a: any, b: any) => a.source === b.source && a.target === b.target
  )

  return {
    nodes: holders,
    links: uniqueBySourceTarget,
  }
}

const getHoldersBubbleMap = async (address: string) => {
  const cacheName = `holders-bubblemap-${address}`

  const result = await getFromCacheNoUpdate(cacheName)

  return result
}

const syncBubbleHoldersMap = async () => {
  const lastUpdateCacheName = `last-update-id`

  const cacheData = await fsHoldersCache.get(lastUpdateCacheName)

  let lastUpdatedId = tokensList?.[0]?.address
  let lastUpdatedIdIndex = 0

  if (cacheData) {
    const lastId = cacheData.value
    const index = tokensList.findIndex((token) => token?.address === lastId)
    lastUpdatedIdIndex = index

    if (index >= 0 && index + 1 < tokensList.length) {
      lastUpdatedId = tokensList[index + 1].address
    }
  }

  const cacheName = `holders-bubblemap-${lastUpdatedId}`

  console.log(`update for token ${lastUpdatedId}`)

  let result = null
  try {
    result = await getFromCache(cacheName, 0, () =>
      getHoldersBubbleMapData(lastUpdatedId)
    )
  } catch (error) {}

  await fsHoldersCache.create({
    name: lastUpdateCacheName,
    value: lastUpdatedId,
  })

  return result
}

const manualSyncBubbleHoldersMap = async (id: string) => {
  const cacheName = `holders-bubblemap-${id}`

  console.log(`update for token ${id}`)

  let result = null
  try {
    result = await getFromCache(cacheName, 0, () => getHoldersBubbleMapData(id))
  } catch (error) {}

  return result
}

const holderBubbleMapService = {
  getHoldersBubbleMap,
  syncBubbleHoldersMap,
  manualSyncBubbleHoldersMap,
}

export default holderBubbleMapService
