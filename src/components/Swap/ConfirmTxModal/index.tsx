import ModalV2 from '@/components/ModalV2'
import React, { FC, useMemo } from 'react'
import { useSwapActionState } from '../state/swapActionState'
import { ModalContainer } from '@/components/ModalV2/styles'
import styled from 'styled-components'
import { devices } from '@/config'
import Flex from '@/components/commonStyled/Flex'
import Text from '@/components/commonStyled/Text'
import CloseIcon from '@mui/icons-material/Close'
import { poppins } from '@/fonts'
import SpinLoading from '@/components/SpinLoading'
import { useSwapState } from '../state'
import BigNumber from 'bignumber.js'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import AnimatedCheckmark from '@/components/AnimateCheckMark'
import TokenLogo from '@/components/TokenLogo'
import EastIcon from '@mui/icons-material/East'

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  max-width: calc(100vw - 10px) !important;

  @media ${devices.mobileL} {
    max-width: 440px !important;
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
  align-items: center;
  height: 250px;
  justify-content: center;
`

const LinkText = styled(Text)`
  font-size: 12px;
  margin-top: 15px;
  color: #3dbb9a;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const ConfirmTxModal: FC<{}> = () => {
  const {
    setSwapActionstate,
    swapActionState: {
      showConfirmModal,
      attemptingTxn,
      swapErrorMessage,
      txHash,
    },
  } = useSwapActionState()

  const {
    swapState: { inputCurrency, outputCurrency, inputValue, outputValue },
  } = useSwapState()

  const callBack = () => {
    setSwapActionstate({
      showConfirmModal: false,
      attemptingTxn: false,
      txHash: undefined,
      swapErrorMessage: undefined,
    })
  }

  const confirmText = useMemo(() => {
    return `Swapping ${new BigNumber(inputValue)
      .decimalPlaces(6)
      ?.toString()} ${inputCurrency.symbol?.toUpperCase()} for ${new BigNumber(
      outputValue
    )
      .decimalPlaces(6)
      ?.toString()} ${outputCurrency.symbol?.toUpperCase()}`
  }, [inputCurrency, outputCurrency, inputValue, outputValue])

  return (
    <ModalV2
      open={showConfirmModal}
      callBack={callBack}
    >
      <StyledModalContainer
        $minHeight="300px"
        className={poppins.className}
      >
        <ModalHeader>
          <Title>Confirm Swap</Title>

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
          {attemptingTxn ? (
            <>
              <Text
                fontSize="20px"
                fontWeight={600}
              >
                Waiting For Confirmation
              </Text>
              <Flex padding="20px 0">
                <SpinLoading
                  height={80}
                  width={80}
                  strokeW={8}
                />
              </Flex>
              <Text
                fontSize="14px"
                color="#b8add2"
                textAlign="center"
              >
                {confirmText}
              </Text>

              <Text
                mt="10px"
                color="#b8add2"
                fontSize="12px"
              >
                Confirm this transaction in your wallet
              </Text>
            </>
          ) : swapErrorMessage ? (
            <>
              <Flex>
                <ErrorOutlineIcon
                  sx={{
                    height: '80px',
                    width: '80px',
                    color: '#d8d8d8',
                  }}
                />
              </Flex>
              <Text
                mt="10px"
                color="#d8d8d8"
                textAlign="center"
              >
                {swapErrorMessage}
              </Text>

              {swapErrorMessage?.includes('Denied') && (
                <Text
                  mt="10px"
                  color="#848484"
                  fontSize="12px"
                  textAlign="center"
                >
                  It seems like you denied the request on the wallet.
                </Text>
              )}
            </>
          ) : txHash ? (
            <Flex
              flexDirection="column"
              mt="20px"
              alignItems="center"
            >
              <AnimatedCheckmark />

              <Text mt="10px">Swap Completed</Text>

              <Flex
                alignItems="center"
                mt="16px"
                style={{
                  gap: '4px',
                }}
              >
                {[
                  { currency: inputCurrency, value: inputValue },
                  { currency: outputCurrency, value: outputValue },
                ].map(({ currency, value }, index) => (
                  <React.Fragment key={index}>
                    <TokenLogo
                      address={currency?.pairAddress}
                      height={20}
                      width={20}
                      url={currency?.logoUrl}
                    />
                    <Text
                      fontSize="14px"
                      color="#d8d8d8"
                    >
                      {new BigNumber(value).decimalPlaces(6).toString()}{' '}
                      {currency?.symbol?.toUpperCase()}
                    </Text>

                    {index === 0 && (
                      <EastIcon
                        sx={{
                          height: '14px',
                          width: '14px',
                          color: 'gray',
                        }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </Flex>

              <LinkText
                onClick={() => {
                  window.open(`https://suiscan.xyz/mainnet/tx/${txHash}`)
                }}
              >
                View on Explorer ↗
              </LinkText>
            </Flex>
          ) : (
            <></>
          )}
        </Body>
      </StyledModalContainer>
    </ModalV2>
  )
}

export default ConfirmTxModal
