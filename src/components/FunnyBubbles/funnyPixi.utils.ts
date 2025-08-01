import * as PIXI from 'pixi.js'

import { isMobile } from 'react-device-detect'
import { FunnyCircle } from './type'

const gradientTextureCache: Map<string, PIXI.Texture> = new Map()

export const MIN_FONT_SIZE = 6

type GradientStop = [number, string]

type GradientColors = {
  [key: string]: GradientStop[]
}

const gradientColorConfigs: GradientColors = {
  // green - red
  'light-green': [
    [0.15, 'rgba(87, 199, 85, 0.1)'],
    [0.25, 'rgba(87, 199, 85, 0.15)'],
    [0.42, 'rgba(87, 199, 85, 0.25)'],
    [0.5, 'rgba(87, 199, 85, 0.8)'],
    [0.6, 'rgba(87, 199, 85, 1)'],
  ],
  green: [
    [0.15, 'rgba(66, 165, 55, 0.1)'],
    [0.25, 'rgba(66, 165, 55, 0.15)'],
    [0.42, 'rgba(66, 165, 55, 0.25)'],
    [0.5, 'rgba(21, 232, 15, 0.8)'],
    [0.6, 'rgba(21, 232, 15, 1)'],
  ],
  'light-red': [
    [0.15, 'rgba(147, 69, 70, 0.1)'],
    [0.25, 'rgba(147, 69, 70, 0.15)'],
    [0.42, 'rgba(147, 69, 70, 0.25)'],
    [0.5, 'rgba(147, 69, 70, 0.8)'],
    [0.6, 'rgba(147, 69, 70, 1)'],
  ],
  red: [
    [0.15, 'rgba(243, 7, 5, 0.03)'],
    [0.25, 'rgba(243, 7, 5, 0.08)'],
    [0.42, 'rgba(243, 7, 5, 0.1)'],
    [0.5, 'rgba(243, 7, 5, 0.6)'],
    [0.6, 'rgba(243, 7, 5, 1)'],
  ],

  // pink - mint
  'light-pink': [
    [0.15, 'rgba(242, 179, 255, 0.1)'],
    [0.25, 'rgba(242, 179, 255, 0.15)'],
    [0.42, 'rgba(242, 179, 255, 0.25)'],
    [0.5, 'rgba(242, 179, 255, 0.8)'],
    [0.6, 'rgb(242, 179, 255)'],
  ],
  pink: [
    [0.15, 'rgba(255, 106, 230, 0.1)'],
    [0.25, 'rgba(255, 106, 230, 0.15)'],
    [0.42, 'rgba(255, 106, 230, 0.25)'],
    [0.5, 'rgba(255, 106, 230, 0.8)'],
    [0.6, 'rgb(255, 106, 230)'],
  ],
  'light-mint': [
    [0.15, 'rgba(142, 255, 184, 0.1)'],
    [0.25, 'rgba(142, 255, 184, 0.15)'],
    [0.42, 'rgba(142, 255, 184, 0.25)'],
    [0.5, 'rgba(142, 255, 184, 0.8)'],
    [0.6, 'rgb(142, 255, 184)'],
  ],
  mint: [
    [0.15, 'rgba(58, 214, 129, 0.03)'],
    [0.25, 'rgba(58, 214, 129, 0.08)'],
    [0.42, 'rgba(58, 214, 129, 0.1)'],
    [0.5, 'rgba(58, 214, 129, 0.6)'],
    [0.6, 'rgb(58, 214, 129)'],
  ],

  // blue - yellow
  'light-blue': [
    [0.15, 'rgba(85, 182, 199, 0.1)'],
    [0.25, 'rgba(85, 182, 199, 0.15)'],
    [0.42, 'rgba(85, 182, 199, 0.25)'],
    [0.5, 'rgba(85, 182, 199, 0.8)'],
    [0.6, 'rgb(85, 182, 199)'],
  ],
  blue: [
    [0.15, 'rgba(62, 139, 234, 0.1)'],
    [0.25, 'rgba(62, 139, 234, 0.15)'],
    [0.42, 'rgba(62, 139, 234, 0.25)'],
    [0.5, 'rgba(62, 139, 234, 0.8)'],
    [0.6, 'rgb(62, 139, 234)'],
  ],
  'light-yellow': [
    [0.15, 'rgba(249, 245, 131, 0.1)'],
    [0.25, 'rgba(249, 245, 131, 0.15)'],
    [0.42, 'rgba(249, 245, 131, 0.25)'],
    [0.5, 'rgba(249, 245, 131, 0.8)'],
    [0.6, 'rgb(249, 245, 131)'],
  ],
  yellow: [
    [0.15, 'rgba(243, 232, 9, 0.03)'],
    [0.25, 'rgba(243, 232, 9, 0.08)'],
    [0.42, 'rgba(243, 232, 9, 0.1)'],
    [0.5, 'rgba(243, 232, 9, 0.6)'],
    [0.6, 'rgb(243, 232, 9)'],
  ],

  gray: [
    [0.15, 'rgba(116, 116, 116, 0.1)'],
    [0.25, 'rgba(116, 116, 116, 0.15)'],
    [0.42, 'rgba(116, 116, 116, 0.26)'],
    [0.5, 'rgba(116, 116, 116, 0.8)'],
    [0.6, 'rgba(116, 116, 116, 1)'],
  ],
}

