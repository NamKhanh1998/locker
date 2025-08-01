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
import { displaySuccessToast } from '../utils/toast'
import CodeMirror from '@uiw/react-codemirror'
import { poppins } from '@/fonts'
import { myTheme } from './Body'
import { lineHeightExtension } from './utils'

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

const TextAreaContainer = styled(Box)`
  width: 100%;
  height: 215px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.05);
  transition: 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;

  .cm-theme {
    height: 100% !important;
  }
  .cm-editor {
    height: 100% !important;
  }
  .cm-gutters {
    height: 100% !important;
    backdrop-filter: blur(10px);
  }

  .cm-activeLine {
    background-color: transparent;
  }
  .cm-activeLineGutter {
    background-color: transparent;
  }

  .cm-scroller {
    border: none;
  }
`

const examValue = `0xc37c44dcea4d25b7bc74911cc11fc02182fe85a7e56cf93908675391c5f0f143,1
0xbd2444d49dd81d80bb71d26b4ca5c1f6530478b22a846094bc9d717e12cd59f0,1
0xad68cb94731e9cbbce6115db502c134a8100dcbeb659c14e02cb18f4a7788576,1
0x89e210e8afe8f27579a058454ab440470c41359b3af0bbec79de8634c169237b,1
0x102b4a66e4139aaea723d1b1ce4c7582631926c11b4519c12553dd5bbf3cf184=1
0x0dcb61ad586680d23effa6c5ca86a1cf72f3012c873a72086934a07a92b40791=1`

const ExampleCsvModal: FC<{
  open: boolean
  callBack: () => void
}> = ({ callBack, open }) => {
  return (
    <ModalV2
      open={open}
      callBack={callBack}
    >
      <StyledModalContainer $minHeight="200px">
        <ModalHeader>
          <Title>Example CSV</Title>

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

        <Body>
          <TextAreaContainer>
            <CodeMirror
              readOnly
              value={examValue}
              placeholder="Insert your CSV here"
              theme={myTheme}
              className={poppins.className}
              extensions={[lineHeightExtension]}
            />
          </TextAreaContainer>
          <Text
            fontSize="12px"
            mt="10px"
            color="#acacac"
          >
            Maximum 400 lines per batch.{' '}
          </Text>
          <Text
            fontSize="12px"
            color="#acacac"
          >
            You can use either ',' or '=' to separate the address and the
            amount.
          </Text>
        </Body>
      </StyledModalContainer>
    </ModalV2>
  )
}

export default ExampleCsvModal
