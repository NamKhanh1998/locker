export const formatAddress = (
  address: string,
  ops?: {
    first?: number
    last?: number
  }
) => {
  return `${address?.slice(0, ops?.first || 3)}. . .${address?.slice(
    ops?.last || -4
  )}`
}
