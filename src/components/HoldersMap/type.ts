export type NodeType = {
  index?: number
  id: string
  user: string
  balance: number
  rank?: number
  percentage: number
  cex: string | null
  label: string
  color?: string
  x?: number
  y?: number
  fx?: number | null
  fy?: number | null
  group?: number
}

export type LinkType = {
  source: string | NodeType
  target: string | NodeType
  value: number
}
