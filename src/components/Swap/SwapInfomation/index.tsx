import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '@/components/commonStyled/Flex'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import SwapInfomationModal from './SwapInfomation'

const IconWrap = styled(Flex)`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`

const SwapInfo = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Flex>
        <IconWrap onClick={() => setOpen(true)}>
          <AutoAwesomeIcon
            sx={{
              color: '#fff',
              height: '26px',
              width: '26px',
            }}
          />
        </IconWrap>
      </Flex>

      <SwapInfomationModal
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default SwapInfo
