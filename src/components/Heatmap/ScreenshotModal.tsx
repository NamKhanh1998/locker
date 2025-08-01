import React, { FC } from 'react'
import ModalV2 from '../ModalV2'
import { ModalContainer } from '../ModalV2/styles'
import styled from 'styled-components'
import { devices } from '@/config'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import CloseIcon from '@mui/icons-material/Close'
import Box from '../commonStyled/Box'
import { LoadingDot } from '../Loader'
import { copyImageToClipboard, dowloadImg } from './utils'
import { displaySuccessToast } from '../utils/toast'

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  max-width: calc(100vw - 10px) !important;

  @media ${devices.mobileL} {
    max-width: 600px !important;
    height: auto;
  }
`

const ModalHeader = styled(Flex)`
  padding: 16px;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
`

const IconWrap = styled(Flex)`
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover > svg {
    fill: #fff;
  }
`

const Body = styled(Flex)`
  width: 100%;
  padding: 16px;
  padding-top: 0;
  flex-direction: column;
  max-height: 560px;
  overflow-y: auto;
`

const Image = styled.img`
  height: auto;
  width: 100%;
  max-height: 540px;
`

const Button = styled(Flex)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: rgb(255, 255, 255);
  padding: 4px 8px;
  align-items: center;
  min-width: 100px;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: center;
  border: 1px solid #bcb9b9;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  margin: 0 2px;

  &:hover {
    border: 1px solid #bcfbff;
    box-shadow: 0px 0px 4px 1px #bcfbff;
  }
`

const ScreenshotModal: FC<{
  open: boolean
  callBack: () => void
  screenImg: string | null
}> = ({ callBack, open, screenImg }) => {
  const onCopyImg = () => {
    if (screenImg) {
      copyImageToClipboard(screenImg)
      displaySuccessToast('Copied')
    }
  }

  return (
    <ModalV2
      open={open}
      callBack={callBack}
    >
      <StyledModalContainer $minHeight="200px">
        <ModalHeader>
          <Title>Heatmap Screenshot</Title>

          <IconWrap onClick={callBack}>
            <CloseIcon
              sx={{
                color: 'rgb(116, 116, 116)',
                height: '20px',
                width: '20px',
              }}
            />
          </IconWrap>
        </ModalHeader>
        <Flex
          width="100%"
          mt="10px"
          padding="16px"
          paddingTop={0}
        >
          <Button
            onClick={() => {
              if (screenImg) {
                dowloadImg(screenImg)
              }
            }}
          >
            Download
          </Button>
          <Button onClick={onCopyImg}>Copy Image</Button>
        </Flex>
        <Body>
          <Flex
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
          >
            {screenImg ? (
              <Image
                alt="screenshot"
                src={screenImg}
              />
            ) : (
              <LoadingDot />
            )}
          </Flex>
        </Body>
      </StyledModalContainer>
    </ModalV2>
  )
}

export default ScreenshotModal
