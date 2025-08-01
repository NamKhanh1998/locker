import { Dictionary, isEmpty, keyBy, size } from 'lodash'
import { PromoteProjects } from '../config'
import { CoingeckoCoinData } from '../data.type'

export const convertToUSD = (value: number, max: number = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: max,
  }).format(value)
}

export const getDefaultSearchList = (
  data: CoingeckoCoinData[],
  dataMap: Dictionary<CoingeckoCoinData>
) => {
  if (isEmpty(data)) return []

  const promoteMap = keyBy(PromoteProjects, (_: any) =>
    _?.address?.toLowerCase()
  )

  const list: CoingeckoCoinData[] = []

  PromoteProjects.forEach((p) => {
    if (dataMap?.[p.address.toLowerCase()]) {
      list.push(dataMap?.[p.address.toLowerCase()])
    }
  })

  for (let index = 0; index < data.length; index++) {
    const token = data[index]

    if (!promoteMap?.[token.address.toLowerCase()]) {
      list.push(token)
    }

    if (size(list) === 10) break
  }

  return list
}
