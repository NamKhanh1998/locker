import axios from 'axios'
import * as _ from 'lodash'

const URL_DEXSCREENER = 'https://api.dexscreener.com/tokens/v1/sui'
const DEXSCREENER_LIMIT_COUNT = 30

const getPriceSuiDexscreener = async () => {
  try {
    const url = ``

    const response = await axios.get(url)
    const data = response?.data
    return _.keyBy(
      data?.map((item: any) => ({
        address: item?.baseToken?.address,
        price: item?.priceUsd,
      })),
      'address'
    )
  } catch (e) {
    return null
  }
}

const getDataDexscreener = async (address: string) => {
  try {
    const url = `${URL_DEXSCREENER}/${address}`
    const response = await axios.get(url)
    const data = response?.data
    if (data?.length > 0) {
      return data?.map((item: any) => {
        return item?.pairAddress
      })
    }
    return []
  } catch (e) {
    return null
  }
}

const getPriceTokensDexscreener = async (
  arrAddressCA: string[],
  caInfo: any
) => {
  const listChunk = _.chunk(arrAddressCA, DEXSCREENER_LIMIT_COUNT)
  try {
    const promiseRequests = listChunk.map((list) => {
      const listAddress = list.join(',')
      const url = `${URL_DEXSCREENER}/${listAddress}`
      return axios.get(url)
    })
    const promisesResponse = await Promise.all(promiseRequests)
    const res = promisesResponse.reduce((acc, response) => {
      const data = response.data
      // Flatten and extract priceUsd
      return acc.concat(
        data.map((token: any) => {
          return {
            address: token?.baseToken?.address,
            priceUsd: token?.priceUsd,
          }
        })
      )
    }, [])
    return _.keyBy([...res, ...[caInfo]], 'address')
  } catch (err) {
    throw err
  }
}

const priceService = {
  getPriceSuiDexscreener,
  getDataDexscreener,
  getPriceTokensDexscreener,
}
export default priceService
