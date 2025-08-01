import styled, { css } from 'styled-components'
import { ColAlign, ColWidth, HeadersItem } from './config'
import { useFetchTrendingCoins } from './hooks/useFetchTrendingCoins'
import { TabType, TokenAnalytics } from './type'
import Text from '../commonStyled/Text'
import Flex from '../commonStyled/Flex'
import TokenLogo from '../TokenLogo'
import Address from './Address'
import { formatNumber, formatPrice, getTimeAgo } from '../utils'
import { formatPercent } from '../Radar/utils'
import QuickBuyIcon from '../icons/QuickBuyIcon'
import SuiIcon from '../icons/SuiIcon'
import ProgressBar from './ProgressBar'
import Box from '../commonStyled/Box'
import LogoLoading from '../Loading/LoadingLogo'
import { FC } from 'react'
import { useFetchNewCoins } from './hooks/useFetchNewCoins'
import QuickBuyConnect from './QuickBuyConnect'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { useQuickBuyAmount } from './hooks/useQuickBuyAmount'
import { useQuickBuy } from './hooks/useQuickBuy'
import SpinLoading from '../SpinLoading'
import { Field, ICurrency, SUI, useSwapActionHandler } from '../Swap/state'
import { useRouter } from 'next/router'

const TableContainer = styled.div`
  width: 100%;
  height: calc(100vh - 171px);
  overflow: auto;
  background-color: #000;
`

const StyledTableComponent = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 800px;
`

const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  z-index: 2;
  background: #222222ba;
`

const HeaderCell = styled.th<{
  isFirst?: boolean
  width: number
  align?: string
}>`
  padding: 12px 16px;
  text-align: ${({ align }) => (align ? align : 'right')};
  color: #bebebe;
  background: #1b1b1b;
  font-size: 14px;
  font-weight: 500;
  width: ${({ width }) => width}px;
  min-width: ${({ width }) => width}px;

  ${(props) =>
    props.isFirst &&
    `
    position: sticky;
    left: 0;
    z-index: 1;
    
  `}
`

const TableBody = styled.tbody`
  background-color: #000;
`

const TableCell = styled.td<{
  isFirst?: boolean
  align?: string
  width: number
}>`
  padding: 12px 16px;
  text-align: ${({ align }) => (align ? align : 'right')};
  width: ${({ width }) => width}px;
  min-width: ${({ width }) => width}px;

  ${(props) =>
    props.isFirst &&
    `
    background-color: #000;
    position: sticky;
    left: 0;
    font-weight: 500;
    z-index: 1;
  `}
`

const TableRow = styled.tr`
  background-color: #000;
  cursor: pointer;
  &:hover {
    background-color: #282828;
  }

  &:hover > ${TableCell} {
    background-color: #282828;
  }
`

const RowText = styled(Text)`
  font-size: 14px;
  font-weight: 500;
`

const Percent = styled(Text)<{
  $up: boolean
  $neutral?: boolean
}>`
  font-size: 14px;
  font-weight: 500;
  color: ${({ $up, $neutral }) => {
    if ($neutral) return '#bebebe'
    return $up ? '#46e754' : '#fe3a3a'
  }};
`

const Rank = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
  width: 30px;
`

const QuickBuyBtn = styled(Flex)<{ $disable?: boolean }>`
  padding: 6px 8px;
  border-radius: 8px;
  color: #3dbb99;
  background-color: #3dbb9913;
  border: 1.5px solid #3dbb99;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  ${({ $disable }) =>
    $disable
      ? css`
          background-color: #3dbb9913;
          border: 1px solid #4d766b;
          opacity: 0.5;
          cursor: default;
        `
      : ''}
