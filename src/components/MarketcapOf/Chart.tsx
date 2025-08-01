import React, { FC, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import LineChart from '../TokenModal/LineChart'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import TokenLogo from '../TokenLogo'
import Text from '../commonStyled/Text'
import { Skeleton } from '@mui/material'
import Box from '../commonStyled/Box'
import { devices } from '@/config'
import { Period } from '../TokenModal/hooks/useFecthChartData'

const StyledChart = styled(Flex)`
  width: 100%;
  justify-content: center;
  background: center center / cover rgba(23, 37, 52, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 0px;
  padding-bottom: 0;
  border-radius: 8px;
  gap: 5px;
  flex-direction: column;
`

const PeriodBtn = styled(Flex)<{
  $isActive?: boolean
}>`
  border-radius: 4px;
  padding: 3px 10px;
  font-size: 12px;
  color: #fff;
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`

const Periods = [
  { name: '1H', value: Period.HOUR },
  { name: '1D', value: Period.DAY },
  { name: '1W', value: Period.WEEK },
  { name: '1M', value: Period.MONTH },
]

const Chart: FC<{ token: CoingeckoCoinData }> = ({ token }) => {
  const [period, setPeriod] = useState(Period.DAY)

  return (
    <StyledChart>
      <Flex
        alignItems="center"
        justifyContent="center"
        height="30px"
        width="100%"
        padding="0px 10px"
      >
        {!token ? (
          <Flex style={{ gap: '10px' }}>
            <Skeleton
              height={50}
              width={50}
            />
            <Skeleton
              height={50}
              width={100}
            />
          </Flex>
        ) : (
          <Flex
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex style={{ gap: '4px' }}>
              {Periods?.map((item) => (
                <PeriodBtn
                  key={item.value}
                  $isActive={period === item.value}
                  onClick={() => setPeriod(item.value)}
                >
                  {item.name}
                </PeriodBtn>
              ))}
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
            >
              <TokenLogo address={token?.pairAddress} />

              <Text
                ml="10px"
                fontWeight={500}
                color="rgb(216,216,216)"
              >
                {token?.symbol?.toUpperCase()}
              </Text>
            </Flex>
          </Flex>
        )}
      </Flex>

      <Flex
        height="135px"
        width="100%"
      >
        <LineChart
          strokeWidth={1.5}
          token={token}
          height={120}
          period={period}
        />
      </Flex>
    </StyledChart>
  )
}

export default Chart
