import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ArrowUpwardIcon from './icons/ArrowUpwardIcon'
import { devices, themes } from '../config'

const Container = styled.div`
  width: 35px;
  height: 35px;
  background-color: ${themes.main};
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* transition: 0.5s all;

  &:hover {
    transform: scale(1.1);
  } */

  @media ${devices.tablet} {
    width: 40px;
    height: 40px;
  }
`

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(true)

  // useEffect(() => {
  //   function scrollFunction() {
  //     if (
  //       document.body.scrollTop > 90 ||
  //       document.documentElement.scrollTop > 90
  //     ) {
  //       setShowButton(true)
  //     } else {
  //       setShowButton(false)
  //     }
  //   }

  //   if (typeof window !== undefined) {
  //     window.addEventListener('scroll', scrollFunction)
  //   }

  //   return () => {
  //     window.removeEventListener('scroll', scrollFunction)
  //   }
  // }, [])

  return (
    <>
      {showButton && (
        <Container
          onClick={() => window.scroll(0, 0)}
          id="back-to-top"
        >
          <ArrowUpwardIcon
            height={24}
            width={24}
            fill="white"
          />
        </Container>
      )}
    </>
  )
}

export default ScrollToTop
