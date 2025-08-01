import { styled, css, keyframes } from 'styled-components'
import { useEffect } from 'react'
import Box from '@/components/commonStyled/Box'
import { BoxProps } from '@/components/commonStyled/type'

const unmountAnimation = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `

const mountAnimation = keyframes`
    0% {
     opacity: 0;
    }
    100% {
     opacity: 1;
    }
  `

const StyledOverlay = styled(Box)<{ isUnmounting?: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 20;
  will-change: opacity;
  animation: ${mountAnimation} 350ms ease forwards;

  ${({ isUnmounting }) =>
    isUnmounting &&
    css`
      animation: ${unmountAnimation} 350ms ease forwards;
    `}
`

const BodyLock = () => {
  useEffect(() => {
    if (document?.body?.style) {
      document.body.style.cssText = `
      overflow: hidden;
    `
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.cssText = `
        overflow: visible;
        overflow: overlay;
      `
      }
    }

    return undefined
  }, [])

  return null
}

interface OverlayProps extends BoxProps {
  isUnmounting?: boolean
}

export const Overlay: React.FC<React.PropsWithChildren<OverlayProps>> = (
  props
) => {
  return (
    <>
      <BodyLock />
      <StyledOverlay
        role="presentation"
        {...props}
      />
    </>
  )
}

export default Overlay
