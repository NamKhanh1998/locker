import React from 'react'
import styled from 'styled-components'
import { devices } from '@/config'
import Flex from '../commonStyled/Flex'
import Image from 'next/image'
import DownloadIcon from '@mui/icons-material/Download'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { photos } from './config'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  padding-top: 80px;
`

const Inner = styled(Flex)`
  width: 100%;
  min-height: calc(100vh - 60px);
  max-width: calc(100vw - 10px);

  gap: 20px;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 50px;

  @media ${devices.mobileM} {
    max-width: 540px;
  }
  @media ${devices.mobileL} {
    max-width: 720px;
  }
  @media ${devices.tablet} {
    max-width: 960px;
  }
  @media ${devices.laptop} {
    max-width: 1140px;
  }
  @media ${devices.laptopL} {
    max-width: 1320px;
  }
`

const BigTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 40px;

  @media ${devices.mobileM} {
    font-size: 50px;
  }
`

const Desc = styled.h1`
  margin: 0;
  color: #ccc9c9;
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  letter-spacing: 1.5;
  font-weight: 400;

  @media ${devices.tablet} {
    font-size: 18px;
  }
`

const ImageList = styled(Flex)`
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  padding: 0 5px;
`
const IconWrap = styled(Flex)`
  right: 10px;
  top: 10px;
  position: absolute;
  padding: 5px;
  border-radius: 6px;
  background-color: #34343447;
  width: 35px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;
  &:hover {
    transform: scale(1.01);
  }
`

const ImageWrap = styled(Flex)`
  background-color: #4040401d;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.02);
  }
  &:hover > ${IconWrap} {
    opacity: 1;
  }
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  position: relative;

  width: 100%;
  height: auto;

  @media ${devices.mobileM} {
    width: 300px;
    height: 300px;
  }
`

const NextImage = styled(Image)`
  width: 100%;
  height: auto;
`

const Gallery = () => {
  return (
    <PhotoProvider>
      <Wrapper>
        <Inner>
          <BigTitle>Bubo Gallery</BigTitle>

          <Flex
            maxWidth="900px"
            flexDirection="column"
            style={{
              gap: '5px',
            }}
          >
            <Desc>
              💚 Moments of BUBO and the community, captured and showcased right
              here 💚
            </Desc>
          </Flex>

          <ImageList>
            {photos.map((item) => (
              <PhotoView
                src={item.url}
                key={item.url}
              >
                <ImageWrap>
                  <IconWrap>
                    <a
                      href={item.url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        margin: 0,
                        height: '25px',
                      }}
                    >
                      <DownloadIcon
                        sx={{
                          height: 25,
                          with: 25,
                          color: '#fff',
                        }}
                      />
                    </a>
                  </IconWrap>
                  <NextImage
                    src={item.url}
                    alt="gallery"
                    width={500}
                    height={500}
                  />
                </ImageWrap>
              </PhotoView>
            ))}
          </ImageList>
        </Inner>
      </Wrapper>
    </PhotoProvider>
  )
}

export default Gallery
