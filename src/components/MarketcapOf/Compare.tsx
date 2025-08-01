import { devices } from '@/config'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { FC, useMemo } from 'react'
import styled from 'styled-components'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import { useFetchAndManageCoins } from '../Bubbles/hooks/useFetchCoins'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import TokenLogo from '../TokenLogo'
import { formatNumber, formatToSignificantDigits } from '../utils'
import SelectBox from './SelectBox'
import { useManageMkcOf } from './useManageMkcOf'
import { Skeleton } from '@mui/material'

const StyledCompare = styled(Flex)`
  width: 100%;
  justify-content: center;
  background: center center / cover rgba(23, 37, 52, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 8px;
  gap: 5px;
  flex-direction: column;
`

const IconWrap = styled(Flex)`
  align-items: center;
  padding: 0 8px;
  transition: all 0.2s;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const CompareWrap = styled(Flex)`
  gap: 5px;
  flex-direction: column;
  @media ${devices.mobileL} {
    flex-direction: row;
  }
`

const Result = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  flex-direction: column;
  background: center center / cover rgba(23, 37, 52, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
`

const HighLightText = styled.span`
  color: rgb(61, 187, 154);
  text-transform: uppercase;
`

const PercentText = styled.span`
  margin-left: 5px;
`

const ValueText = styled(Text)``

const InputWrap = styled(Flex)`
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 10px 10px;
  &:focus-within {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
  }
  border-radius: 10px;
  transition: all 0.2s;
  max-width: 300px;
`

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  background-color: none;
  background: none;
  color: #b8b6b6;

  &::placeholder {
    color: #b8b6b644;
  }
`

const ResultHeader = styled(Flex)`
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  height: 46px;
  padding: 0 10px;
  align-items: center;
  gap: 10px;
  justify-content: center;
`

const HeaderText = styled(Text)`
  color: rgb(216, 216, 216);
  font-size: 20px;
  font-weight: 500;
  text-transform: uppercase;
`

const ResultBox = styled(Flex)`
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media ${devices.mobileL} {
    width: max-content;
  }
`

const TokenInfo = styled(Flex)`
  width: 100%;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  @media ${devices.mobileL} {
    margin-top: 20px;
    flex-direction: row;
  }
`

const TokenDetail = styled(Flex)`
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  height: 100%;
  margin-left: 10px;
  gap: 10px;
