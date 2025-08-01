import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import { Options } from './type'
import Text from '../commonStyled/Text'
import { getLabelColor } from './utils'
import useLongPress from '@/hooks/useLongPress'
import Tippy from '@tippyjs/react'
import { followCursor } from 'tippy.js'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import Image from 'next/image'
import { Chain } from '../Bubbles/bubbles.types'

const StyledLabel = styled(Flex)<{ bgColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  background-color: ${({ bgColor }) => bgColor};
  position: relative;

  &:hover {
    opacity: 0.9;
  }
`

const CustomText = styled(Text)<{ show?: number }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 1s ease;
  min-width: max-content;
  text-transform: uppercase;
  font-weight: 600;
`

const TokenLogo = styled.img`
  border-radius: 50%;
`

const StyledTooltip = styled(Flex)`
  background-color: #fff;
  padding: 8px;
  flex-direction: column;
`

const IconWrap = styled(Flex)`
  min-width: 20px;
`

const TooltipTextTitle = styled(Text)`
  color: #525252;
`
const TooltipText = styled(Text)`
  color: #0f0f0f;
  text-transform: uppercase;
`

const ChangeBox = styled(Flex)<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  padding: 0px 6px 0px 6px;
  border-radius: 4px;
  align-items: center;
`

const TooltipContent: React.FC<{
  item: CoingeckoCoinData
  changes: any
  changeColor: string
  chain: Chain
}> = ({ item, changeColor, changes, chain }) => {
  return (
    <StyledTooltip>
      <Flex
        alignItems="center"
        style={{
          gap: '5px',
        }}
      >
        <Image
          src={`/tokens/${chain}/${item.pairAddress?.toLowerCase()}.png`}
          alt="token-img"
          height={20}
          width={20}
          style={{
            borderRadius: '50%',
          }}
        />
        <TooltipText>{item?.name}</TooltipText>

        <TooltipTextTitle>({item.symbol})</TooltipTextTitle>
      </Flex>

      <Flex
        alignItems="center"
        style={{
          gap: '5px',
        }}
        mt="10px"
      >
        <TooltipTextTitle>Price:</TooltipTextTitle>
        <TooltipText>${item?.price}</TooltipText>
        <ChangeBox bgColor={changeColor}>
          {changes > 0 ? '+' : ''}
          {changes?.toFixed(2)}%
        </ChangeBox>
      </Flex>

      <Flex
        alignItems="center"
        style={{
          gap: '5px',
        }}
      >
        <TooltipTextTitle>Market Cap:</TooltipTextTitle>
        <TooltipText>${item?.marketCap?.toLocaleString()}</TooltipText>
      </Flex>

      <Flex
        alignItems="center"
        style={{
          gap: '5px',
        }}
      >
        <TooltipTextTitle>Volume(24H):</TooltipTextTitle>
        <TooltipText>${item?.volume?.toLocaleString()}</TooltipText>
      </Flex>

      <Flex
        alignItems="center"
        style={{
          gap: '5px',
        }}
      >
        <TooltipTextTitle>Liquidity:</TooltipTextTitle>
        <TooltipText>${item?.totalLiquidity?.toLocaleString()}</TooltipText>
      </Flex>
    </StyledTooltip>
  )
}

const Label: FC<{
  token: CoingeckoCoinData
  options: Options
  setSelectToken: any
  chain: Chain
}> = ({ token, options, setSelectToken, chain }) => {
  const [fontSize, setFontSize] = useState<{
    symbol: number
    image: number
    percent: number
  }>({
    symbol: 0,
    image: 0,
    percent: 0,
  })

  const styledLabelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (styledLabelRef.current) {
      const labelWidth = styledLabelRef.current.offsetWidth
      const labelHeight = styledLabelRef.current.offsetHeight

      const dimensions = Math.min(labelWidth, labelHeight)

      const { symbol } = token

      const symbolFontSize =
        Math.min(labelWidth, labelHeight) /
        Math.max(Math.min(symbol?.length, 6), 4)

      const isFullSize = symbolFontSize <= 2.5

      const percentFontRatio = 40
      const percentSize = isFullSize
        ? 0
        : (symbolFontSize / 100) * percentFontRatio
      const symbolSize = isFullSize ? 0 : symbolFontSize

      const imageSize = isFullSize ? dimensions! / 2 : (dimensions / 100) * 30

      setFontSize({
        percent: percentSize,
        image: imageSize,
        symbol: symbolSize,
      })
    }
  }, [
    styledLabelRef?.current?.offsetWidth,
    styledLabelRef?.current?.offsetHeight,
    options,
    token,
  ])

  const onClickLabel = useCallback(() => {
    setSelectToken?.({ selectedToken: token })
  }, [token])

  const longPressEvents = useLongPress(onClickLabel, null, 200)

  const { isMobile } = useMatchBreakPoints()

  return (
    <Tippy
      content={
        <TooltipContent
          chain={chain}
          item={token}
          changes={token?.[options.performance]}
          changeColor={getLabelColor(token?.[options.performance])}
        />
      }
      plugins={[followCursor]}
      followCursor
      arrow={false}
      placement="right-start"
      offset={[25, 15]}
      disabled={isMobile}
      theme="voyager"
    >
      <StyledLabel
        ref={styledLabelRef}
        bgColor={getLabelColor(token?.[options.performance])}
        {...longPressEvents}
      >
        <TokenLogo
          src={`/tokens/${chain}/${token?.pairAddress?.toLowerCase()}.png`}
          height={`${Math.round(fontSize.image)}px`}
          width={`${Math.round(fontSize.image)}px`}
          style={{
            marginBottom: `${Math.round(fontSize.image) * 0.1}px`,
          }}
        />
        <CustomText
          fontSize={`${Math.round(fontSize.symbol)}px`}
          textAlign="center"
          fontWeight={600}
          show={Math.round(fontSize.symbol)}
          lineHeight={1}
        >
          {token?.symbol}
        </CustomText>

        <CustomText
          show={Math.round(fontSize.percent)}
          fontSize={`${Math.round(fontSize.percent)}px`}
        >
          {token?.[options.performance]!.toFixed(2)}%
        </CustomText>
      </StyledLabel>
    </Tippy>
  )
}

export default Label
