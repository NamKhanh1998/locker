import { FC } from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`

const Loader = styled.div<{
  width?: number
  height?: number
  strokeW?: number
}>`
  width: ${(props) => `${props?.width}px` || '50px'};
  height: ${(props) => `${props?.height}px` || '50px'};
  padding: ${(props) => `${props?.strokeW}px` || '6px'};
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: ${rotate} 1s infinite linear;
`

const SpinLoading: FC<{
  width?: number
  height?: number
  strokeW?: number
}> = ({ width, height, strokeW }) => (
  <div>
    <Loader
      width={width}
      height={height}
      strokeW={strokeW}
    />
  </div>
)

export default SpinLoading
