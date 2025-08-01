export interface FunnyDataType {
  size: number
  id: number
  logoUrl: string
  partner?: PartnerType
}

export interface FunnyCircle {
  id: number
  x: number
  y: number
  image: string
  vx: number
  vy: number
  color: string
  targetRadius: number
  radius: number
  dragging: boolean
  size: number
  item: FunnyDataType
}

export enum PartnerType {
  LENS = '1895297603203670500',
  MOCHI = '1903642709224775688',
  SUIAI = '1896104042230923628',
  CHOP = '1905283255609503844',
  AXOL = '1909317248881401963',
  SUIACC = '1911081343204630830',
}