`

const Compare: FC<{
  marketCapRatio: number
  priceWithQuoteRatio: number
}> = ({ marketCapRatio, priceWithQuoteRatio }) => {
  const {
    mkcOfState: { baseToken, quoteToken },
    onSelectBaseToken,
    onSelectQuoteToken,
    onSwicthTokens,
  } = useManageMkcOf()

  const { isMobileL } = useMatchBreakPoints()

  const { fullDataMap } = useFetchAndManageCoins()

  const { baseTokenInfo, quoteTokenInfo } = useMemo(() => {
    if (!fullDataMap) {
      return {
        baseTokenInfo: null,
        quoteTokenInfo: null,
      }
    }

    const baseTokenInfo = fullDataMap?.[
      baseToken.address.toLowerCase()
    ] as CoingeckoCoinData
    const quoteTokenInfo = fullDataMap?.[
      quoteToken.address.toLowerCase()
    ] as CoingeckoCoinData

    return {
      baseTokenInfo,
      quoteTokenInfo,
    }
  }, [fullDataMap, baseToken, quoteToken])

  return (
    <Flex flexDirection="column">
      <StyledCompare>
        <CompareWrap>
          <SelectBox
            token={baseToken}
            selectToken={onSelectBaseToken}
          />

          <IconWrap onClick={onSwicthTokens}>
            {isMobileL ? (
              <SwapVertIcon
                sx={{
                  color: 'rgb(216, 216, 216)',
                  height: '25px',
                  width: '25px',
                }}
              />
            ) : (
              <SwapHorizIcon
                sx={{
                  color: 'rgb(216, 216, 216)',
                  height: '30px',
                  width: '30px',
                }}
              />
            )}
          </IconWrap>

          <SelectBox
            token={quoteToken}
            selectToken={onSelectQuoteToken}
          />
        </CompareWrap>
      </StyledCompare>

      <Result>
        <ResultHeader>
          <Flex alignItems="center">
            <HeaderText mr="5px">{baseToken.symbol}</HeaderText>
            <TokenLogo
              height={25}
              width={25}
              address={baseToken?.pairAddress}
            />
          </Flex>
          <HeaderText
            style={{
              fontSize: '16px',
            }}
          >
            vs
          </HeaderText>
          <Flex alignItems="center">
            <TokenLogo
              height={25}
              width={25}
              address={quoteToken?.pairAddress}
            />
            <HeaderText ml="5px">{quoteToken?.symbol}</HeaderText>
          </Flex>
        </ResultHeader>

        <Flex
          flexDirection="column"
          padding="10px"
          alignItems="center"
          width="100%"
        >
          <Text mt="20px">
            <HighLightText>{baseToken.symbol}</HighLightText> With The Market
            Cap of <HighLightText>{quoteToken.symbol}</HighLightText>
          </Text>

          <ResultBox
            mt="20px"
            height="50px"
          >
            <TokenLogo address={baseToken.pairAddress} />

            {!priceWithQuoteRatio || !marketCapRatio ? (
              <Skeleton
                height={30}
                width={100}
                style={{
                  marginLeft: '10px',
                }}
              />
            ) : (
              <Flex alignItems="center">
                <ValueText
                  fontSize="20px"
                  ml="5px"
                >
                  ${formatToSignificantDigits(priceWithQuoteRatio)}
                </ValueText>

                <ValueText
                  color={
                    Number(marketCapRatio) >= 1
                      ? 'rgb(61, 187, 154)'
                      : '#ff5858'
                  }
                  fontSize="18px"
                  ml="5px"
                >
                  (
                  {marketCapRatio?.toLocaleString(undefined, {
                    maximumFractionDigits: 3,
                  })}
                  x)
                </ValueText>
              </Flex>
            )}
          </ResultBox>

          <TokenInfo>
            <ResultBox style={{ height: '60px' }}>
              <TokenLogo address={baseToken.pairAddress} />

              <TokenDetail>
                <Flex
                  flexDirection="column"
                  ml="10px"
                >
                  <Text
                    fontSize="12px"
                    color="rgb(216,216,216)"
                  >
                    Price
                  </Text>

                  {!baseTokenInfo ? (
                    <Skeleton
                      height={30}
                      width={60}
                    />
                  ) : (
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                    >
                      $
                      {formatToSignificantDigits(
                        Number(baseTokenInfo?.price) || 0
                      )}
                    </Text>
                  )}
                </Flex>

                <Flex
                  flexDirection="column"
                  ml="10px"
                >
                  <Text
                    fontSize="12px"
                    color="rgb(216,216,216)"
                  >
                    Market Cap
                  </Text>
                  {!baseTokenInfo ? (
                    <Skeleton
                      height={30}
                      width={60}
                    />
                  ) : (
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                    >
                      ${formatNumber(baseTokenInfo?.marketCap || 0)}
                    </Text>
                  )}
                </Flex>
              </TokenDetail>
            </ResultBox>
            <ResultBox style={{ height: '60px' }}>
              <TokenLogo address={quoteToken.pairAddress} />

              <TokenDetail>
                <Flex
                  flexDirection="column"
                  ml="10px"
                >
                  <Text
                    fontSize="12px"
                    color="rgb(216,216,216)"
                    minWidth="max-content"
                  >
                    Price
                  </Text>

                  {!quoteTokenInfo ? (
                    <Skeleton
                      height={30}
                      width={60}
                    />
                  ) : (
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                    >
                      $
                      {formatToSignificantDigits(
                        Number(quoteTokenInfo?.price) || 0
                      )}
                    </Text>
                  )}
                </Flex>

                <Flex
                  flexDirection="column"
                  ml="10px"
                  width="100%"
                >
                  <Text
                    fontSize="12px"
                    color="rgb(216,216,216)"
                    minWidth="max-content"
                  >
                    Market Cap
                  </Text>

                  {!quoteTokenInfo ? (
                    <Skeleton
                      height={30}
                      width={60}
                    />
                  ) : (
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                    >
                      ${formatNumber(quoteTokenInfo?.marketCap || 0)}
                    </Text>
                  )}
                </Flex>
              </TokenDetail>
            </ResultBox>
          </TokenInfo>
        </Flex>
      </Result>
    </Flex>
  )
}

export default Compare
