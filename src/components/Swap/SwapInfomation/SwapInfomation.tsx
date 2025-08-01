import Flex from '@/components/commonStyled/Flex'
import Text from '@/components/commonStyled/Text'
import ModalV2 from '@/components/ModalV2'
import { ModalContainer } from '@/components/ModalV2/styles'
import { devices } from '@/config'
import React, { FC } from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  max-width: calc(100vw - 10px) !important;

  @media ${devices.mobileL} {
    max-width: 460px !important;
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
`

const SwapInfomationModal: FC<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ open, setOpen }) => {
  return (
    <ModalV2
      open={open}
      setOpen={setOpen}
    >
      <StyledModalContainer $minHeight="100px">
        <ModalHeader>
          <Title>BUBO Swap</Title>

          <IconWrap onClick={() => setOpen(false)}>
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
          <Text
            fontSize="14px"
            color="#d8d8d8"
          >
            BUBO Swap leverages aggregator technology, powered by the 7K
            Aggregator, ensuring the best possible prices for your tokens.
          </Text>

          <Text
            fontSize="14px"
            color="#d8d8d8"
            mt="10px"
          >
            To avoid any confusion, when swapping all your SUI, the system will
            ensure that at least 0.05 SUI remains in your wallet (not held by
            the system) to cover transaction fees and prevent failures.
          </Text>
        </Body>
      </StyledModalContainer>
    </ModalV2>
  )
}

export default SwapInfomationModal
