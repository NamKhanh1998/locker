import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useFetchBubboInfo } from './Bubbles/hooks/useFetchBubboInfo'
import Text from './commonStyled/Text'

const MultiColorBarContainer = styled.div`
  width: 100%;
  position: relative;
`

const BarsContainer = styled.div`
  display: flex;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  position: relative;
`

const Bar = styled.div<{ width: number }>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}%;
  height: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  &:last-of-type {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

const floatAnimation = keyframes`

  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); } 
  100% { transform: translateY(0); }
`

const Marker = styled.img<{ position: number }>`
  position: absolute;
  top: -33px;
  left: ${(props) => `calc(${props.position}% - 25px)`};
  width: 50px;
  height: 50px;
  border-radius: 2px;
  animation: ${floatAnimation} 3s ease-in-out infinite;
`

const Legend = styled.div<{ position: number }>`
  position: absolute;
  bottom: -30px;
  left: ${(props) => `calc(${props.position}% - 40px)`};
  width: 80px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
`

const Flag = styled.div`
  position: absolute;
  top: -30px;
  left: 100%;
  font-size: 25px;
  transform: translateX(-70%);
`

const Start = styled.div`
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 25px;
`

const target = 1000 * 1000

const MultiColorProgressBar = () => {
  const { isLoading, data } = useFetchBubboInfo()

  const marketCap = data?.marketCap || 0

  return (
    <>
      {isLoading ? null : (
        <MultiColorBarContainer>
          <BarsContainer>
            <Start>🌱</Start>

            <Bar
              color="#33cb3d"
              width={(marketCap / target) * 100}
            />
            <Marker
              position={(marketCap / target) * 100}
              src="/partners/bubo3.png"
            />

            <Legend position={(marketCap / target) * 100}>
              <Text
                fontSize="18px"
                fontWeight={600}
              >
                ${marketCap?.toLocaleString()}
              </Text>
            </Legend>

            <Flag>🏁</Flag>
          </BarsContainer>
        </MultiColorBarContainer>
      )}
    </>
  )
}

export default MultiColorProgressBar
