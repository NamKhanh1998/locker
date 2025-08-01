import React, { useState } from 'react'
import Box from '../commonStyled/Box'

import BubblesMap from './BubblesMap'
import Header from './Header'
import { BUBO } from '../Swap/state'

const HoldersMap = () => {
  const [selectToken, setSelectToken] = useState(BUBO)
  return (
    <Box overflow="hidden">
      <Header setSelectToken={setSelectToken} />
      <BubblesMap selectToken={selectToken} />
    </Box>
  )
}

export default HoldersMap
