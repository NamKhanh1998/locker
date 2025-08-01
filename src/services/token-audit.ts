import axios from 'axios'
import { getFromCache } from './firestore-cache'
import { nexaKey } from '@/config/apiKey'

const getAuditGoPlus = async (address: string) => {
  const url = `https://api.gopluslabs.io/api/v1/sui/token_security?contract_addresses=${address}`
  const res = await axios.get(url)
  return res?.data?.result?.[address]
}

const getAuditNexa = async (address: string) => {
  const url = `https://api-ex.insidex.trade/coins/${address}/safety-check`
  const res = await axios.get(url, {
    headers: {
      'x-api-key': nexaKey,
    },
  })
  return res?.data
}

const getTokenSafety = async (address: string) => {
  const cacheName = `safety-check-${address}`

  const MONTH_IN_S = 60 * 60 * 24 * 30

  const result = await getFromCache(cacheName, MONTH_IN_S, async () => {
    const promises = [getAuditNexa(address), getAuditGoPlus(address)]
    const [nexaRes, goPlusRes] = await Promise.all(promises)

    const metadataModifiable = goPlusRes?.metadata_modifiable?.value !== '0'
    const mintable = goPlusRes?.mintable?.value !== '0'
    const blacklist = goPlusRes?.blacklist?.value !== '0'
    const contractUpgradeable = goPlusRes?.contract_upgradeable?.value !== '0'
    const isCoinHoneyPot = nexaRes?.isCoinHoneyPot
    const burntLpPosition = nexaRes?.burntLpPosition

    return {
      metadataModifiable,
      mintable,
      blacklist,
      contractUpgradeable,
      isCoinHoneyPot,
      burntLpPosition,
    }
  })

  return result
}

export const tokenAuditService = {
  getTokenSafety,
}
