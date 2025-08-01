import { orderBy, size } from 'lodash'
import { BlockSize } from '../type'
import { CoingeckoCoinData } from '@/components/Bubbles/data.type'
import * as htmlToImage from 'html-to-image'

export function formatSmallNumber(num: any) {
  if (!num) return ''
  if (Math.abs(num) >= 1) {
    return num.toFixed(4)
  } else {
    const exponent = num?.toExponential(4)
    const [coefficient, exponentPart] = exponent?.split('e')
    return `${parseFloat(coefficient).toFixed(4)}e${exponentPart}`
  }
}

export function formatNumber(num: number) {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}B`
  } else if (num >= 1000000) {
    return `${(num / 1000000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}K`
  } else {
    return num.toString()
  }
}

export const displayPriceWithDecimals = (price: number, decimals: number) => {
  return price.toLocaleString(undefined, { maximumFractionDigits: decimals })
}

export const sortDataByOption = (tokens: any, blockSize: BlockSize) => {
  if (!size(tokens)) return []

  return orderBy(tokens, blockSize, 'desc')
}

export const getValuedDataByOption = (tokens: any, blockSize: BlockSize) => {
  if (!size(tokens)) return []

  return tokens.filter((item: any) => +item?.[blockSize] > 0)
}

export const getSizeForHeatMap = (
  blockSize: BlockSize,
  token: CoingeckoCoinData
) => {
  if (blockSize === BlockSize.MKC) {
    return Math.cbrt(token?.marketCap || 0)?.toFixed(1)
  }
  if (blockSize === BlockSize.VOLUME) {
    return Number(Math.cbrt(token?.volume)?.toFixed(1))
  }

  return Math.cbrt(token?.totalLiquidity)?.toFixed(1)
}

export const getLabelColor = (changePercent: number) => {
  if (changePercent === 0) {
    return '#a0a0a0'
  }

  if (changePercent >= 0 && changePercent <= 5) {
    return '#81da81'
  } else if (changePercent > 5 && changePercent <= 15) {
    return '#3ddb37'
  } else if (changePercent > 15) {
    return '#018051'
  } else if (changePercent < 0 && changePercent >= -5) {
    return '#f65a61'
  } else if (changePercent < -5 && changePercent >= -15) {
    return '#f73b45'
  } else {
    return '#c5161e'
  }
}

export const takeScreenShot = async (node: any) => {
  const dataURI = await htmlToImage.toJpeg(node)

  return dataURI
}

export const copyImageToClipboard = async (base64Image?: string) => {
  if (!base64Image) return

  try {
    const byteCharacters = atob(base64Image.split(',')[1])
    const arrayBuffer = new ArrayBuffer(byteCharacters.length)
    const uint8Array = new Uint8Array(arrayBuffer)
    for (let i = 0; i < byteCharacters.length; i++) {
      uint8Array[i] = byteCharacters.charCodeAt(i)
    }
    const imageBlob = new Blob([uint8Array], { type: 'image/png' })

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': imageBlob,
      }),
    ])
    console.log('Image copied to clipboard successfully')
  } catch (error) {
    console.error('Error copying image to clipboard:', error)
  }
}

export const dowloadImg = (image: any) => {
  if (image) {
    const timenow = `${new Date()
      .toLocaleString('en-US', {
        month: 'short',
        year: 'numeric',
        day: 'numeric',
      })
      .replaceAll(',', '')
      .replaceAll(' ', '-')}`
    const filename = `BUBO-HEATMAP.jpeg`

    if (filename) {
      const link = document.createElement('a')
      link.href = image
      link.download = filename

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
