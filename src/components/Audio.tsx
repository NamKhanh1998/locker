import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { devices, themes } from '../config'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import MusicOn from './icons/MusicOnIcon'
import MusicOff from './icons/MusicOffIcon'

const Container = styled.div`
  width: 35px;
  height: 35px;
  background-color: ${themes.main};

  cursor: pointer;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  transition: 0.5s all;
  &:hover {
    transform: scale(1.1);
  }

  @media ${devices.tablet} {
    width: 40px;
    height: 40px;
  }
`

const Audio = () => {
  const playerRef = useRef<any>(null)
  const [isMute, setIsMute] = useState(true)

  const togglePlay = () => {
    setIsMute((p) => {
      if (p) {
        playerRef.current.audio.current.play()
        return !p
      }
      playerRef.current.audio.current.pause()

      return !p
    })
  }

  return (
    <Container onClick={togglePlay}>
      {!isMute ? (
        <MusicOn
          height={24}
          width={24}
          fill="#fff"
        />
      ) : (
        <MusicOff
          height={24}
          width={24}
          fill="#fff"
        />
      )}

      <AudioPlayer
        autoPlay={false}
        src="/audios/robot.mp3"
        loop
        ref={playerRef}
        style={{
          display: 'none',
        }}
        preload="none"
      />
    </Container>
  )
}

export default Audio
