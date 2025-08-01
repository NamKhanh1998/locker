import styled, { css, keyframes } from 'styled-components'
import { motion, Variants } from 'framer-motion'
import { devices } from '@/config'

export const appearAnimation = keyframes`
  from { opacity:0 }
  to { opacity:1 }
`

export const disappearAnimation = keyframes`
  from { opacity:1 }
  to { opacity:0 }
`

export const animationHandler = (
  element: HTMLElement | null,
  shouldDisappear?: boolean
) => {
  if (!element) return
  if (element.classList.contains('appear')) {
    element.classList.remove('appear')
    element.classList.add('disappear')
  } else {
    element.classList.remove('disappear')
    element.classList.add('appear')
  }
  if (shouldDisappear) {
    element.classList.remove('appear')
    element.classList.add('disappear')
  }
}

export const animationVariants: Variants = {
  initial: { transform: 'translateX(0px)' },
  animate: { transform: 'translateX(0px)' },
  exit: { transform: 'translateX(0px)' },
}

export const animationMap = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
}

export const promotedGradient = keyframes`
    0% {
      background-position: 50% 0%;
    }
    50% {
      background-position: 50% 100%;
    }
    100% {
      background-position: 50% 0%;
    }
  `

export const mountAnimation = keyframes`
0% {
  transform: translateY(20%);
}
100% {
  transform: translateY(0%);
}
`

export const unmountAnimation = keyframes`
0% {
  transform: translateY(0%);
}
100% {
  transform: translateY(20%);
}
`

export const ModalContainer = styled(motion.div)<{
  $minHeight: string
  $positionBottomOnMb?: boolean
}>`
  overflow: hidden;
  background: rgba(23, 37, 52, 0.8);
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1),
    0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  max-height: calc(var(--vh, 1vh) * 100);
  z-index: 100;
  max-width: none;
  min-height: ${({ $minHeight }) => $minHeight};
  width: auto;
  position: auto;
  bottom: auto;

  ${({ $positionBottomOnMb }) =>
    $positionBottomOnMb &&
    css`
      width: 100%;
      bottom: 0;
      position: absolute;
      border-radius: 16px 16px 0px 0px;
      border-bottom: none;
    `}

  @media ${devices.mobileL} {
    width: auto;
    position: auto;
    bottom: auto;
    border-radius: 16px;
    max-height: 100vh;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`

export const StyledModalWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  will-change: opacity;
  opacity: 0;
  background-color: rgba(2, 2, 2, 0.4);
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
`
