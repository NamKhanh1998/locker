import React from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import { devices } from '@/config'
import Table from './Table'
import Text from '../commonStyled/Text'
import SwapHeader from '../Swap/SwapHeader'
import SwapFooter from '../Swap/SwpFooter'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 40px;
`

const Inner = styled(Flex)`
  width: 100%;
  min-height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
  max-width: 100%;
  gap: 20px;
  flex-direction: column;
  overflow-y: auto;
`

const Radar = () => {
  return (
    <>
      <Wrapper>
        <Inner>
          <Table />
        </Inner>
      </Wrapper>
    </>
  )
}

export default Radar