`

const TrendingTable: FC<{
  tab: TabType
}> = ({ tab }) => {
  const currentAccount = useCurrentAccount()
  const {
    data: { amount },
  } = useQuickBuyAmount()

  const { coins, isLoading } = useFetchTrendingCoins(tab === TabType.TRENDING)
  const { coins: newCoins, isLoading: newCoinsLoading } = useFetchNewCoins(
    tab === TabType.New
  )

  const { onQuickBuy, attemptingTxn, buyingToken } = useQuickBuy()

  const { push } = useRouter()

  const { onSelectCurrency } = useSwapActionHandler()

  const onNavigateSwap = (token: ICurrency) => {
    if (!token) return

    push(
      `/swap?inputCurrencyId=${SUI.address}&outputCurrencyId=${token?.address}`
    )
    onSelectCurrency(Field.INPUT, SUI)
    onSelectCurrency(Field.OUTPUT, token)
  }

  return (
    <>
      {isLoading || newCoinsLoading ? (
        <LogoLoading />
      ) : (
        <TableContainer>
          <StyledTableComponent>
            <TableHeader>
              <tr>
                {HeadersItem?.map((item) => (
                  <HeaderCell
                    align={item?.align}
                    width={item.width}
                    key={item.name}
                    isFirst={item?.isFirst}
                  >
                    {item.name}
                  </HeaderCell>
                ))}
              </tr>
            </TableHeader>

            <TableBody>
              {(tab === TabType.TRENDING ? coins : newCoins)?.map(
                (coin: TokenAnalytics, i: number) => (
                  <TableRow
                    key={coin.coin}
                    onClick={() => {
                      onNavigateSwap({
                        symbol: coin?.coinMetadata?.symbol,
                        name: coin?.coinMetadata?.name,
                        decimals: Number(coin?.coinMetadata?.decimals),
                        address: coin?.coinMetadata?.coinType,
                        coingeckoId: '',
                        pairAddress: '',
                        website: '',
                        telegram: '',
                        twitter: '',
                        logoUrl: coin?.coinMetadata?.iconUrl,
                      })
                    }}
                  >
                    <TableCell
                      isFirst
                      align={ColAlign.name}
                      width={ColWidth.name}
                    >
                      <Flex
                        width="100%"
                        alignItems="center"
                      >
                        <Rank>
                          <Text
                            fontSize="12px"
                            fontWeight={600}
                            color="#f90"
                          >
                            #{i + 1}
                          </Text>
                        </Rank>
                        <TokenLogo
                          url={coin.coinMetadata.iconUrl}
                          address=""
                        />

                        <Flex
                          flexDirection="column"
                          ml="5px"
                        >
                          <RowText>{coin.coinMetadata.symbol}</RowText>
                          <Address coinType={coin?.coinMetadata?.coinType} />
                        </Flex>
                      </Flex>
                    </TableCell>

                    <TableCell
                      align={ColAlign.price}
                      width={ColWidth.price}
                    >
                      <RowText>{formatPrice(+coin?.coinPrice)}</RowText>
                    </TableCell>

                    <TableCell
                      align={ColAlign.change}
                      width={ColWidth.change}
                    >
                      <Percent
                        $neutral={Number(coin?.percentagePriceChange1h) === 0}
                        $up={Number(coin?.percentagePriceChange1h) > 0}
                      >
                        {formatPercent(+coin?.percentagePriceChange1h)}%
                      </Percent>
                    </TableCell>

                    <TableCell
                      align={ColAlign.change}
                      width={ColWidth.change}
                    >
                      <Percent
                        $neutral={Number(coin?.percentagePriceChange6h) === 0}
                        $up={Number(coin?.percentagePriceChange6h) > 0}
                      >
                        {formatPercent(+coin?.percentagePriceChange6h)}%
                      </Percent>
                    </TableCell>
                    <TableCell
                      align={ColAlign.change}
                      width={ColWidth.change}
                    >
                      <Percent
                        $neutral={Number(coin?.percentagePriceChange24h) === 0}
                        $up={Number(coin?.percentagePriceChange24h) > 0}
                      >
                        {formatPercent(+coin?.percentagePriceChange24h)}%
                      </Percent>
                    </TableCell>
                    <TableCell
                      align={ColAlign.volume}
                      width={ColWidth.volume}
                    >
                      <RowText>{formatNumber(+coin?.volume6h)}</RowText>
                      <Flex
                        width="100%"
                        justifyContent="flex-end"
                      >
                        <Box width="70%">
                          <ProgressBar
                            greenPercentage={Number(coin?.buyVolume6h || 0)}
                            redPercentage={Number(coin?.sellVolume6h || 0)}
                          />
                        </Box>
                      </Flex>
                    </TableCell>
                    <TableCell
                      align={ColAlign.volume}
                      width={ColWidth.volume}
                    >
                      <RowText>{formatNumber(+coin?.volume24h)}</RowText>
                      <Flex
                        width="100%"
                        justifyContent="flex-end"
                      >
                        <Box width="70%">
                          <ProgressBar
                            greenPercentage={Number(coin?.buyVolume24h || 0)}
                            redPercentage={Number(coin?.buyVolume24h || 0)}
                          />
                        </Box>
                      </Flex>
                    </TableCell>
                    <TableCell
                      align={ColAlign.mkc}
                      width={ColWidth.mkc}
                    >
                      <RowText>{formatNumber(+coin?.marketCap)}</RowText>
                    </TableCell>
                    <TableCell
                      align={ColAlign.liquidity}
                      width={ColWidth.liquidity}
                    >
                      <RowText>
                        {formatNumber(+coin?.totalLiquidityUsd)}
                      </RowText>
                    </TableCell>
                    <TableCell
                      align={ColAlign.age}
                      width={ColWidth.age}
                    >
                      <RowText>{getTimeAgo(+coin?.timeCreated)}</RowText>
                    </TableCell>

                    <TableCell
                      align={ColAlign.top10}
                      width={ColWidth.top10}
                    >
                      <RowText>
                        {formatPercent(+coin?.top10HolderPercentage)}%
                      </RowText>
                    </TableCell>

                    <TableCell
                      align={ColAlign.top10}
                      width={ColWidth.top10}
                    >
                      <RowText>
                        {formatPercent(+coin?.coinDevHoldingsPercentage)}%
                      </RowText>
                    </TableCell>

                    <TableCell
                      align={ColAlign.quickBuy}
                      width={ColWidth.quickBuy}
                    >
                      <Flex
                        width="100%"
                        justifyContent="flex-end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {!!currentAccount?.address ? (
                          <QuickBuyBtn
                            onClick={(e) => {
                              e.stopPropagation()
                              if (!attemptingTxn) {
                                onQuickBuy(coin.coinMetadata.coinType)
                              }
                            }}
                            $disable={attemptingTxn}
                          >
                            <QuickBuyIcon />
                            {attemptingTxn &&
                            buyingToken === coin.coinMetadata.coinType ? (
                              <Box mr="3px">
                                <SpinLoading
                                  strokeW={1}
                                  height={14}
                                  width={14}
                                />
                              </Box>
                            ) : (
                              <Text
                                fontSize="12px"
                                color="#3dbb99"
                                fontWeight={600}
                                mr="3px"
                              >
                                {amount}
                              </Text>
                            )}

                            <SuiIcon
                              height={12}
                              width={12}
                              fill="#3dbb99"
                            />
                          </QuickBuyBtn>
                        ) : (
                          <QuickBuyConnect>
                            <QuickBuyBtn>
                              <QuickBuyIcon />
                              <Text
                                fontSize="12px"
                                color="#3dbb99"
                                fontWeight={600}
                                mr="3px"
                              >
                                {amount}
                              </Text>
                              <SuiIcon
                                height={12}
                                width={12}
                                fill="#3dbb99"
                              />
                            </QuickBuyBtn>
                          </QuickBuyConnect>
                        )}
                      </Flex>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </StyledTableComponent>
        </TableContainer>
      )}
    </>
  )
}

export default TrendingTable