export class PixiUtils {
  static createContainer = (circle: FunnyCircle) => {
    const container = new PIXI.Container()
    container.position.set(circle.x, circle.y)
    container.hitArea = new PIXI.Circle(0, 0, circle.radius)
    container.eventMode = 'dynamic'
    return container
  }

  static createImageSprite = (circle: FunnyCircle) => {
    const imgUrl = `/${circle.image}.png`

    const imageSprite = PIXI.Sprite.from(imgUrl)

    const isFullSize = true

    imageSprite.anchor.set(0.5)
    imageSprite.width = circle.radius * (isFullSize ? 1.2 : 0.5)
    imageSprite.height = circle.radius * (isFullSize ? 1.2 : 0.5)

    imageSprite.position = { x: 0, y: isFullSize ? 0 : -circle.radius / 2 }

    return imageSprite
  }

  static createGradientTexture(
    radius: number,
    color: string,
    qualityMultiplier: number = isMobile ? 3 : 1.5
  ): PIXI.Texture {
    const textureKey: string = `${radius}_${color}`

    if (gradientTextureCache.has(textureKey)) {
      return gradientTextureCache.get(textureKey)!
    }

    const canvas: HTMLCanvasElement = document.createElement('canvas')

    const extraRadius = radius * qualityMultiplier
    canvas.width = extraRadius
    canvas.height = extraRadius
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

    if (context) {
      // Create the radial gradient based on the provided color
      const gradient: CanvasGradient = context.createRadialGradient(
        extraRadius / 2,
        extraRadius / 2,
        0,
        extraRadius / 2,
        extraRadius / 2,
        extraRadius / 2
      )

      gradientColorConfigs[color].forEach(([stop, color]: any) => {
        gradient.addColorStop(stop, color)
      })

      // Fill the canvas with the gradient
      context.fillStyle = gradient
      context.beginPath()
      context.arc(
        extraRadius / 2,
        extraRadius / 2,
        extraRadius / 2 / 2,
        0,
        Math.PI * 2
      )
      context.fill()

      // Create a PIXI texture from the canvas
      const texture: PIXI.Texture = PIXI.Texture.from(canvas, {
        resolution: qualityMultiplier,
      })
      texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR

      // Cache the texture for future use
      gradientTextureCache.set(textureKey, texture)

      return texture
    }

    return PIXI.Texture.from(canvas)
  }
}
