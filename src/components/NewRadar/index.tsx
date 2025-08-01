import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Trending from './Trending'
import MenuBar from './MenuBar'
import TrendingTable from './TrendingTable'
import { TabType } from './type'

const StyledRader = styled(Flex)`
  width: 100%;
  margin-top: 60px;
  flex-direction: column;
`

const Radar = () => {
  const [tab, setTab] = useState(TabType.TRENDING)
  return (
    <StyledRader>
      <Trending />
      <MenuBar
        setTab={setTab}
        tab={tab}
      />
      <TrendingTable tab={tab} />
    </StyledRader>
  )
}

export default Radar
