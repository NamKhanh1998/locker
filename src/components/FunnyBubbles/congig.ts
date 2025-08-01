import { sample } from 'lodash'
import { FunnyDataType, PartnerType } from './type'

const mochiData: FunnyDataType[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  size: Math.floor(Math.random() * (40 - 10 + 1)) + 20,
  logoUrl: sample(['partners/mochi', 'partners/mochi2', 'partners/mochi3']),
  partner: PartnerType.MOCHI,
}))

const suiaiData: FunnyDataType[] = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  size: Math.floor(Math.random() * (40 - 10 + 1)) + 15,
  logoUrl: sample(['partners/suai']),
  partner: PartnerType.SUIAI,
}))

const suiaccData: FunnyDataType[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  size: Math.floor(Math.random() * (40 - 10 + 1)) + 20,
  logoUrl: 'partners/suiaccelerator',
  partner: PartnerType.SUIACC,
}))

const chopData: FunnyDataType[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  size: Math.floor(Math.random() * (40 - 10 + 1)) + 20,
  logoUrl: sample(['partners/chop', 'partners/chop1', 'partners/chop2']),
  partner: PartnerType.CHOP,
}))

const axolData: FunnyDataType[] = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  size: Math.floor(Math.random() * (40 - 10 + 1)) + 20,
  logoUrl: sample(['partners/axol', 'partners/axol1', 'partners/axol2']),
  partner: PartnerType.AXOL,
}))

export const dummyData: FunnyDataType[] = [
  ...Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    size: Math.floor(Math.random() * (40 - 10 + 1)) + 10, // Random size between 10 and 40
    logoUrl: sample([
      'partners/bubo',
      'partners/bubo2',
      'partners/bubo3',
    ]) as string,
  })),
  ...suiaccData,
  ...suiaiData,
  ...mochiData,
  ...chopData,
  ...axolData,
]?.map((_, index) => ({ ..._, id: index }))
