import Flex from '@/components/commonStyled/Flex'
import Text from '@/components/commonStyled/Text'
import ModalV2 from '@/components/ModalV2'
import { ModalContainer } from '@/components/ModalV2/styles'
import SpinLoading from '@/components/SpinLoading'
import { devices } from '@/config'
import { poppins } from '@/fonts'
import CloseIcon from '@mui/icons-material/Close'
import { FC, useMemo } from 'react'
import styled from 'styled-components'
import AnimatedCheckmark from '@/components/AnimateCheckMark'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useBulkSendActionState } from '../hooks/useBulkSendActionState'

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
    setBulkSendActionState,
    bulkSendActionState: {
      showConfirmModal,
      attemptingTxn,
      errorMessage,
      txHash,
    },
  } = useBulkSendActionState()

  const callBack = () => {
    setBulkSendActionState({
      showConfirmModal: false,
      attemptingTxn: false,
      txHash: undefined,
      errorMessage: undefined,
    })
  }

  const confirmText = useMemo(() => {
    return ``
  }, [])

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
          <Title>Confirm</Title>

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
          ) : errorMessage ? (
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
                {errorMessage}
              </Text>

              {errorMessage?.includes('Denied') && (
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

              <Text mt="10px">Transaction Executed Successfully</Text>

              {/* <Flex
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
              </Flex> */}

              <LinkText
                onClick={() => {
                  window.open(`https://suivision.xyz/txblock/${txHash}`)
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
