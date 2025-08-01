import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import {
  displayValueFormatted,
  escapeRegNumberExp,
  inputRegex,
  isSui,
  normalizeInput,
} from './utils'
import BalanceIcon from '../icons/BalanceIcon'
import TokenSelectButton from './TokenSelectButton'
import { Field, ICurrency, useSwapActionHandler } from './state'
import { useCurrentWallet } from '@mysten/dapp-kit'
import BigNumber from 'bignumber.js'
import { MIN_SUI } from './utils/bigNumber'
import SpinLoading from '../SpinLoading'
import { devices } from '@/config'

const StyledInputPanel = styled(Flex)`
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px;
  position: relative;
  width: 100%;
  flex-direction: column;
  transition: all 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  &:focus-within {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
  }
`

const PanelText = styled(Text)`
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
`

const PanelContent = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
`

const StyledInput = styled.input<{
  error?: boolean
  fontSize?: string
  align?: string
}>`
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  text-align: ${({ align }) => align ?? 'right'};
  white-space: nowrap;
  padding: 0px;
  line-height: 1;
  color: #fff;
  width: 100%;
  height: 32px;
  text-overflow: ellipsis;
  font-size: 22px;

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

  &:disabled {
    opacity: 1 !important;
    color: #fff;
    -webkit-text-fill-color: inherit;
    background-color: inherit;
  }

  @media ${devices.tablet} {
    font-size: 28px;
    font-weight: 600;
  }
`

const ValueWrap = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  margin-top: 8px;
  height: 18px;
`

const SubText = styled(Text)`
  color: #b8add2;
  font-size: 12px;
`

const PanelHeader = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const PercentWrap = styled(Flex)`
  gap: 6px;
`

const PercentBtn = styled(Flex)`
  border: 1px solid #3dbb9a;
  border-radius: 6px;
  height: 20px;
  padding: 0px 8px;
  transition: all 0.2s;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.03);
    background-color: #3dbb9918;
  }
  cursor: pointer;
`

const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`

const BalanceWrap = styled(Flex)`
  cursor: pointer;
  opacity: 1;
`

const Percents = [25, 50, 75, 100]

const InputPanel: FC<{
  currency: ICurrency
  field: Field
  value: string
  currencyBalance: string
  valueInUsd?: string
  isLoading?: boolean
}> = ({ currency, field, value, currencyBalance, valueInUsd, isLoading }) => {
  const isInput = field === Field.INPUT

  const { onTypeInput } = useSwapActionHandler()

  const { isConnected } = useCurrentWallet()

  const enforcer = (nextUserInput: string) => {
    if (!isInput) return

    const escapedInput = escapeRegNumberExp(nextUserInput)

    if (nextUserInput === '' || inputRegex.test(escapedInput)) {
      const rawValue = normalizeInput(nextUserInput)
      onTypeInput(rawValue)
    }
  }

  const onFastInput = useCallback(
    (percent: number) => {
      const balance = new BigNumber(currencyBalance || 0)
      const inputBalance = balance
        .times(percent)
        .div(100)
        .decimalPlaces(currency?.decimals)

      if (isSui(currency)) {
        if (balance.lt(MIN_SUI)) return

        const remainingBalance = balance.minus(inputBalance)
        const adjustedBalance = remainingBalance.lt(MIN_SUI)
          ? inputBalance.minus(MIN_SUI)
          : inputBalance

        enforcer(adjustedBalance.toString())
      } else {
        enforcer(inputBalance.toString())
      }
    },
    [currencyBalance, currency, enforcer]
  )

  return (
    <StyledInputPanel>
      <PanelHeader>
        <PanelText>{isInput ? 'From' : 'To'}</PanelText>

        {isInput && (
          <PercentWrap>
            {Percents?.map((p) => (
              <PercentBtn
                key={p}
                onClick={() => onFastInput(p)}
              >
                <Text
                  color="#3dbb9a"
                  fontSize="12px"
                  lineHeight={1}
                >
                  {p}%
                </Text>
              </PercentBtn>
            ))}
          </PercentWrap>
        )}
      </PanelHeader>

      <PanelContent>
        <TokenSelectButton
          currency={currency}
          field={field}
        />

        {isLoading ? (
          <SpinLoading
            height={28}
            width={28}
            strokeW={5}
          />
        ) : (
          <StyledInput
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            type="text"
            pattern="^[0-9]*[.,]?[0-9]*$"
            placeholder={'0.0'}
            minLength={1}
            maxLength={79}
            spellCheck="false"
            disabled={!isInput}
            value={displayValueFormatted(value)}
            onChange={(event) => {
              enforcer(event.target.value)
            }}
          />
        )}
      </PanelContent>

      <ValueWrap>
        <BalanceWrap
          alignItems="center"
          onClick={() => {
            if (isInput) onFastInput(100)
          }}
        >
          {isConnected && (
            <>
              <BalanceIcon fill="#b8add2" />
              <SubText m="4px">
                {displayValueFormatted(currencyBalance)}
              </SubText>
            </>
          )}
        </BalanceWrap>
        <Flex>
          {isLoading ? (
            <SubText>
              <Dots />
            </SubText>
          ) : (
            <SubText>{valueInUsd && value ? `${valueInUsd} USD` : ''}</SubText>
          )}
        </Flex>
      </ValueWrap>
    </StyledInputPanel>
  )
}

export default InputPanel
