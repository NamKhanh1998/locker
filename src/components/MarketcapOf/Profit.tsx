import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import XIcon from '../icons/Xicon'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import Text from '../commonStyled/Text'
import { formatNumber, formatToSignificantDigits } from '../utils'
import { AmountIn, useManageMkcOf } from './useManageMkcOf'
import {
  displayValueFormatted,
  escapeRegNumberExp,
  inputRegex,
  isSui,
  normalizeInput,
} from '../Swap/utils'
import { SUI } from '../Swap/state'
import { useRouter } from 'next/router'
import { generateXPostLink } from './utils'
import { Skeleton } from '@mui/material'
import { isNumber } from 'lodash'

const StyledProfit = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: flex-start;

  flex-direction: column;
  background: center center / cover rgba(23, 37, 52, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 10px;
  min-width: 300px;
`

const Header = styled(Flex)`
  width: 100%;
  height: 46px;
  justify-content: center;
  gap: 10px;
`

const IconWrap = styled(Flex)`
  height: 100%;
  padding: 6px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  gap: 5px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  &:hover {
    transform: scale(1.03);
  }
`

const Body = styled(Flex)`
  justify-content: center;
  height: 100%;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

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
`

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  background-color: none;
  background: none;
  color: #b8b6b6;
  text-align: center;

  &::placeholder {
    color: #b8b6b644;
  }
`

const SelectBtn = styled(Flex)<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 5px;
  width: 100%;
  border-radius: 8px;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.01);
  }
`

const Profit: FC<{
  profit: number
  marketCapRatio: number
  initAmount: number
  targetAmount: number
  targetPrice: number
}> = ({ profit, marketCapRatio, targetAmount, initAmount, targetPrice }) => {
  const {
    mkcOfState: { amount, amountIn, baseToken, quoteToken },
    setMkcOfstate,
  } = useManageMkcOf()

  const enforcer = (nextUserInput: string) => {
    const escapedInput = escapeRegNumberExp(nextUserInput)

    if (nextUserInput === '' || inputRegex.test(escapedInput)) {
      const rawValue = normalizeInput(nextUserInput)
      setMkcOfstate((p) => ({ ...p, amount: Number(rawValue) }))
    }
  }

  const { push } = useRouter()

  const onBuyClick = useCallback(() => {
    if (isSui(baseToken?.address || '')) {
      push(`/swap`)
    } else {
      push(
        `/swap?inputCurrencyId=${SUI.address}&outputCurrencyId=${baseToken?.address}`
      )
    }
  }, [push, baseToken])

  const onShare = useCallback(() => {
    const times = marketCapRatio?.toLocaleString(undefined, {
      maximumFractionDigits: 3,
    })

    const formatTargetPrice = formatToSignificantDigits(
      Number(targetPrice) || 0
    )

    const text = `If ${baseToken?.symbol.toUpperCase()} reaches ${quoteToken?.symbol.toUpperCase()}'s current market cap, its price would be $${formatTargetPrice}. That makes ${times}x !`

    const hashtags = [
      'MarketCapOfBUBO',
      baseToken?.symbol.toUpperCase(),
      quoteToken?.symbol.toUpperCase(),
    ]

    const XLink = generateXPostLink({
      url: 'https://www.bubbo.fun/marketcapof',
      text,
      hashtags,
    })

    window.open(XLink)
  }, [push, baseToken, quoteToken, marketCapRatio, targetPrice])

  return (
    <StyledProfit>
      <Header>
        <IconWrap onClick={onShare}>
          <XIcon
            height={20}
            width={20}
            fill="#fff"
          />
          <Text>Share</Text>
        </IconWrap>

        <IconWrap onClick={onBuyClick}>
          <SwapHorizIcon
            sx={{
              color: '#fff',
              height: '20px',
              width: '20px',
            }}
          />
          <Text>Trade</Text>
        </IconWrap>
      </Header>

      <Body>
        {!marketCapRatio ? (
          <Flex
            flexDirection="column"
            style={{ gap: '10px' }}
          >
            <Skeleton
              height={30}
              width={200}
            />
            <Skeleton
              height={30}
              width={200}
            />
            <Skeleton
              height={30}
              width={200}
            />
          </Flex>
        ) : (
          <>
            <Flex
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text>Starting Amount:</Text>

              <Flex
                alignItems="center"
                ml="5px"
              >
                <Text>
                  $
                  {initAmount > 1
                    ? formatNumber(initAmount)
                    : formatToSignificantDigits(Number(initAmount) || 0)}
                </Text>
              </Flex>
            </Flex>
            <Flex
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text>Target Amount:</Text>

              <Flex
                alignItems="center"
                ml="5px"
              >
                <Text>
                  $
                  {targetAmount > 1
                    ? formatNumber(targetAmount)
                    : formatToSignificantDigits(Number(targetAmount) || 0)}
                </Text>
              </Flex>
            </Flex>
            <Flex
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text>Profit:</Text>

              <Flex
                alignItems="center"
                ml="5px"
              >
                <Text>
                  {profit > 1
                    ? formatNumber(profit)
                    : formatToSignificantDigits(Number(profit) || 0)}
                  $
                </Text>

                <Text
                  color={
                    Number(marketCapRatio) >= 1
                      ? 'rgb(61, 187, 154)'
                      : '#ff5858'
                  }
                  ml="5px"
                  fontSize="14px"
                >
                  (
                  {marketCapRatio?.toLocaleString(undefined, {
                    maximumFractionDigits: 3,
                  })}
                  x)
                </Text>
              </Flex>
            </Flex>
          </>
        )}
      </Body>

      <Flex
        mb="5px"
        style={{
          gap: '5px',
        }}
        width="100%"
      >
        <SelectBtn
          $isActive={amountIn === AmountIn.TOKEN}
          onClick={() => {
            setMkcOfstate((p) => ({ ...p, amountIn: AmountIn.TOKEN }))
          }}
        >
          <Text textTransform="uppercase">{baseToken?.symbol}</Text>
        </SelectBtn>
        <SelectBtn
          $isActive={amountIn === AmountIn.USD}
          onClick={() => {
            setMkcOfstate((p) => ({ ...p, amountIn: AmountIn.USD }))
          }}
        >
          <Text>USD</Text>
        </SelectBtn>
      </Flex>
      <InputWrap>
        <Input
          placeholder="Enter Amount"
          value={displayValueFormatted(amount)}
          onChange={(e) => {
            enforcer(e.target.value)
          }}
        />
      </InputWrap>
    </StyledProfit>
  )
}

export default Profit
