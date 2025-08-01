import { devices } from '@/config'
import styled from 'styled-components'
import Footer from '../common/Footer'
import Header from '../common/Header'
import Flex from '../commonStyled/Flex'
import Chart from './Chart'
import { useManageChart } from './state/chart'
import SwapCard from './SwapCard'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  padding-top: 60px;
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

  @media ${devices.laptop} {
    flex-direction: row;
  }
`

const Swap = () => {
  const {
    chart: { showChart },
  } = useManageChart()

  return (
    <>
      <Header />
      <Wrapper className="swap-bg">
        <Inner>
          {showChart && <Chart />}

          <SwapCard />
        </Inner>
      </Wrapper>
      <Footer />
    </>
  )
}

export default Swap
