import { LinkType, NodeType } from './type'

export const getScalingFactor = (
  data: NodeType[],
  width: number,
  height: number
): number => {
  if (!data) return 1

  const max = data?.map((item) => {
    return Math.abs((+item.balance || 0)!)
  })

  let totalSquare = 0

  for (let i = 0; i < max.length; i++) {
    const area = Math.PI * max[i] * max[i]
    totalSquare += area
  }

  return Math.sqrt((width * height) / totalSquare) * 1
}

export const transformData = (
  data: NodeType[],
  width: number,
  height: number,
  links: LinkType[]
) => {
  const scalingFactor = getScalingFactor(data, width, height)

  const minRadius = 8
  const maxRadius = 80

  const nodes = data?.map((node) => {
    const rawRadius = scalingFactor * node.balance
    const clampedRadius = Math.max(minRadius, Math.min(maxRadius, rawRadius))
    return { ...node, radius: clampedRadius }
  })

  return {
    nodes,
    links,
  }
}

export const assignGroupsToNodes = (nodes: NodeType[], links: LinkType[]) => {
  const parent: Record<string, string> = {}

  // B1: Khởi tạo parent của mỗi node là chính nó
  nodes.forEach((node) => {
    parent[node.id] = node.id
  })

  const find = (id: string): string => {
    if (parent[id] !== id) {
      parent[id] = find(parent[id]) // path compression
    }
    return parent[id]
  }

  const union = (a: string, b: string) => {
    const pa = find(a)
    const pb = find(b)
    if (pa !== pb) parent[pa] = pb
  }

  const getId = (n: string | NodeType): string =>
    typeof n === 'string' ? n : n.id

  // B2: Kết hợp các node có liên kết
  links.forEach((link) => {
    const sourceId = getId(link.source)
    const targetId = getId(link.target)

    if (parent[sourceId] && parent[targetId]) {
      union(sourceId, targetId)
    }
  })

  const groupMap = new Map<string, number>()
  let groupCounter = 0
  const soloGroup = groupCounter++ // Nhóm dành cho các node đơn lẻ

  nodes.forEach((node) => {
    const root = find(node.id)

    const isIsolated = !links.some(
      (link) => getId(link.source) === node.id || getId(link.target) === node.id
    )

    if (isIsolated) {
      ;(node as any).group = soloGroup
    } else {
      if (!groupMap.has(root)) {
        groupMap.set(root, groupCounter++)
      }
      ;(node as any).group = groupMap.get(root)
    }
  })

  return nodes
}
