import ModalV2 from '@/components/ModalV2'
import { ModalContainer } from '@/components/ModalV2/styles'
import React, { FC, useCallback } from 'react'
import { ICurrency } from '../state'
import styled, { css } from 'styled-components'
import { devices } from '@/config'
import Flex from '@/components/commonStyled/Flex'
import Text from '@/components/commonStyled/Text'
import CloseIcon from '@mui/icons-material/Close'
import TokenLogo from '@/components/TokenLogo'
import PublicIcon from '@mui/icons-material/Public'
import Copy from '@/components/Copy'
import Box from '@/components/commonStyled/Box'
import { formatAddress } from '@/components/ConnectWallet/utils'
import { useCurrencyPrice } from '../hooks/useCurrencyPrice'
import { displayBalanceValue } from '../utils/bigNumber'
import { displayValueFormatted } from '../utils'
import DeleteIcon from '@mui/icons-material/Delete'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import { useTokensImport } from '../hooks/useManageImportToken'

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  max-width: calc(100vw - 10px) !important;

  @media ${devices.mobileM} {
    max-width: 380px !important;
    height: auto;
  }
`

const ModalHeader = styled(Flex)`
  padding: 16px;
  padding-bottom: 8px;
  width: 100%;
  justify-content: space-between;
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
  padding: 16px 8px;
  padding-top: 0;
  flex-direction: column;
`

const Button = styled(Flex)`
  padding: 8px 12px;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  justify-content: center;
  width: fit-content;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const DetailBox = styled(Flex)`
  padding: 12px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  width: 100%;
  height: auto;
  flex-direction: column;
  height: 62px;
`

const TokenDetailModal: FC<{
  tokenDetail: (ICurrency & { balance?: string }) | null
  callBack: () => void
}> = ({ tokenDetail, callBack }) => {
  const { price } = useCurrencyPrice(tokenDetail?.address || '')
  const { onRemoveToken } = useTokensImport()

  const handleRemoveToken = useCallback(() => {
    onRemoveToken(tokenDetail as ICurrency)
    callBack?.()
  }, [tokenDetail, onRemoveToken])

  return (
    <ModalV2
      open={!!tokenDetail}
      callBack={callBack}
    >
      {tokenDetail && (
        <StyledModalContainer $minHeight="200px">
          <ModalHeader>
            <Flex alignItems="center">
              <TokenLogo
                address={tokenDetail?.pairAddress!}
                height={38}
                width={38}
                url={tokenDetail?.logoUrl}
              />

              <Flex
                ml="8px"
                flexDirection="column"
              >
                <Flex>
                  <Text
                    fontSize="18px"
                    fontWeight={500}
                    lineHeight={1}
                  >
                    {tokenDetail?.symbol}
                  </Text>

                  {tokenDetail?.import && (
                    <Box ml="4px">
                      <VerticalAlignBottomIcon
                        sx={{
                          height: '18px',
                          width: '18px',
                          color: '#fff',
                        }}
                      />
                    </Box>
                  )}
                </Flex>

                <Text
                  mt="2px"
                  lineHeight={1}
                  fontSize="14px"
                  color="gray"
                >
                  {tokenDetail?.name}
                </Text>
              </Flex>
            </Flex>

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
            <Flex
              alignItems="center"
              width="100%"
              justifyContent="space-between"
            >
              <Button
                onClick={() => {
                  window.open(
                    `https://suiscan.xyz/mainnet/coin/${tokenDetail?.address}`
                  )
                }}
              >
                <PublicIcon
                  sx={{
                    height: '20px',
                    width: '20px',
                    color: '#d8d8d8',
                  }}
                />
                <Text
                  fontSize="14px"
                  color="#d8d8d8"
                >
                  View on explorer
                </Text>
              </Button>

              {tokenDetail?.import && (
                <Button onClick={handleRemoveToken}>
                  <DeleteIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: '#d8d8d8',
                    }}
                  />
                </Button>
              )}
            </Flex>

            <Flex
              width="100%"
              padding="0 8px"
              mt="10px"
              flexDirection="column"
            >
              <DetailBox>
                <Text
                  fontSize="14px"
                  color="#d8d8d8"
                  lineHeight={1}
                >
                  Price
                </Text>
                <Text
                  mt="8px"
                  color="#fff"
                  fontWeight={500}
                  lineHeight={1}
                >
                  ${price}
                </Text>
              </DetailBox>

              <DetailBox mt="10px">
                <Text
                  fontSize="14px"
                  color="#d8d8d8"
                  lineHeight={1}
                >
                  Balance
                </Text>

                <Flex alignItems="center">
                  <Text
                    mt="8px"
                    color="#fff"
                    fontWeight={500}
                    lineHeight={1}
                  >
                    {displayValueFormatted(tokenDetail?.balance || '') || 0}
                  </Text>

                  <Text
                    mt="8px"
                    ml="8px"
                    color="#d8d8d8"
                    fontWeight={500}
                    lineHeight={1}
                    fontSize="12px"
                  >
                    {Number(tokenDetail?.balance)
                      ? `(${displayBalanceValue(
                          tokenDetail?.balance || '',
                          price
                        )} $)`
                      : ''}
                  </Text>
                </Flex>
              </DetailBox>
              <Flex
                mt="20px"
                width="100%"
                justifyContent="space-between"
              >
                <Text
                  color="#d8d8d8"
                  fontSize="14px"
                >
                  Decimals
                </Text>
                <Text
                  color="#d8d8d8"
                  fontSize="14px"
                >
                  {tokenDetail?.decimals}
                </Text>
              </Flex>

              <Flex
                mt="8px"
                width="100%"
                justifyContent="space-between"
              >
                <Text
                  color="#d8d8d8"
                  fontSize="14px"
                >
                  Type
                </Text>

                <Flex alignItems="center">
                  <Text
                    color="#d8d8d8"
                    fontSize="14px"
                    lineHeight={1}
                    mr="4px"
                  >
                    {formatAddress(tokenDetail?.address, {
                      first: 6,
                      last: -10,
                    })}
                  </Text>

                  <Box>
                    <Copy
                      height={14}
                      width={14}
                      stringCopy={tokenDetail.address}
                    />
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Body>
        </StyledModalContainer>
      )}
    </ModalV2>
  )
}

export default TokenDetailModal
