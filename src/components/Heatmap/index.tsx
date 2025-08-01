import {
  BlockSize,
  NarrativeType,
  Options,
  PriceChangePercentage,
} from '@/components/Heatmap/type'
import { devices } from '@/config'
import { useElementSize } from '@/hooks/useElementSize'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Treemap } from 'react-vis'
import 'react-vis/dist/style.css'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import styled from 'styled-components'
import { Chain } from '../Bubbles/bubbles.types'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import { useFetchAndManageCoins } from '../Bubbles/hooks/useFetchCoins'
import { useManageOptions } from '../Bubbles/hooks/useManageOptions'
import { useManageSelectedToken } from '../Bubbles/hooks/useManageSelectedToken'
import Box from '../commonStyled/Box'
import Flex from '../commonStyled/Flex'
import LogoLoading from '../Loading/LoadingLogo'
import TokenModal from '../TokenModal'
import Label from './Label'
import OptionsBar from './OptionsBar'
import ScreenshotModal from './ScreenshotModal'
import {
  getSizeForHeatMap,
  getValuedDataByOption,
  sortDataByOption,
  takeScreenShot,
} from './utils'
import axios from 'axios'
import { Button } from '@mui/material'

const Container = styled.div`
  position: relative;
  left: 0;
  right: 0;
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  z-index: 1;
  padding-top: 70px;
  padding-bottom: 30px;
  flex-direction: column;
  align-items: center;
`

const Wrap = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  max-width: calc(100vw - 20px);
  border-radius: 8px;
  background-color: #3534346e;
  padding: 0;

  @media ${devices.mobileM} {
    padding: 15px;
  }
`

const HeatmapInner = styled(Flex)`
  width: 100%;
  background-color: #fff;
  height: calc(100vh - 150px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Heatmap = () => {
  const [ref, size] = useElementSize()
  const { selectedToken, setSelectedToken } = useManageSelectedToken()
  const { fullData: coins, isLoading } = useFetchAndManageCoins()
  const { isMobile, isTablet } = useMatchBreakPoints()
  const {
    options: { chain },
  } = useManageOptions()

  const heatmapRef = useRef<any>(null)

  const [options, setOptions] = useState<Options>({
    blockSize: BlockSize.MKC,
    performance: PriceChangePercentage.DAY,
    narrative: NarrativeType.ALL,
  })

  const serializeData = useMemo(() => {
    const sortedData = sortDataByOption(coins, options.blockSize)
    const valuedData = getValuedDataByOption(sortedData, options.blockSize)

    let mapData = valuedData?.map((token: CoingeckoCoinData) => {
      return {
        ...token,
        title: token.symbol,
        size: getSizeForHeatMap(options.blockSize, token),
      }
    })

    if (options.narrative && chain === Chain.SUI) {
      if (options.narrative === NarrativeType.NEW) {
        mapData = mapData?.filter((token: CoingeckoCoinData) => {
          return !!token?.new
        })
      } else {
        mapData = mapData?.filter((token: CoingeckoCoinData) => {
          return token?.narratives?.includes(options.narrative)
        })
      }
    }

    return {
      title: 'bubbo-tokens',
      opacity: 1,
      children: mapData,
    }
  }, [options, coins])

  const [showScreenshot, setShowScreenshot] = useState(false)
  const [screenImg, setScreenImg] = useState<string | null>(null)

  const getImage = useCallback(async () => {
    setShowScreenshot(true)
    const imgNode = heatmapRef.current
    const image = await takeScreenShot(imgNode)

    setScreenImg(image)
  }, [heatmapRef, takeScreenShot])

  const get = async () => {
    const url = 'https://www.sotwe.com/api/v3/search/tweet?q=@bubbofun'

    const res = await axios.get(url)

    console.log(res.data)
  }

  return (
    <>
      {isLoading ? (
        <LogoLoading />
      ) : (
        <Container>
          <OptionsBar
            options={options}
            setOptions={setOptions}
            getImage={getImage}
          />
          <Button onClick={get}>22</Button>
          <Wrap>
            <TransformWrapper
              disablePadding
              disabled={isMobile || isTablet}
            >
              {({ resetTransform }) => {
                return (
                  <Box
                    ref={heatmapRef}
                    width="100%"
                    height="100%"
                  >
                    <HeatmapInner
                      ref={ref}
                      style={{
                        backgroundColor: isLoading ? '#353434' : '#fff',
                      }}
                    >
                      <TransformComponent>
                        <Treemap
                          data={serializeData}
                          hideRootNode
                          width={size.width}
                          height={size.height}
                          margin={0}
                          padding={1}
                          className="bubbo-treemap"
                          getLabel={(item: CoingeckoCoinData) => (
                            <Label
                              setSelectToken={setSelectedToken}
                              token={item}
                              options={options}
                              chain={chain}
                            />
                          )}
                        />
                      </TransformComponent>
                    </HeatmapInner>
                  </Box>
                )
              }}
            </TransformWrapper>
          </Wrap>
        </Container>
      )}
      <TokenModal />
      <ScreenshotModal
        open={showScreenshot}
        callBack={() => {
          setShowScreenshot(false)
          setScreenImg(null)
        }}
        screenImg={screenImg}
      />
    </>
  )
}

export default Heatmap
