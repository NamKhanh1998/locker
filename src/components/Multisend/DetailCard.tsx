import React, { FC, useMemo } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import { poppins } from '@/fonts'
import Text from '../commonStyled/Text'
import TokenLogo from '../TokenLogo'
import { formatNumber } from '../utils'
import { useEstimateGasFee } from './hooks/useEstimateGasFee'
import { Transaction } from '@mysten/sui/transactions'
import { isEmpty } from 'lodash'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { usePlatformFee } from './hooks/usePlatformFee'

const Card = styled(Flex)`
  width: 100%;
  max-width: 650px;
  border-radius: 16px;
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

const DetailText = styled(Text)`
  font-size: 14px;
  color: #d8d8d8;
`

const ValueText = styled(Text)`
  font-size: 14px;
  color: #b8add2;
`

const DetailCard: FC<{
  token: any
  amounts?: number
  recipients?: number
}> = ({ token, amounts, recipients }) => {
  const { fee, isLoading } = usePlatformFee()
  return (
    <Card className={poppins.className}>
      <Inner>
        <Content>
          <Flex
            width="100%"
            justifyContent="space-between"
          >
            <DetailText>Asset</DetailText>
            {!!token ? (
              <Flex
                alignItems="center"
                style={{ gap: '5px' }}
              >
                <TokenLogo
                  address={token?.pairAddress}
                  url={token?.logoUrl}
                  height={16}
                  width={16}
                />
                <ValueText>{token?.symbol}</ValueText>
              </Flex>
            ) : (
              <ValueText>-</ValueText>
            )}
          </Flex>

          <Flex
            width="100%"
            justifyContent="space-between"
          >
            <DetailText>Total Sent</DetailText>
            <ValueText>{amounts ? formatNumber(amounts) : '-'}</ValueText>
          </Flex>

          <Flex
            width="100%"
            justifyContent="space-between"
          >
            <DetailText>Recipients</DetailText>
            <ValueText>{recipients ? recipients : '-'}</ValueText>
          </Flex>

          <Flex
            width="100%"
            justifyContent="space-between"
          >
            <DetailText>Platform Fee</DetailText>
            <ValueText>{fee ? fee : '-'} SUI</ValueText>
          </Flex>
        </Content>
      </Inner>
    </Card>
  )
}

export default DetailCard
