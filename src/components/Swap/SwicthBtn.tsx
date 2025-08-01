import React from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { useSwapActionHandler } from './state'

const StyledSwicthBtn = styled(Flex)`
  width: 36px;
  height: 36px;
  background-color: rgb(26, 33, 41);
  border: 3px solid rgb(17, 25, 32);
  display: flex;
  border-radius: 50%;
  margin: -20px auto;
  position: relative;
  z-index: 1;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: rotate(360deg);
    opacity: 0.8;
  }
`

const SwicthBtn = () => {
  const { onSwitchCurrencies } = useSwapActionHandler()
  return (
    <StyledSwicthBtn onClick={onSwitchCurrencies}>
      <SwapVertIcon
        sx={{
          color: '#6b7280',
          height: '20px',
          width: '20px',
        }}
      />
    </StyledSwicthBtn>
  )
}

export default SwicthBtn
