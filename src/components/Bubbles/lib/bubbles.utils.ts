import * as PIXI from 'pixi.js'
import { MIN_FONT_SIZE, PixiUtils } from './pixi.utils'
import {
  BubbleSize,
  Circle,
  Colors,
  PriceChangePercentage,
} from '../bubbles.types'
import { CoingeckoCoinData } from '../data.type'

export type GenerateCirclesParams = {
  coins: CoingeckoCoinData[]
  bubbleSort: PriceChangePercentage
  scalingFactor: number
}

export const appConfig = {
  speed: 0.005,
  elasticity: 0.005,
  wallDamping: 0.5,
  maxCircleSize: 250,
  minCircleSize:
    typeof window !== 'undefined'
      ? window.innerWidth
        ? window.innerWidth > 920
          ? 30
          : 20
        : 20
      : 20,
}

const { wallDamping, speed, elasticity, maxCircleSize, minCircleSize } =
  appConfig

const changeSizeStep = 2

export class BubblesUtils {
  static getScalingFactor = (
    data: CoingeckoCoinData[],
    bubbleSort: PriceChangePercentage = PriceChangePercentage.HOUR,
    width: number,
    height: number
  ): number => {
    if (!data) return 1

    const max = data?.map((item) => {
      return Math.abs((+item[bubbleSort] || 0)!)
    })
    let totalSquare = 0

    for (let i = 0; i < max.length; i++) {
      const area = Math.PI * max[i] * max[i]
      totalSquare += area
    }

    return Math.sqrt((width * height) / totalSquare) * (width > 920 ? 0.8 : 0.6)
  }

  static update = (
    circles: Circle[],
    imageSprites: PIXI.Sprite[],
    textSprites: PIXI.Text[],
    text2Sprites: PIXI.Text[],
    circleGraphics: PIXI.Sprite[] = [],
    width: number,
    height: number
  ) => {
    return () => {
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i]
        const circleGraphic = circleGraphics[i]
        const imageSprite = imageSprites[i]
        const text = textSprites[i]
        const text2 = text2Sprites[i]

        const updateCircleChilds = () => {
          circleGraphic.texture = PixiUtils.createGradientTexture(
            circle.radius * 4,
            circle.color
          )

          const fontSize = circle.radius * 0.5
          const isFullSize = circle.radius * 0.5 < MIN_FONT_SIZE
          const isTextVisible = fontSize >= MIN_FONT_SIZE

          if (imageSprite) {
            imageSprite.width = circle.radius * (isFullSize ? 1 : 0.5)
            imageSprite.height = circle.radius * (isFullSize ? 1 : 0.5)
            imageSprite.position = {
              x: 0,
              y: isFullSize ? 0 : -circle.radius / 2,
            }
          }

          let customFontSize =
            circle.symbol?.length >= 5 ? fontSize * 0.7 : fontSize

          if (circle.symbol?.length >= 8) {
            customFontSize = fontSize * 0.5
          }

          const textStyle = new PIXI.TextStyle({
            fontSize: isTextVisible ? customFontSize + 'px' : '1px',
            fill: '#ffffff',
          })

          const text2Style = new PIXI.TextStyle({
            fontSize: isTextVisible ? fontSize * 0.5 + 'px' : '1px',
            fill: '#ffffff',
          })

          text.style = textStyle
          text.position.y = 0.15 * circle.radius

          text2.style = text2Style
          text2.position.y = circle.radius / 1.5

          circle.childUpdated = true
        }

        // Update circle position
        circle.x += circle.vx
        circle.y += circle.vy

        // Check for collisions with walls
        if (circle.x - circle.radius < 0) {
          circle.x = circle.radius // Keep the circle inside the left wall
          circle.vx *= -1
          circle.vx *= 1 - wallDamping // Apply wall damping
        } else if (circle.x + circle.radius > width) {
          circle.x = width - circle.radius // Keep the circle inside the right wall
          circle.vx *= -1
          circle.vx *= 1 - wallDamping // Apply wall damping
        }
        if (circle.y - circle.radius < 0) {
          circle.y = circle.radius // Keep the circle inside the top wall
          circle.vy *= -1
          circle.vy *= 1 - wallDamping // Apply wall damping
        } else if (circle.y + circle.radius > height) {
          circle.y = height - circle.radius // Keep the circle inside the bottom wall
          circle.vy *= -1
          circle.vy *= 1 - wallDamping // Apply wall damping
        }

        // Check for collisions with other circles
        for (let j = i + 1; j < circles.length; j++) {
          const otherCircle = circles[j]
          const dx = otherCircle.x - circle.x
          const dy = otherCircle.y - circle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < circle.radius + otherCircle.radius) {
            // Colliding circles
            const angle = Math.atan2(dy, dx)

            // Calculate the new velocities after collision with elasticity
            const totalRadius = circle.radius + otherCircle.radius
            const overlap = totalRadius - distance
            const force = overlap * elasticity

            const dampingFactor = wallDamping
            circle.vx -=
              force * Math.cos(angle) * dampingFactor + circle.vx * 0.01
            circle.vy -=
              force * Math.sin(angle) * dampingFactor + circle.vy * 0.01
            otherCircle.vx += force * Math.cos(angle) * dampingFactor
            otherCircle.vy += force * Math.sin(angle) * dampingFactor
          }
        }

        // Update container position

        const container = circleGraphic.parent as PIXI.Container

