import React, { FC, useState } from 'react'
import Flex from '../commonStyled/Flex'
import styled from 'styled-components'
import Text from '../commonStyled/Text'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { CurrencyModal } from './CurrencyModal'
import { Field, ICurrency } from './state'
import TokenLogo from '../TokenLogo'
import Copy from '../Copy'

const SelectButton = styled(Flex)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  color: rgb(255, 255, 255);
  padding: 4px 8px;
  align-items: center;
  width: auto;
  min-width: 100px;
  height: 35px;
  cursor: pointer;
  transition: all 0.2s;

  border: 1px solid rgba(255, 255, 255, 0.05);

  &:focus-within {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
  }

  &:hover {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
    transform: scale(1.03);
  }
`

const Symbol = styled(Text)`
  font-size: 18px;
  font-weight: 500;
`

const TokenSelectButton: FC<{
  currency: ICurrency
  field: Field
}> = ({ currency, field }) => {
  const [isOpenCurrencyModal, setIsOpenCurrencyModal] = useState(false)
  return (
    <>
      <Flex
        height="35px"
        alignItems="center"
      >
        <SelectButton onClick={() => setIsOpenCurrencyModal(true)}>
          <TokenLogo
            address={currency?.pairAddress}
            height={24}
            width={24}
            url={currency?.logoUrl}
          />

          <Symbol ml="4px">{currency?.symbol}</Symbol>

          <ArrowDropDownIcon
            sx={{
              color: '#fff',
            }}
          />
        </SelectButton>

        <Flex
          alignItems="center"
          ml="6px"
        >
          <Copy
            stringCopy={currency.address}
            height={16}
            width={16}
          />
        </Flex>
      </Flex>

      <CurrencyModal
        open={isOpenCurrencyModal}
        setOpen={setIsOpenCurrencyModal}
        field={field}
      />
    </>
  )
}

export default TokenSelectButton
