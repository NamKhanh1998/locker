import size from 'lodash/size'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts'
import styled from 'styled-components'

import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { devices } from '@/config'
import * as dayjs from 'dayjs'
import { FC } from 'react'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import SpinLoading from '../SpinLoading'
import { Period, useFecthChartData } from './hooks/useFecthChartData'

const StyledChart = styled(Flex)<{ $height?: number }>`
  height: ${({ $height }) => ($height ? $height : 200)}px;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media ${devices.mobileM} {
    height: ${({ $height }) => ($height ? $height : 220)}px;
    margin-top: 15px;
  }
`

const TooltipContent = styled(Flex)`
  background: rgba(84, 84, 84, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 10px;
  flex-direction: column;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`

const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active) {
    const time = payload?.[0]?.payload?.time
    const value = payload?.[0]?.payload?.value

    const formattedDate = dayjs.unix(time).format('MMMM D, YYYY h:mm:ss A')

    return (
      <TooltipContent>
        <Flex>
          <Text
            color="#cccccc"
            fontSize="14px"
          >
            {formattedDate}
          </Text>
        </Flex>

        <Flex>
          <Text
            fontSize="14px"
            fontWeight={700}
          >
            ${value}
          </Text>
        </Flex>
      </TooltipContent>
    )
  }

  return null
}

const LineChart: FC<{
  token: CoingeckoCoinData | null
  height?: number
  strokeWidth?: number
  period?: Period
}> = ({ token, height, strokeWidth, period }) => {
  const { data, isLoading } = useFecthChartData(
    token?.activePairAddress,
    period
  )

  return (
    <Flex
      flexDirection="column"
      width="100%"
    >
      <StyledChart $height={height}>
        {isLoading || !token ? (
          <SpinLoading
            height={80}
            width={80}
            strokeW={8}
          />
        ) : size(data) ? (
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#3dbb9a"
                    stopOpacity={1}
                  />
                  <stop
                    offset="100%"
                    stopColor="#5897866f"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <Tooltip
                cursor={true}
                content={<CustomTooltip />}
              />
              <Area
                dataKey="value"
                type="monotone"
                stroke="#3dbb9a"
                fill="url(#gradient)"
                strokeWidth={strokeWidth || 2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <Text>No Data to Display on Chart</Text>
        )}
      </StyledChart>
    </Flex>
  )
}

export default LineChart
