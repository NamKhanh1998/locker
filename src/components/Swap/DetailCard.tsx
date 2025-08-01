import React, { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import { poppins } from '@/fonts'
import Text from '../commonStyled/Text'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { useSwapState } from './state'
import { QuoteResponse } from '@7kprotocol/sdk-ts'
import TokenLogo from '../TokenLogo'
import Box from '../commonStyled/Box'
import BigNumber from 'bignumber.js'
import { SlippageTolerance, useUserSippage } from './state/userSippage'

const Card = styled(Flex)`
  width: 100%;
  max-width: 650px;
  border-radius: 16px;
  max-height: 126px;
`

const Inner = styled(Flex)`
  width: 100%;
  background: rgba(23, 37, 52, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  flex-direction: column;
  justify-content: flex-start;

  background-size: cover;
  background-position: center;
`

const Content = styled(Flex)`
  padding: 16px;
  width: 100%;
  gap: 8px;
  flex-direction: column;
`

const ContentText = styled(Text)`
  text-transform: uppercase;
  color: #d8d8d8;
  font-weight: 500;
`

const PriceWrap = styled(Flex)`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
  }
`

const DetailText = styled(Text)`
  font-size: 14px;
  color: #d8d8d8;
`

const ValueText = styled(Text)`
  font-size: 14px;
  color: #b8add2;
`

const ImpactText = styled(Text)`
  font-size: 14px;
`

const PriceImpact: FC<{ priceImpact: number }> = ({ priceImpact }) => {
  const impactValue = useMemo(() => {
    const rawImpact = priceImpact * 100

    return rawImpact
  }, [priceImpact])

  if (impactValue < 0.01) {
    return <ImpactText color="#3dbb9a"> {'< 0.01%'}</ImpactText>
  }

  if (impactValue > 0.01 && impactValue <= 5) {
    return (
      <ImpactText color="#3dbb9a">
        {new BigNumber(impactValue)
          ?.decimalPlaces(2, BigNumber.ROUND_DOWN)
          ?.toString()}
        %
      </ImpactText>
    )
  }

  if (impactValue > 5 && impactValue < 15) {
    return (
      <ImpactText color="#f5d64b">
        {new BigNumber(impactValue)
          ?.decimalPlaces(2, BigNumber.ROUND_DOWN)
          ?.toString()}
        %
      </ImpactText>
    )
  }

  return (
    <ImpactText color="#fa4e4e">
      {new BigNumber(impactValue)
        ?.decimalPlaces(2, BigNumber.ROUND_DOWN)
        ?.toString()}
      %
    </ImpactText>
  )
}

const DetailCard: FC<{
  quoteResponse: QuoteResponse | null | undefined
}> = ({ quoteResponse }) => {
  const [invert, setInvert] = useState(false)

  const {
    swapState: { inputCurrency, outputCurrency },
  } = useSwapState()

  const { activeSlippage } = useUserSippage()

  const { baseCurrency, quoteCurrency } = useMemo(() => {
    if (!invert) {
      return {
        baseCurrency: inputCurrency,
        quoteCurrency: outputCurrency,
      }
    }

    return {
      baseCurrency: outputCurrency,
      quoteCurrency: inputCurrency,
    }
  }, [inputCurrency, outputCurrency, invert])

  const effectivePrice = useMemo(() => {
    const value = !invert
      ? quoteResponse?.effectivePriceReserved
      : quoteResponse?.effectivePrice

    const bigValue = new BigNumber(value || '0')

    const decimals = bigValue.gt(1) ? 4 : 8

    return bigValue?.decimalPlaces(decimals)?.toString()
  }, [invert, quoteResponse])

  return (
    <Card className={poppins.className}>
      <Inner>
        <Content>
          <PriceWrap
            alignItems="center"
            onClick={() => setInvert((p) => !p)}
          >
            <Flex alignItems="center">
              <TokenLogo
                address={baseCurrency.pairAddress}
                height={20}
                width={20}
                url={baseCurrency?.logoUrl}
              />
              <ContentText ml="5px">1 {baseCurrency?.symbol}</ContentText>
            </Flex>
            <ContentText
              ml="5px"
              mr="5px"
              mt="1px"
              style={{
                color: 'gray',
              }}
            >
              =
            </ContentText>
            <Flex alignItems="center">
              <TokenLogo
                address={quoteCurrency.pairAddress}
                height={20}
                width={20}
                url={quoteCurrency?.logoUrl}
              />
              <ContentText ml="5px">
                {effectivePrice} {quoteCurrency?.symbol}
              </ContentText>
            </Flex>

            <Box
              ml="5px"
              mt="2px"
            >
              <SwapHorizIcon
                sx={{
                  height: '20px',
                  width: '20px',
                  color: 'gray',
                }}
              />
            </Box>
          </PriceWrap>

          <Flex
            mt="10px"
            width="100%"
            justifyContent="space-between"
          >
            <DetailText>Price Impact</DetailText>
            <PriceImpact priceImpact={quoteResponse?.priceImpact || 0} />
          </Flex>

          <Flex
            width="100%"
            justifyContent="space-between"
          >
            <DetailText>Max Slippage</DetailText>
            <ValueText>
              {activeSlippage === SlippageTolerance.AUTO
                ? activeSlippage
                : `${activeSlippage}%`}
            </ValueText>
          </Flex>
        </Content>
      </Inner>
    </Card>
  )
}

export default DetailCard
