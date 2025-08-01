import type React from 'react'

import styled from 'styled-components'

interface ProgressBarProps {
  greenPercentage?: number
  redPercentage?: number
  height?: number
}

const ProgressContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height}px;
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  background-color: #373737;
`

const GreenSection = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  background-color: #46e754;
  transition: width 0.3s ease;
`

const RedSection = styled.div<{ percentage: number }>`
  width: ${(props) => props.percentage}%;
  background-color: #fe3a3a;
  transition: width 0.3s ease;
`

const ProgressBar: React.FC<ProgressBarProps> = ({
  greenPercentage = 60,
  redPercentage = 40,
  height = 3,
}) => {
  // Ensure percentages add up to 100
  const total = greenPercentage + redPercentage
  const normalizedGreen = total > 0 ? (greenPercentage / total) * 100 : 0
  const normalizedRed = total > 0 ? (redPercentage / total) * 100 : 0

  return (
    <ProgressContainer height={height}>
      <GreenSection percentage={normalizedGreen} />
      <RedSection percentage={normalizedRed} />
    </ProgressContainer>
  )
}

export default ProgressBar
