import { devices } from '@/config'
import { poppins } from '@/fonts'
import styled from 'styled-components'
import LogoLoading from '../Loading/LoadingLogo'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import Chart from './Chart'
import Compare from './Compare'
import Profit from './Profit'
import { useCalculateForMkcOf } from './useCalculateForMkcOf'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  padding-top: 90px;
`

const Inner = styled(Flex)`
  width: 100%;
  min-height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
  max-width: calc(100vw - 10px);
  gap: 20px;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 50px;
`

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  text-align: center;

  @media ${devices.mobileM} {
    font-size: 22px;
  }
`

const CompareContainer = styled(Flex)`
  gap: 10px;
  flex-direction: column;
  width: 100%;

  @media ${devices.tablet} {
    width: max-content;
    flex-direction: row;
  }
`

const ChartWrap = styled(Flex)`
  gap: 10px;

  flex-direction: column;
  @media ${devices.tablet} {
    flex-direction: row;
  }
`

const MarketcapOf = () => {
  const {
    marketCapRatio,
    priceWithQuoteRatio,
    profit,
    initAmount,
    targetAmount,
    targetPrice,
    baseTokenInfo,
    quoteTokenInfo,
    isLoading,
  } = useCalculateForMkcOf()

  return (
    <>
      <Wrapper className="swap-bg">
        <Inner className={poppins.className}>
          {isLoading ? (
            <LogoLoading />
          ) : (
            <Flex
              flexDirection="column"
              style={{ gap: '10px' }}
            >
              <CompareContainer>
                <Compare
                  marketCapRatio={marketCapRatio}
                  priceWithQuoteRatio={priceWithQuoteRatio}
                />

                <Profit
                  profit={profit}
                  targetAmount={targetAmount}
                  initAmount={initAmount}
                  marketCapRatio={marketCapRatio}
                  targetPrice={targetPrice}
                />
              </CompareContainer>

              <ChartWrap>
                <Chart token={baseTokenInfo!} />
                <Chart token={quoteTokenInfo!} />
              </ChartWrap>
            </Flex>
          )}
        </Inner>
      </Wrapper>
    </>
  )
}

export default MarketcapOf
