import axios from 'axios'
import { flatMap, keyBy } from 'lodash'
import { tokensList as suiTokensList } from '@/config/tokens/sui'
import fsRaidenX from '@/firestore/raidenX'

const getRaidenXTopTokens = async (page: number) => {
  const url = `https://api-external.raidenx.io/api/v1/sui/tokens/top-tokens?network=sui&page=${page}&limit=200&priceStatsBase=usd`

  const res = await axios.get(url)
  return res?.data?.docs
}

const getRaidenXTokens = async () => {
  const data = await Promise.all([
    getRaidenXTopTokens(1),
    getRaidenXTopTokens(2),
  ])

  const suiTokensMap = keyBy(suiTokensList, (_) => _.address.toLowerCase())

  const flatmapData = flatMap(data)
  const validData = flatmapData?.filter(
    (item) => suiTokensMap?.[item?.address?.toLowerCase()]
  )

  return validData?.map(({ logoImageUrl, network, bannerImageUrl, ..._ }) => ({
    ..._,
    id: _?.address?.toLowerCase(),
    updatedAt: new Date(),
  }))
}

const updateRaidenXTokens = async () => {
  const tokens = await getRaidenXTokens()

  await fsRaidenX.batchUpsert(tokens)

  return tokens
}

export const raidenXService = {
  getRaidenXTopTokens,
  getRaidenXTokens,
  updateRaidenXTokens,
}
