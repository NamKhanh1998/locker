import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { poppins } from '@/fonts'
import InputPanel from './InputPanel'
import SwicthBtn from './SwicthBtn'
import Settings from './Settings'
import { Field, useSwapState } from './state'
import { useCombineTokenListWithBalances } from './hooks/useCombineTokenListWithBalances'
import { isEmpty } from 'lodash'
import { displayBalanceValue, getBalanceAmount } from './utils/bigNumber'
import { useSwap } from './hooks/useSwap'
import ExcuteButton from './ExcuteButton'
import ConfirmTxModal from './ConfirmTxModal'
import { useCurrencyPrice } from './hooks/useCurrencyPrice'
import DetailCard from './DetailCard'
import { AnimatePresence, motion } from 'framer-motion'
import Box from '../commonStyled/Box'
import SwapInfo from './SwapInfomation'
import BarChartIcon from '@mui/icons-material/BarChart'
import { useManageChart } from './state/chart'
import LogoLoading from '../Loading/LoadingLogo'

const Card = styled(Flex)`
  width: 100%;
  max-width: 650px;
  border-radius: 16px;
  min-height: 390px;
`

const Inner = styled(Flex)`
  min-height: 390px;
  width: 100%;
  background: rgba(23, 37, 52, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  flex-direction: column;
  justify-content: flex-start;
  background-size: cover;
  background-position: center;
`

const Header = styled(Flex)`
  width: 100%;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`

const HeaderTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
`

const Body = styled(Flex)`
  padding: 16px;
  padding-top: 0;
  width: 100%;
  gap: 8px;
  flex-direction: column;
`
const InputPanelWrap = styled(Flex)`
  width: 100%;
  flex-direction: column;
  gap: 8px;
  height: max-content;
  position: relative;
`

const MotionDiv = styled(motion.div)`
  width: 100%;
  max-width: 650px;
`

const IconWrap = styled(Flex)`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`

const SwapCard = () => {
  const {
    swapState: { inputCurrency, outputCurrency, inputValue, outputValue },
    setSwapState,
  } = useSwapState()

  const {
    balancesMap,
    refetch: refetchBalances,
    isLoading,
  } = useCombineTokenListWithBalances()

  const { inputCurrencyBalance, outputCurrencyBalance } = useMemo(() => {
    if (isEmpty(balancesMap)) {
      return {
        inputCurrencyBalance: '0',
        outputCurrencyBalance: '0',
      }
    }

    const inputCurrencyRawBalance =
      balancesMap?.[inputCurrency.address.toLowerCase()]?.totalBalance || '0'
    const outCurrencyRawBalance =
      balancesMap?.[outputCurrency.address.toLowerCase()]?.totalBalance || '0'

    const inputCurrencyBalance = getBalanceAmount(
      inputCurrencyRawBalance,
      inputCurrency.decimals
    )?.toString()
    const outputCurrencyBalance = getBalanceAmount(
      outCurrencyRawBalance,
      outputCurrency.decimals
    )?.toString()

    return {
      inputCurrencyBalance,
      outputCurrencyBalance,
    }
  }, [balancesMap, inputCurrency, outputCurrency])

  const { price: inputCurrencyPrice } = useCurrencyPrice(inputCurrency?.address)
  const { price: outputCurrencyPrice } = useCurrencyPrice(
    outputCurrency?.address
  )

  const { inputValueInUsd } = useMemo(() => {
    if (!inputValue || !inputCurrencyPrice)
      return {
        inputValueInUsd: '0',
      }

    return {
      inputValueInUsd: displayBalanceValue(
        inputValue,
        (inputCurrencyPrice || 0)?.toString()
      ),
    }
  }, [inputCurrencyPrice, inputValue])

  const { outputValueInUsd } = useMemo(() => {
    if (!outputValue || !outputCurrencyPrice)
      return {
        outputValueInUsd: '0',
      }

    return {
      outputValueInUsd: displayBalanceValue(
        outputValue,
        (outputCurrencyPrice || 0)?.toString()
      ),
    }
  }, [outputCurrencyPrice, outputValue])

  const {
    excuteSwap,
    quoteResponse,
    isLoading: quoteLoading,
    quoteError,
  } = useSwap()

  useEffect(() => {
    if (!quoteResponse || quoteLoading) return

    setSwapState((p) => ({ ...p, outputValue: quoteResponse?.returnAmount }))
  }, [quoteResponse, quoteLoading])

  const onExcuteSwap = () => {
    excuteSwap(refetchBalances)
  }

  const {
    chart: { showChart },
    setChart,
  } = useManageChart()

  return (
    <>
      {isLoading ? (
        <LogoLoading />
      ) : (
        <Flex
          width="100%"
          maxWidth="650px"
          justifyItems="center"
          alignItems="center"
          flexDirection="column"
          style={{
            gap: '10px',
          }}
        >
          <Card className={poppins.className}>
            <Inner>
              <Header>
                <HeaderTitle>Swap</HeaderTitle>

                <Flex
                  alignItems="center"
                  style={{ gap: '8px' }}
                >
                  <SwapInfo />
                  <IconWrap
                    onClick={() => {
                      setChart((p) => ({ ...p, showChart: !p.showChart }))
                    }}
                  >
                    <BarChartIcon
                      sx={{
                        color: showChart ? '#3dbb9a' : '#fff',
                        height: '28px',
                        width: '28px',
                      }}
                    />
                  </IconWrap>
                  <Settings />
                </Flex>
              </Header>

              <Body>
                <InputPanelWrap>
                  <InputPanel
                    currency={inputCurrency}
                    field={Field.INPUT}
                    value={inputValue}
                    currencyBalance={inputCurrencyBalance}
                    valueInUsd={inputValueInUsd}
                  />
                  <SwicthBtn />
                  <InputPanel
                    currency={outputCurrency}
                    field={Field.OUTPUT}
                    value={outputValue}
                    currencyBalance={outputCurrencyBalance}
                    isLoading={quoteLoading}
                    valueInUsd={outputValueInUsd}
                  />
                </InputPanelWrap>

                <ExcuteButton
                  quoteResponse={quoteResponse}
                  isLoading={quoteLoading}
                  excuteSwap={onExcuteSwap}
                  value={inputValue}
                  currencyBalance={inputCurrencyBalance}
                  quoteError={quoteError}
                />
              </Body>
            </Inner>
          </Card>

          <AnimatePresence>
            {quoteResponse ? (
              <MotionDiv
                initial={{ opacity: 0 }} // Start with opacity 0
                animate={{ opacity: 1 }} // Fade to opacity 1
                exit={{ opacity: 0 }} // Fade out when exiting
                transition={{ duration: 0.5 }} // Duration of the animation
              >
                <DetailCard quoteResponse={quoteResponse} />
              </MotionDiv>
            ) : (
              <Box height="126px" />
            )}
          </AnimatePresence>

          <ConfirmTxModal />
        </Flex>
      )}
    </>
  )
}

export default SwapCard
