import React from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`

const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  bottom: 0;
  background-color: #eeeeee;
`

const Overlay = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Background = () => {
  return (
    <BackgroundContainer>
      {/* <Overlay /> */}
      {/* <VideoBackground
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
        <source
          src="/videos/hero.mp4"
          type="video/webm"
        />
      </VideoBackground> */}
    </BackgroundContainer>
  )
}

export default Background
