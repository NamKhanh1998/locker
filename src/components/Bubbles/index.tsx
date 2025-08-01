import { devices, themes } from '@/config'
import { useDebounceNoTrigger } from '@/hooks/useDebounceNoTrigger'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import * as PIXI from 'pixi.js'
import React, { useEffect, useMemo, useState } from 'react'
import { useWindowSize } from 'react-use'
import styled from 'styled-components'
import Footer from '../common/Footer'
import Box from '../commonStyled/Box'
import Flex from '../commonStyled/Flex'
import TokenModal from '../TokenModal'
import UserWallet from '../UserWallet'
import { Circle, PriceChangePercentage } from './bubbles.types'
import Header from './Header'
import { useBtnChangeState } from './hooks/useBtnChangeState'
import { useFetchAndManageCoins } from './hooks/useFetchCoins'
import { useManageOptions } from './hooks/useManageOptions'
import { useManageSelectedToken } from './hooks/useManageSelectedToken'
import { BubblesUtils, getBubbleSort } from './lib/bubbles.utils'
import { PixiUtils } from './lib/pixi.utils'
import Loading from './Loading'
import Options from './Options'
import LogoLoading from '../Loading/LoadingLogo'

const OPTION_BAR_HEIGHT = 50
const TOP_MENU_HEIGHT = 60

const BubblesWrap = styled(Flex)<{ $isMobile?: boolean }>`
  background-color: #121212;
  width: 100vw;
  height: 100%;

  @media screen and (min-width: 768px) {
    height: calc(100vh - 60px);
  }
`

const FooterWrap = styled(Flex)`
  display: none;
  width: 100%;
  @media ${devices.laptop} {
    display: flex;
  }
`

const MobileMenu = styled(Flex)`
  width: 100%;
  height: 50px;
  padding: 0px 5px 5px 5px;
  justify-content: flex-end;
`

const Bubbles = () => {
  const { isMobile } = useMatchBreakPoints()

  const { data: coins, isLoading } = useFetchAndManageCoins()

  const { width: rawW, height: rawH } = useWindowSize()

  const debouncedW = useDebounceNoTrigger(rawW, 300)

  const debouncedH = useDebounceNoTrigger(rawH, 300)

  const { width, height, maxCircleSize, minCircleSize } = useMemo(() => {
    const minCircleSize = debouncedW
      ? debouncedW
        ? debouncedW > 920
          ? 30
          : 20
        : 20
      : 20

    return {
      width: debouncedW || 0,
      height: debouncedH
        ? debouncedH - OPTION_BAR_HEIGHT - TOP_MENU_HEIGHT - (isMobile ? 0 : 0)
        : 0,
      maxCircleSize: 250,
      minCircleSize,
    }
  }, [debouncedW, debouncedH, isMobile])

  const {
    options: { bubbleSize, performance, chain, bubbleColor },
  } = useManageOptions()

  const { setSelectedToken } = useManageSelectedToken()

  const [circles, setCircles] = useState<Circle[] | null>(null)

  const appRef = React.useRef<HTMLDivElement>(null)

  const changeState = useBtnChangeState(coins)

  const scalingFactor = useMemo(() => {
    if (!coins) return 0

    const bubbleSort = getBubbleSort(bubbleSize, performance)

    return BubblesUtils.getScalingFactor(
      coins as any,
      bubbleSort as any,
      width,
      height
    )
  }, [bubbleSize, performance, coins, width, height])

  useEffect(() => {
    if (coins) {
      const scalingFactor = BubblesUtils.getScalingFactor(
        coins as any,
        PriceChangePercentage.HOUR,
        width,
        height
      )
      const shapes = BubblesUtils.generateCircles(
        coins as any,
        scalingFactor,
        PriceChangePercentage.HOUR,
        width,
        height
      )
      setCircles(shapes)
    }
  }, [coins, width, height])

  useEffect(() => {
    if (!circles || !width || !height) return

    const imageSprites: PIXI.Sprite[] = []
    const textSprites: PIXI.Text[] = []
    const text2Sprites: PIXI.Text[] = []
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
      const imageSprite = PixiUtils.createImageSprite(circle, chain)

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
        setSelectedToken({ selectedToken: circle.token })
      })

      container.on('tap', (event) => {
        setSelectedToken({ selectedToken: circle.token })
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

      // Create the text
      const text = PixiUtils.createText(circle)
      container.addChild(text)
      textSprites.push(text)

      // Create the second text
      const text2 = PixiUtils.createText2(circle, performance)

      container.addChild(text2)
      text2Sprites.push(text2)
      ;(app as PIXI.Application<any>).stage.addChild(container)
    }

    const ticker = BubblesUtils.update(
      circles,
      imageSprites,
      textSprites,
      text2Sprites,
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
  }, [circles, width, height])

  useEffect(() => {
    if (circles) {
      const max = maxCircleSize
      const min = minCircleSize

      const bubbleSort = getBubbleSort(bubbleSize, performance)

      circles.forEach((circle) => {
        const radius = Math.abs(Math.floor(circle[bubbleSort] * scalingFactor))

        circle.targetRadius = radius > max ? max : radius > min ? radius : min

        circle.color = BubblesUtils.getColorRange(
          Number(circle[performance]),
          bubbleColor
        )
        circle.childUpdated = false

        if (circle.text2) {
          circle.text2.text = circle[performance].toFixed(2) + '%'
        }
      })
    }
  }, [
    coins,
    circles,
    scalingFactor,
    bubbleSize,
    performance,
    maxCircleSize,
    minCircleSize,
    bubbleColor,
  ])

  return (
    <Box>
      <Header />

      <BubblesWrap
        flexDirection="column"
        $isMobile={isMobile}
        style={{
          height: isLoading ? 'calc(100vh - 110px)' : '100%',
        }}
      >
        <Options changeState={changeState} />

        {isLoading ? (
          <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            flex={1}
          >
            <LogoLoading />
          </Flex>
        ) : (
          <Box
            height="100%"
            width="100%"
            ref={appRef}
          />
        )}

        <TokenModal />
      </BubblesWrap>

      {isMobile && !isLoading ? (
        <MobileMenu>
          <UserWallet />
          {/* <Promote /> */}
        </MobileMenu>
      ) : null}

      <FooterWrap>
        <Footer />
      </FooterWrap>
    </Box>
  )
}

export default Bubbles
