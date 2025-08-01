import React from 'react'
import SwapHeader from '../Swap/SwapHeader'
import Footer from '../common/Footer'
import styled from 'styled-components'
import { devices } from '@/config'
import Flex from '../commonStyled/Flex'

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

const Send = () => {
  return (
    <>
      <SwapHeader />
      <Wrapper className="swap-bg">
        <Inner>11</Inner>
      </Wrapper>
      <Footer />
    </>
  )
}

export default Send
