import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { isNumber } from 'lodash'

dayjs.extend(duration)

export const sliceAddress = (address: string, sliceNumber?: number) => {
  return address
    ? `${address.slice(0, sliceNumber ?? 6)}...${address.slice(
        -(sliceNumber ?? 6)
      )}`
    : ''
}

export const formatNumberWithCommas = (number: any) => {
  return Number(number).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

export const formatAmount = (balance: any, decimal: number) => {
  return balance / Math.pow(10, decimal)
}

export const isAddress = (address: string) => {
  if (!address.startsWith('0x')) {
    return false
  }
  return true
}

export function formatNumber(num: number) {
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1).replace(/\.0$/, '')}B`
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1).replace(/\.0$/, '')}M`
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1).replace(/\.0$/, '')}K`
  }
  return num.toLocaleString(undefined, { maximumFractionDigits: 3 })
}

export const formatDateNormalised = (date: Date) => {
  if (Number.isNaN(date.getTime())) {
    return {
      dateString: '',
      timeString: '',
    }
  }

  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  })
  const timeString = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })

  return {
    dateString,
    timeString,
  }
}

export const timeAgo = (timestamp: any) => {
  const diffInMs = Date.now() - timestamp
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays >= 1) {
    return `${diffInDays}d`
  } else {
    const hours = Math.floor(diffInMinutes / 60)
    const minutes = diffInMinutes % 60
    return `${hours}h ${minutes}m`
  }
}

export const convertToPercentage = (decimal: number) => {
  return (decimal * 100).toFixed(2) + '%'
}

export const getTrendByIndex = (score: number) => {
  if (score >= 1)
    return {
      color: '#16A34A', // Dark Green
      text: 'Super Bullish 🚀',
    }
  if (score >= 0.5)
    return {
      color: '#22C55E', // Green
      text: 'Bullish 📈',
    }
  if (score >= 0)
    return {
      color: '#EAB308', // Yellow
      text: 'Neutral ⚖️',
    }
  if (score >= -0.5)
    return {
      color: '#F97316', // Orange
      text: 'Bearish 🐻',
    }
  return {
    color: '#DC2626', // Red
    text: 'Super Bearish 💀',
  }
}

export const getFearAndGreedData = (data: any) => {
  const text = data?.data?.at(0)?.value_classification
  const score = Number(data?.data?.at(0)?.value)

  if (score <= 24) {
    return { color: '#DC2626', text: `Extreme Fear 😱`, score }
  }

  if (score >= 25 && score <= 50) {
    return { color: '#FACC15', text: `Fear 😨`, score }
  }

  if (score > 50 && score <= 74) {
    return { color: '#22C55E', text: `Greed 😏`, score }
  }

  return { color: '#16A34A', text: `Extreme Greed 🤩`, score }
}

export function formatToSignificantDigits(num: number) {
  if (Math.abs(num) === 0) return '0'

  const formatted = num.toFixed(6).replace(/\.?0+$/, '') // Remove trailing zeros

  // Check if it's smaller than the smallest 6-decimal number
  if (Math.abs(num) < 0.000001) {
    return '<0.000001'
  }

  return formatted
}

export function formatTimeSince(timestampMs: number) {
  const now = dayjs()
  const created = dayjs(timestampMs)

  if (created.isAfter(now)) return '0h'

  const diffMs = now.diff(created)
  const totalDays = diffMs / (1000 * 60 * 60 * 24)
  const avgDaysPerMonth = 30.4375
  const avgDaysPerYear = 365.25

  const years = Math.floor(totalDays / avgDaysPerYear)
  const months = Math.floor((totalDays % avgDaysPerYear) / avgDaysPerMonth)
  const days = Math.floor(totalDays % avgDaysPerMonth)
  const hours = dayjs.duration(diffMs).hours()

  const parts = []

  if (years > 0) {
    parts.push(`${years}y`)
    if (months > 0) parts.push(`${months}mo`)
    if (days > 0) parts.push(`${days}d`)
  } else {
    if (months > 0) parts.push(`${months}mo`)
    if (days > 0 || months === 0) parts.push(`${days}d`)
    // if (hours > 0 || (months === 0 && days === 0)) parts.push(`${hours}h`)
  }

  return parts.join(' ')
}

export const subNumbers = {
  '0': '₀',
  '1': '₁',
  '2': '₂',
  '3': '₃',
  '4': '₄',
  '5': '₅',
  '6': '₆',
  '7': '₇',
  '8': '₈',
  '9': '₉',
}

const getPriceFormat = (price?: string) => {
  if (!price) return null

  const parts = price.split('.')
  const mainPart = parts[1]
  const mainPartChars = mainPart?.split('')

  const zeroNumbersToDisplaySmall = mainPartChars?.findIndex((item: string) => {
    return item !== '0'
  })

  return {
    firstPart: `${parts[0]}.0`,
    secondPart: zeroNumbersToDisplaySmall,
    thirdPart: mainPart?.slice(
      zeroNumbersToDisplaySmall,
      zeroNumbersToDisplaySmall + 4
    ),
  }
}

export const formatPrice = (value: number) => {
  if (value === 0) return '0'
  if (value > 0.01)
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
  let valueStr = value.toFixed(30)
  const formatted = getPriceFormat(valueStr)

  if ((subNumbers as any)[formatted?.secondPart?.toString()!]) {
    return `$${formatted?.firstPart}${
      (subNumbers as any)[formatted?.secondPart?.toString()!] || '0'
    }${formatted?.thirdPart || 0}`
  }
  return '$0'
}

export const getTimeAgo = (timestamp: number) => {
  if (!timestamp || typeof timestamp !== 'number') return '-'

  const diffInMs = Date.now() - timestamp
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  const years = Math.floor(diffInDays / 365)
  const months = Math.floor((diffInDays % 365) / 30)
  const days = diffInDays % 30

  if (years >= 1) {
    const yPart = `${years}y`
    const mPart = months > 0 ? ` ${months}mo` : ''
    return yPart + mPart
  }

  if (diffInDays >= 30) {
    const mPart = `${months}mo`
    const dPart = days > 0 ? ` ${days}d` : ''
    return mPart + dPart
  }

  if (diffInDays >= 1) {
    return `${diffInDays}d`
  }

  const hours = Math.floor(diffInMinutes / 60)
  const minutes = diffInMinutes % 60
  const hPart = hours > 0 ? `${hours}h` : ''
  const mPart = minutes > 0 ? `${minutes}m` : ''
  return hPart + (hPart && mPart ? ' ' : '') + mPart || '0m'
}
