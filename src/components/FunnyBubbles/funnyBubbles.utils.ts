import * as PIXI from 'pixi.js'
import { FunnyCircle, FunnyDataType } from './type'
import { MIN_FONT_SIZE, PixiUtils } from './funnyPixi.utils'

export type GenerateCirclesParams = {
  coins: FunnyDataType[]
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

const { wallDamping, speed, elasticity, minCircleSize } = appConfig

const changeSizeStep = 2

export class BubblesUtils {
  static getScalingFactor = (
    data: FunnyDataType[],
    width: number,
    height: number
  ): number => {
    if (!data) return 1

    const max = data?.map((item: FunnyDataType) => {
      return Math.abs((item.size || 0)!)
    })

    let totalSquare = 0

    for (let i = 0; i < max.length; i++) {
      const area = Math.PI * max[i] * max[i]
      totalSquare += area
    }

    return Math.sqrt((width * height) / totalSquare) * (width > 920 ? 0.8 : 0.8)
  }

  static update = (
    circles: FunnyCircle[],
    imageSprites: PIXI.Sprite[],
    circleGraphics: PIXI.Sprite[] = [],
    width: number,
    height: number
  ) => {
    return () => {
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i]
        const circleGraphic = circleGraphics[i]
        const imageSprite = imageSprites[i]

        const updateCircleChilds = () => {
          circleGraphic.texture = PixiUtils.createGradientTexture(
            circle.radius * 4,
            circle.color
          )

          const isFullSize = circle.radius * 0.5 < MIN_FONT_SIZE

          if (imageSprite) {
            imageSprite.width = circle.radius * (isFullSize ? 1 : 0.5)
            imageSprite.height = circle.radius * (isFullSize ? 1 : 0.5)
            imageSprite.position = {
              x: 0,
              y: isFullSize ? 0 : -circle.radius / 2,
            }
          }
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
        }
      }
    }
  }

  static handleEmptySpaceClick = (
    event: MouseEvent,
    circles: FunnyCircle[]
  ) => {
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

  static handleMouseMove = (event: MouseEvent, circle: FunnyCircle) => {
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

  static generateCircles = (
    coins: FunnyDataType[],
    scalingFactor: number,
    width: number,
    height: number
  ) => {
    const shapes: FunnyCircle[] = coins.map((item) => {
      const radius = Math.abs(item.size * scalingFactor)

      const data = {
        id: item.id,
        image: item.logoUrl,
        x: Math.random() * (width - radius * 2),
        y: Math.random() * (height - radius * 2),
        vx: Math.random() * speed * 2 - speed,
        vy: Math.random() * speed * 2 - speed,
        color: 'light-blue',
        targetRadius: radius,
        radius,
        dragging: false,
        size: item.size,
        item,
      }

      return data
    })

    return shapes
  }
}
