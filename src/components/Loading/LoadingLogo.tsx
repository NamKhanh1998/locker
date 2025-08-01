import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import Image from 'next/image'
import LogoImg from '@/public/bubo_logo_big.png'

const pulseAnimation = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0.8;
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
    opacity: 0.9;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
  }
  75% {
    transform: scale(1.1) rotate(5deg);
    opacity: 0.9;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.8;
  }
`

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`

const LogoWrapper = styled.div`
  animation: ${pulseAnimation} 2s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    border: 2px solid transparent;
    border-top: 2px solid #22c55e;
    border-radius: 50%;
    animation: ${rotateAnimation} 3s linear infinite;
    opacity: 0.3;
  }
`

const LoadingText = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #666;
  font-weight: 500;
  text-align: center;
  opacity: 0.8;
`

const DotsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`

const dotAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  animation: ${dotAnimation} 1.4s ease-in-out infinite;
  animation-delay: ${(props) => props.delay}s;
`

export default function LogoLoading() {
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

  return (
    <LoadingContainer>
      <div>
        <LogoWrapper>
          <Image
            src={LogoImg}
            alt="Logo"
            width={120}
            height={120}
            priority
          />
        </LogoWrapper>
        {/* <LoadingText>Bubbo...</LoadingText>
        <DotsWrapper>
          <Dot delay={0} />
          <Dot delay={0.2} />
          <Dot delay={0.4} />
        </DotsWrapper> */}
      </div>
    </LoadingContainer>
  )
}
