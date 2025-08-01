import React, { FC, useMemo } from 'react'
import styled, { css } from 'styled-components'
import Flex from '../commonStyled/Flex'
import { useSwapActionState } from './state/swapActionState'
import { QuoteResponse } from '@7kprotocol/sdk-ts'
import { isEmpty } from 'lodash'
import { useConnectWallet, useCurrentWallet } from '@mysten/dapp-kit'
import ConnectWalletButton from '../ConnectWalletButton'
import Box from '../commonStyled/Box'

const ExcuteBtn = styled(Flex)<{ $disable: boolean }>`
  width: 100%;
  align-items: center;
  border: 0px;
  border-radius: 8px;
  background-color: #3dbb9a;
  height: 48px;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  &:hover {
    transform: scale(1.005);
    opacity: 0.9;
  }
  margin-top: 8px;
  color: #fff;

  ${({ $disable }) =>
    $disable &&
    css`
      background-color: #252f39;
      cursor: default;
      color: #788791;

      &:hover {
        transform: scale(1);
        opacity: 1;
      }
    `}
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

const ExcuteButton: FC<{
  isLoading: boolean
  excuteSwap: () => void
  value: string
  currencyBalance: string
  quoteResponse: QuoteResponse | undefined | null
  quoteError: any
}> = ({
  excuteSwap,
  isLoading,
  currencyBalance,
  value: inputValue,
  quoteResponse,
  quoteError,
}) => {
  const {
    swapActionState: { showConfirmModal },
    setSwapActionstate,
  } = useSwapActionState()

  const { isConnected } = useCurrentWallet()

  const isDisable = useMemo(() => {
    return (
      isLoading ||
      quoteError ||
      !Number(inputValue) ||
      Number(inputValue) > Number(currencyBalance) ||
      !quoteResponse ||
      !quoteResponse?.returnAmount ||
      isEmpty(quoteResponse?.routes)
    )
  }, [isLoading, inputValue, currencyBalance, quoteResponse])

  const isInsufficient = Number(inputValue) > Number(currencyBalance)

  const onSwap = () => {
    if (!isDisable && !showConfirmModal) {
      setSwapActionstate((p) => ({
        ...p,
        showConfirmModal: true,
        attemptingTxn: true,
      }))
      excuteSwap()
    }
  }

  if (!isConnected) {
    return (
      <Box mt="8px">
        <ConnectWalletButton />
      </Box>
    )
  }

  if (Number(inputValue) === 0 || !inputValue) {
    return <ExcuteBtn $disable={true}>Enter an amount</ExcuteBtn>
  }

  if (quoteError) {
    return <ExcuteBtn $disable={true}>Error when fetch quote</ExcuteBtn>
  }

  if (quoteResponse && isEmpty(quoteResponse?.routes)) {
    return <ExcuteBtn $disable={true}>No route available</ExcuteBtn>
  }

  if (isInsufficient) {
    return <ExcuteBtn $disable={true}>Insufficient amount</ExcuteBtn>
  }

  if (isLoading || (Boolean(Number(inputValue || 0)) && !quoteResponse)) {
    return (
      <ExcuteBtn $disable={true}>
        <Dots>Loading</Dots>
      </ExcuteBtn>
    )
  }

  if (showConfirmModal) {
    return (
      <ExcuteBtn $disable={false}>
        <Dots>Confirm in wallet</Dots>
      </ExcuteBtn>
    )
  }

  return (
    <>
      <ExcuteBtn
        $disable={isDisable}
        onClick={onSwap}
      >
        Swap
      </ExcuteBtn>
    </>
  )
}

export default ExcuteButton
