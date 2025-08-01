import Flex from '@/components/commonStyled/Flex'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { ICurrency } from '../state'
import TokenLogo from '@/components/TokenLogo'
import Text from '@/components/commonStyled/Text'
import InfoIcon from '@/components/icons/InfoIcon'

const CurrencyRow = styled(Flex)<{ $isSelected: boolean }>`
  padding: 10px 8px;
  cursor: pointer;
  width: 100%;
  border-radius: 8px;
  transition: all 0.2s;
  height: 60px;
  align-items: center;
  justify-content: space-between;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background-color: rgba(255, 255, 255, 0.05);
    `}

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &:hover .info-icon {
    opacity: 1;
    pointer-events: auto;
  }
`

const InfoWrap = styled(Flex)`
  border-radius: 50%;
  padding: 0 5px;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0;
  &:hover > svg {
    fill: #fff;
  }
`

const ImportBtn = styled(Flex)`
  border: 1px solid #3dbb9a;
  border-radius: 6px;
  padding: 2px 16px;
  transition: all 0.2s;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: all 0.2s;
  background-color: #3dbb9a;
  &:hover {
    background-color: #3dbb99c3;
  }
`

const ImportRow: FC<{
  token: ICurrency
  onImportToken: () => void
}> = ({ token, onImportToken }) => {
  return (
    <CurrencyRow $isSelected>
      <Flex alignItems="center">
        <TokenLogo
          address={token?.pairAddress}
          url={token?.logoUrl}
        />

        <Flex
          ml="8px"
          flexDirection="column"
        >
          <Flex alignItems="center">
            <Text lineHeight={1}>{token.symbol}</Text>
          </Flex>
          <Text
            fontSize="12px"
            lineHeight={1}
            color="#b8add2"
            mt="6px"
          >
            {token.name}
          </Text>
        </Flex>
      </Flex>

      <ImportBtn onClick={onImportToken}>
        <Text
          color="#fff"
          fontSize="14px"
          fontWeight={600}
        >
          Import
        </Text>
      </ImportBtn>
    </CurrencyRow>
  )
}

export default ImportRow
