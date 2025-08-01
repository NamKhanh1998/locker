import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import Flex from '../commonStyled/Flex'
import TrendingIcon from '../icons/TrendingIcon'
import QuickBuyIcon from '../icons/QuickBuyIcon'
import Text from '../commonStyled/Text'
import SuiIcon from '../icons/SuiIcon'
import Box from '../commonStyled/Box'
import { TabType } from './type'
import { useQuickBuyAmount } from './hooks/useQuickBuyAmount'

const StyledMenuBar = styled(Flex)`
  width: 100%;
  padding: 10px;
  background-color: #000;
  gap: 10px;
  overflow-x: auto;
  justify-content: space-between;
`

const Button = styled(Flex)<{
  $active: boolean
}>`
  border-radius: 18px;
  padding: 4px 12px;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 30px;
  cursor: pointer;
  transition: 0.2s;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background-color: #3dbb991a;
  }

  ${({ $active }) =>
    $active
      ? css`
          border: 1.5px solid #3dbb9a;
          color: #3dbb9a;
        `
      : css`
          border: 1.5px solid #353535;
          color: #fff;
        `}
`

const QuickBuy = styled(Flex)`
  height: 30px;
  border-radius: 18px;
  padding: 4px 12px;
  border: 1.5px solid #3dbb9a;
  color: #3dbb9a;
  align-items: center;
`

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  width: 35px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`

const Devide = styled(Box)`
  height: 100%;
  border-left: 1px solid #3dbb9a;
  margin: 0px 2px;
  height: 14px;
`

const LeftSide = styled(Flex)`
  gap: 10px;
  width: calc(100% - 84px);
  overflow-x: auto;
`

const MenuBar: FC<{
  tab: TabType
  setTab: React.Dispatch<React.SetStateAction<TabType>>
}> = ({ tab, setTab }) => {
  const {
    data: { amount },
    onChangQuickBuy,
  } = useQuickBuyAmount()

  const onInputBlur = () => {
    if (!amount) {
      onChangQuickBuy('3')
    }
  }
  return (
    <StyledMenuBar>
      <LeftSide>
        <Button
          $active={tab === TabType.TRENDING}
          onClick={() => setTab(TabType.TRENDING)}
        >
          <Flex mr="5px">
            <TrendingIcon />
          </Flex>
          Trending
        </Button>

        <Button
          $active={tab === TabType.New}
          onClick={() => setTab(TabType.New)}
        >
          New
        </Button>
      </LeftSide>

      <QuickBuy>
        <QuickBuyIcon />
        <Devide />
        <Input
          value={amount}
          onChange={(e) => onChangQuickBuy(e.target.value)}
          onBlur={onInputBlur}
        />

        <SuiIcon
          height={12}
          width={12}
          fill="#3dbb9a"
        />
      </QuickBuy>
    </StyledMenuBar>
  )
}

export default MenuBar
