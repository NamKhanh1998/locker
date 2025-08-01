import React, { FC } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import { devices, themes } from '@/config'
import Text from '../commonStyled/Text'
import { dynaPuff } from '@/fonts'
import {
  Chain,
  ChangeState,
  Colors,
  PriceChangePercentage,
  SpecialSortType,
} from './bubbles.types'
import { useManageOptions } from './hooks/useManageOptions'
import Promote from './Promote'

const btnColors: Record<
  any,
  {
    plusActive: string
    minusActive: string
    plusBorder: string
    minusBorder: string
  }
> = {
  [Colors.RED_GREEN]: {
    plusActive: '#50ff5093',
    minusActive: '#8b2a2a',
    plusBorder: '#51f55c',
    minusBorder: '#ff6666',
  },
  [Colors.BLUE_YELLOW]: {
    plusActive: 'rgb(62, 139, 234)',
    minusActive: 'rgb(209, 205, 93)',
    plusBorder: 'rgb(135, 187, 250)',
    minusBorder: 'rgb(255, 252, 174)',
  },
  [Colors.PINK_MINT]: {
    plusActive: 'rgb(255, 106, 230)',
    minusActive: 'rgb(58, 214, 129)',
    plusBorder: 'rgb(255, 192, 245)',
    minusBorder: 'rgb(147, 239, 189)',
  },
  [Colors.NEUTRAL]: {
    plusActive: themes.headerBackgroundColor,
    minusActive: themes.headerBackgroundColor,
    plusBorder: '#8e8d8d',
    minusBorder: '#8e8d8d',
  },
}

const Container = styled(Flex)`
  width: 100%;
  padding: 0 5px;
  background-color: ${themes.backgroundColor};
  gap: 5px;
  min-height: 50px;
  overflow-x: auto;
  justify-content: space-between;

  @media ${devices.mobileM} {
    padding: 0 10px;
    gap: 10px;
    flex-direction: row;
  }
`

const OptionBtn = styled(Flex)<{
  $active?: boolean
  $changeIndex: number
  $bubbleColor?: Colors
}>`
  border-radius: 0 0 10px 10px;
  height: 40px;

  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.3s;

  background-color: ${({ $active, $changeIndex, $bubbleColor }) => {
    if ($active && $changeIndex >= 0) {
      return btnColors[$bubbleColor!]?.plusActive
    }

    if ($active && $changeIndex < 0) {
      return btnColors[$bubbleColor!]?.minusActive
    }

    return themes.headerBackgroundColor
  }};

  border: 3px solid
    ${({ $changeIndex, $bubbleColor }) => {
      if ($changeIndex >= 0) {
        return btnColors[$bubbleColor!]?.plusBorder
      }

      return btnColors[$bubbleColor!]?.minusBorder
    }};

  border-top: none;

  &:hover {
    background-color: ${({ $active }) => (!$active ? '#5a5959' : '')};
  }

  @media ${devices.mobileM} {
    padding: 0 15px;
  }
`

const OptionText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
`

const PcBox = styled(Flex)`
  display: none;
  gap: 8px;
  @media ${devices.tablet} {
    display: flex;
  }
`
const MbBox = styled(Flex)`
  display: flex;

  @media ${devices.tablet} {
    display: none;
  }
`

const SortBtn = styled(OptionBtn)`
  border: 3px solid
    ${({ $active }) => {
      if ($active) {
        return '#46affb'
      }

      return '#8e8d8d'
    }};

  background-color: ${({ $active }) => {
    if ($active) {
      return '#40789f'
    }

    return themes.headerBackgroundColor
  }};
  border-top: none;
`

const PerformanceList = [
  {
    name: 'Hour',
    value: PriceChangePercentage.HOUR,
  },
  {
    name: '6H',
    value: PriceChangePercentage.SIXHOURS,
  },
  {
    name: 'Day',
    value: PriceChangePercentage.DAY,
  },
  {
    name: 'Week',
    value: PriceChangePercentage.WEEK,
  },
  {
    name: 'Month',
    value: PriceChangePercentage.MONTH,
  },
  {
    name: 'Year',
    value: PriceChangePercentage.YEAR,
  },
]

const Options: FC<{
  changeState: ChangeState
}> = ({ changeState }) => {
  const {
    options: { performance, specialSortType, bubbleColor, chain },
    setOptions,
    onSelectSpecialSort,
  } = useManageOptions()

  return (
    <Container className={dynaPuff.className}>
      <MbBox>{chain === Chain.SUI && <Promote />}</MbBox>
      <Flex
        style={{
          gap: '6px',
        }}
      >
        {PerformanceList?.map((p) => (
          <OptionBtn
            key={p.value}
            $active={performance === p.value}
            $changeIndex={changeState?.[p.value]}
            $bubbleColor={bubbleColor}
            onClick={() =>
              setOptions((o) => ({
                ...o,
                performance: p.value,
              }))
            }
          >
            <OptionText className={dynaPuff.className}>{p.name}</OptionText>
          </OptionBtn>
        ))}
      </Flex>

      <PcBox>{chain === Chain.SUI && <Promote />}</PcBox>

      <PcBox>
        <SortBtn
          $active={specialSortType === SpecialSortType.NEW}
          $changeIndex={0}
          onClick={() => {
            if (specialSortType === SpecialSortType.NEW) {
              onSelectSpecialSort(null)
            } else {
              onSelectSpecialSort(SpecialSortType.NEW)
            }
          }}
        >
          <OptionText className={dynaPuff.className}>New</OptionText>
        </SortBtn>
        <SortBtn
          $active={specialSortType === SpecialSortType.GAINERS}
          $changeIndex={0}
          onClick={() => {
            if (specialSortType === SpecialSortType.GAINERS) {
              onSelectSpecialSort(null)
            } else {
              onSelectSpecialSort(SpecialSortType.GAINERS)
            }
          }}
        >
          <OptionText className={dynaPuff.className}>Gainers</OptionText>
        </SortBtn>

        <SortBtn
          $active={specialSortType === SpecialSortType.LOSERS}
          $changeIndex={0}
          onClick={() => {
            if (specialSortType === SpecialSortType.LOSERS) {
              onSelectSpecialSort(null)
            } else {
              onSelectSpecialSort(SpecialSortType.LOSERS)
            }
          }}
        >
          <OptionText className={dynaPuff.className}>Losers</OptionText>
        </SortBtn>
      </PcBox>
    </Container>
  )
}

export default Options
