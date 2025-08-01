import Flex from '@/components/commonStyled/Flex'
import Text from '@/components/commonStyled/Text'
import ModalV2 from '@/components/ModalV2'
import { ModalContainer } from '@/components/ModalV2/styles'
import { devices } from '@/config'
import React, { FC } from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'
import LandslideIcon from '@mui/icons-material/Landslide'
import { SlippageTolerance, useUserSippage } from '../state/userSippage'
import {
  displayValueFormatted,
  escapeRegNumberExp,
  inputRegex,
  normalizeInput,
} from '../utils'

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

const SlippageBar = styled(Flex)`
  width: 100%;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 5px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  gap: 4px;
`

const Slippage = styled(Flex)`
  padding: 8px 0px;
  cursor: pointer;
  transition: all 0.2s;
  color: #fff;
  border-radius: 16px;
  width: 100%;
  justify-content: center;
  height: 34px;
  border: 1px solid transparent;

  &:hover {
    color: #b8add2;
    background-color: rgba(255, 255, 255, 0.05);
  }

  &:focus-within {
    border: 1px solid #3dbb9a;
  }
`

const StyledInput = styled.input<{
  error?: boolean
  fontSize?: string
  align?: string
}>`
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  text-align: ${({ align }) => align ?? 'right'};
  white-space: nowrap;
  padding: 0px;
  font-size: 12px;
  line-height: 1;
  color: #fff;
  width: 100%;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: #7d7a7a;
  }
`

const SlippageItems = [
  SlippageTolerance.AUTO,
  SlippageTolerance.ONE,
  SlippageTolerance.THREE,
  SlippageTolerance.FIVE,
]

const SettingModal: FC<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ open, setOpen }) => {
  const {
    userSlippage: { slippage, customSlippage },
    setUserSlippage,
  } = useUserSippage()

  const enforcer = (nextUserInput: string) => {
    const escapedInput = escapeRegNumberExp(nextUserInput)

    if (nextUserInput === '' || inputRegex.test(escapedInput)) {
      const rawValue = normalizeInput(nextUserInput)

      const ajustedValue = Number(rawValue) >= 70 ? '70' : rawValue

      setUserSlippage((p) => ({
        slippage: SlippageTolerance.AUTO,
        customSlippage: ajustedValue,
      }))
    }
  }

  return (
    <ModalV2
      open={open}
      setOpen={setOpen}
    >
      <StyledModalContainer $minHeight="100px">
        <ModalHeader>
          <Title>Settings</Title>

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
          <Flex
            width="100%"
            justifyContent="space-between"
          >
            <Flex>
              <LandslideIcon
                sx={{
                  color: '#fff',
                  height: '20px',
                  width: '20px',
                }}
              />
              <Text ml="6px">Max Slippage</Text>
            </Flex>

            <Flex>
              {customSlippage ? (
                <Text color="#b8add2">{customSlippage}%</Text>
              ) : (
                <Text color="#b8add2">
                  {slippage === SlippageTolerance.AUTO
                    ? slippage
                    : `${slippage}%`}
                </Text>
              )}
            </Flex>
          </Flex>

          <SlippageBar mt="16px">
            {SlippageItems?.map((item) => (
              <Slippage
                key={item}
                onClick={() =>
                  setUserSlippage((p) => ({
                    slippage: item,
                    customSlippage: '',
                  }))
                }
              >
                {item === SlippageTolerance.AUTO ? item : `${item}%`}
              </Slippage>
            ))}

            <Slippage
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <StyledInput
                placeholder="Custom"
                align="center"
                value={
                  customSlippage ? displayValueFormatted(customSlippage) : ''
                }
                onChange={(event) => {
                  enforcer(event.target.value)
                }}
              />
            </Slippage>
          </SlippageBar>

          <Text
            mt="12px"
            fontSize="12px"
            color="gray"
          >
            Low slippage tolerance may cause transaction failures due to market
            fluctuations. We recommend setting slippage to <strong>AUTO</strong>{' '}
            for smoother execution
          </Text>
        </Body>
      </StyledModalContainer>
    </ModalV2>
  )
}

export default SettingModal
