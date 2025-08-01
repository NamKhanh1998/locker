import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import { useElementSize } from '@/hooks/useElementSize'
import { BubblesUtils } from './funnyBubbles.utils'
import { FunnyCircle, PartnerType } from './type'
import * as PIXI from 'pixi.js'
import { themes } from '@/config'
import Box from '../commonStyled/Box'
import { PixiUtils } from './funnyPixi.utils'
import { dummyData } from './congig'
import Modal from '../Modal'
import { Tweet } from 'react-tweet'
import CloseIcon from '@mui/icons-material/Close'

const BubblesWrap = styled(Flex)`
  width: 100%;
  height: calc(100vh - 360px);
  min-height: 300px;
  border-radius: 8px;
  border: 1px solid #454343;
  overflow: hidden;
`

const XPostWrap = styled(Flex)`
  position: relative;
`
const IconWrap = styled(Flex)`
  position: absolute;
  right: 10px;
  top: 30px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  background-color: #b7d0e5;
  justify-content: center;
  align-items: center;
  z-index: 100;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #15202b;
  &:hover {
    background-color: #0a1e32;
  }
`

const FunnyBubbles = () => {
  const [ref, size] = useElementSize()
  const appRef = React.useRef<HTMLDivElement>(null)

  const { width, height } = size

  const [circles, setCircles] = useState<FunnyCircle[] | null>(null)
  const [selectedPartner, setSelectedPartner] = useState<null | PartnerType>(
    null
  )

  useEffect(() => {
    if (dummyData) {
      const scalingFactor = BubblesUtils.getScalingFactor(
        dummyData,
        width,
        height
      )

      const shapes = BubblesUtils.generateCircles(
        dummyData,
        scalingFactor,
        width,
        height
      )

      setCircles(shapes)
    }
  }, [dummyData, width, height])

  useEffect(() => {
    if (!circles || !width || !height) return

    const imageSprites: PIXI.Sprite[] = []
    const circleGraphics: PIXI.Sprite[] = []

    const app = new PIXI.Application({
      width,
      height,
      backgroundColor: themes.backgroundColor,
      resolution: 2,
      autoDensity: true,
    }) as unknown

    const appContainer = appRef?.current

    if (appContainer) {
      if (appContainer.firstChild) {
        appContainer.removeChild(appContainer.firstChild)
      }

      appContainer.appendChild((app as { view: Node }).view)

      appContainer.children[0].addEventListener('click', (e: unknown) =>
        BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles)
      )
    }

    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i]

      const container = PixiUtils.createContainer(circle)
      const imageSprite = PixiUtils.createImageSprite(circle)

      imageSprites.push(imageSprite)
      container.addChild(imageSprite)

      const circleGraphic = new PIXI.Sprite(
        PixiUtils.createGradientTexture(circle.radius * 4, circle.color)
      )
      circleGraphic.anchor.set(0.5)

      circleGraphics.push(circleGraphic)
      container.addChild(circleGraphic)

      container.interactive = true
      container.cursor = 'pointer'

      container.on('click', (event) => {
        if (circle?.item?.partner) {
          setSelectedPartner(circle.item.partner)
        }
      })

      container.on('tap', (event) => {
        if (circle?.item?.partner) {
          setSelectedPartner(circle.item.partner)
        }
      })

      container.on('pointerdown', (event) => {
        circle.dragging = true
      })

      container.on('pointermove', (event) => {
        BubblesUtils.handleMouseMove(event, circle)
      })

      container.on('pointerup', () => {
        circle.dragging = false
      })

      container.on('pointerupoutside', () => {
        circle.dragging = false
      })
      ;(app as PIXI.Application<any>).stage.addChild(container)
    }

    const ticker = BubblesUtils.update(
      circles,
      imageSprites,
      circleGraphics,
      width,
      height
    )

    setTimeout(() => {
      if ((app as PIXI.Application<PIXI.ICanvas>)?.ticker) {
        ;(app as PIXI.Application<PIXI.ICanvas>).ticker.add(ticker)
      }
    }, 200)

    return () => {
      if (app) {
        ;(app as PIXI.Application<PIXI.ICanvas>).stage.removeChildren()
        ;(app as PIXI.Application<PIXI.ICanvas>).destroy(true, {
          texture: true,
          baseTexture: true,
        })
      }

      appContainer?.children[0]?.removeEventListener('click', (e: unknown) =>
        BubblesUtils.handleEmptySpaceClick(e as MouseEvent, circles)
      )
    }
  }, [circles, width, height, appRef, setSelectedPartner])

  return (
    <BubblesWrap ref={ref}>
      <Box
        ref={appRef}
        width="100%"
        height="100%"
      />

      <Modal
        isOpen={!!selectedPartner}
        onClose={() => setSelectedPartner(null)}
      >
        {selectedPartner && (
          <XPostWrap>
            <IconWrap onClick={() => setSelectedPartner(null)}>
              <CloseIcon
                sx={{
                  color: '#fff',
                  height: '30px',
                  width: '30px',
                }}
              />
            </IconWrap>
            <Tweet id={selectedPartner} />
          </XPostWrap>
        )}
      </Modal>
    </BubblesWrap>
  )
}

export default FunnyBubbles