        container.position.set(circle.x, circle.y)

        // Smoothly change the size of the circle
        if (circle.radius !== circle.targetRadius) {
          container.children.forEach((item) => (item.cacheAsBitmap = false))
          container.cacheAsBitmap = false

          const sizeDifference = circle.targetRadius - circle.radius

          if (Math.abs(sizeDifference) <= changeSizeStep) {
            circle.radius = circle.targetRadius
            container.hitArea = new PIXI.Circle(0, 0, circle.targetRadius)
            // container.cacheAsBitmap = true
          } else {
            if (circle.radius > circle.targetRadius) {
              const newRadius = circle.radius - changeSizeStep
              circle.radius = newRadius
              container.hitArea = new PIXI.Circle(0, 0, newRadius)
            } else {
              const newRadius = circle.radius + changeSizeStep
              circle.radius = newRadius
              container.hitArea = new PIXI.Circle(0, 0, newRadius)
            }
            updateCircleChilds()
          }
        } else {
          if (circle.childUpdated) continue
          updateCircleChilds()
        }
      }
    }
  }

  static handleEmptySpaceClick = (event: MouseEvent, circles: Circle[]) => {
    const waveForce = 30 // Adjust the wave force as needed

    circles.forEach((circle) => {
      const dx = circle.x - event.clientX
      const dy = circle.y - event.clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)

      // Apply a force to push the balls away from the click point
      circle.vx += (waveForce * Math.cos(angle)) / distance
      circle.vy += (waveForce * Math.sin(angle)) / distance
    })
  }

  static handleMouseMove = (event: MouseEvent, circle: Circle) => {
    if (circle.dragging) {
      // Calculate the velocity based on mouse movement
      const dx = event.clientX - circle.x
      const dy = event.clientY - circle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = 3 // Adjust the speed factor as needed
      circle.vx = (dx / distance) * speed
      circle.vy = (dy / distance) * speed
    }
  }

  static getColorRange = (value: number, bubbleColor: Colors) => {
    if (bubbleColor === Colors.NEUTRAL) return 'gray'

    // blue - yellow
    if (bubbleColor === Colors.RED_GREEN) {
      if (value > 0 && value < 5) {
        return 'light-green'
      }

      if (value >= 5) {
        return 'green'
      }

      if (value < 0 && value > -5) {
        return 'light-red'
      }

      if (value < -5) {
        return 'red'
      }

      return 'gray'
    }

    // pink - mint
    if (bubbleColor === Colors.PINK_MINT) {
      if (value > 0 && value < 5) {
        return 'light-pink'
      }

      if (value >= 5) {
        return 'pink'
      }

      if (value < 0 && value > -5) {
        return 'light-mint'
      }

      if (value < -5) {
        return 'mint'
      }

      return 'gray'
    }

    // blue - yellow
    if (value > 0 && value < 5) {
      return 'light-blue'
    }

    if (value >= 5) {
      return 'blue'
    }

    if (value < 0 && value > -5) {
      return 'light-yellow'
    }

    if (value < -5) {
      return 'yellow'
    }

    return 'gray'
  }

  static generateCircles = (
    coins: CoingeckoCoinData[],
    scalingFactor: number,
    bubbleSort: PriceChangePercentage = PriceChangePercentage.HOUR,
    width: number,
    height: number
  ) => {
    const shapes: Circle[] = coins.map((item) => {
      const radius = Math.abs(item[bubbleSort]! * scalingFactor)

      const data = {
        id: item.id,
        symbol: item.symbol,
        image: item.logoUrl,
        coinName: item.symbol,
        x: Math.random() * (width - radius * 2),
        y: Math.random() * (height - radius * 2),
        vx: Math.random() * speed * 2 - speed,
        vy: Math.random() * speed * 2 - speed,
        color: this.getColorRange(Number(item[bubbleSort]), Colors.NEUTRAL),
        targetRadius: 0,
        radius: minCircleSize,
        dragging: false,
        text2: null,
        [PriceChangePercentage.HOUR]: item[PriceChangePercentage.HOUR] || 0,
        [PriceChangePercentage.SIXHOURS]:
          item[PriceChangePercentage.SIXHOURS] || 0,
        [PriceChangePercentage.DAY]: item[PriceChangePercentage.DAY] || 0,
        [PriceChangePercentage.WEEK]: item[PriceChangePercentage.WEEK] || 0,
        [PriceChangePercentage.MONTH]: item[PriceChangePercentage.MONTH] || 0,
        [PriceChangePercentage.YEAR]: item[PriceChangePercentage.YEAR] || 0,
        [BubbleSize.MKC]: item[BubbleSize.MKC] || 0,
        [BubbleSize.VOLUME]: item[BubbleSize.VOLUME] || 0,
        [BubbleSize.LIQUIDITY]: item[BubbleSize.LIQUIDITY] || 0,
        token: item,
        childUpdated: false,
      }

      const shape = { ...data, text2: PixiUtils.createText2(data, bubbleSort) }

      return shape
    })

    return shapes
  }
}

export const getBubbleSort = (
  bubbleSize: BubbleSize,
  performance: PriceChangePercentage
) => {
  if (bubbleSize === BubbleSize.MKC) return BubbleSize.MKC
  if (bubbleSize === BubbleSize.VOLUME) return BubbleSize.VOLUME
  if (bubbleSize === BubbleSize.LIQUIDITY) return BubbleSize.LIQUIDITY

  return performance
}
