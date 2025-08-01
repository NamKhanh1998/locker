import { devices } from '@/config'
import { poppins } from '@/fonts'
import useDebounce from '@/hooks/useDebounce'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'
import Box from '../commonStyled/Box'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import TokenLogo from '../TokenLogo'
import { useSwapState } from './state'
import { useManageChart, ViewMode } from './state/chart'

const Wrap = styled(Flex)`
  width: 100%;
  max-width: 650px;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;

  @media ${devices.laptop} {
    margin-top: -50px;
  }
`

const Info = styled(Flex)`
  height: 50px;
  gap: 10px;
  cursor: pointer;
  width: 100%;
  justify-content: space-between;
`

const Mode = styled(Flex)<{ $isActive?: boolean }>`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: rgb(255, 255, 255);
  padding: 4px 8px;
  align-items: center;
  width: auto;
  min-width: 50px;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  justify-content: center;

  &:focus-within {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
  }

  &:hover {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
    transform: scale(1.03);
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      border: 1px solid #3dbb9a;
    `}
`

const DoubleLogo = styled(Flex)``

const Chart = () => {
  const {
    chart: { invert, viewBy },
    setChart,
  } = useManageChart()

  const {
    swapState: { inputCurrency, outputCurrency },
  } = useSwapState()

  const { baseCurrency, quoteCurrency } = useMemo(() => {
    return !invert
      ? { baseCurrency: outputCurrency, quoteCurrency: inputCurrency }
      : { baseCurrency: inputCurrency, quoteCurrency: outputCurrency }
  }, [invert, inputCurrency, outputCurrency])

  const debounceData = useDebounce(
    JSON.stringify({ baseCurrency, quoteCurrency, viewBy }),
    150
  )

  const chartSrc = useMemo(() => {
    if (debounceData) {
      const { baseCurrency, quoteCurrency, viewBy } = JSON.parse(debounceData)

      if (viewBy === ViewMode.BASEQUOTE) {
        return `https://birdeye.so/tv-widget/${baseCurrency?.address}/${quoteCurrency?.address}?chain=sui&viewMode=base%2Fquote&chartInterval=15&chartType=Candle&chartLeftToolbar=show&theme=dark`
      }

      return `https://birdeye.so/tv-widget/${baseCurrency?.address}?chain=sui&viewMode=pair&chartInterval=15&chartType=Candle&chartLeftToolbar=show&theme=dark`
    }
  }, [debounceData])

  const { isDesktop } = useMatchBreakPoints()

  return (
    <Wrap className={poppins.className}>
      <Info alignItems="center">
        <Flex
          style={{
            gap: '10px',
          }}
          alignItems="center"
          onClick={() => {
            setChart((p) => ({ ...p, invert: !p.invert }))
          }}
        >
          <DoubleLogo>
            <Box>
              <TokenLogo
                address={baseCurrency?.pairAddress}
                url={baseCurrency?.logoUrl}
              />
            </Box>
            <Box ml="-5px">
              <TokenLogo
                address={quoteCurrency?.pairAddress}
                url={quoteCurrency?.logoUrl}
              />
            </Box>
          </DoubleLogo>

          <Text>
            {baseCurrency?.symbol} - {quoteCurrency?.symbol}
          </Text>
          <SwapHorizIcon
            sx={{
              height: '20px',
              width: '20px',
              color: '#8d8b8b',
            }}
          />
        </Flex>

        <Flex
          width="max-content"
          style={{
            gap: '5px',
          }}
        >
          <Mode
            $isActive={viewBy === ViewMode.PAIR}
            onClick={() => {
              setChart((p) => ({ ...p, viewBy: ViewMode.PAIR }))
            }}
          >
            <Text
              fontSize="14px"
              color={viewBy === ViewMode.PAIR ? '#3dbb9a' : '#fff'}
            >
              Pair
            </Text>
          </Mode>
          <Mode
            $isActive={viewBy === ViewMode.BASEQUOTE}
            onClick={() => {
              setChart((p) => ({ ...p, viewBy: ViewMode.BASEQUOTE }))
            }}
          >
            <Text
              fontSize="14px"
              color={viewBy === ViewMode.BASEQUOTE ? '#3dbb9a' : '#fff'}
            >
              Base-Quote
            </Text>
          </Mode>
        </Flex>
      </Info>

      {chartSrc && (
        <iframe
          suppressHydrationWarning
          style={{
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
          }}
          width="100%"
          height={isDesktop ? '550px' : '450px'}
          src={chartSrc}
        />
      )}
    </Wrap>
  )
}

export default Chart
