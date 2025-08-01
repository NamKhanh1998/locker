import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import React, { FC, useCallback } from 'react'
import styled from 'styled-components'
import { CoingeckoCoinData } from '../Bubbles/data.type'
import Box from '../commonStyled/Box'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import TokenLogo from '../TokenLogo'
import { formatNumber, formatToSignificantDigits } from '../utils'
import { Columns, TableColWidth } from './config'
import { formatPercent, getChangeColor } from './utils'
import { IOptions, SortBy, SortDirection } from './type'
import TableLoading from './TableLoading'
import { useManageSelectedToken } from '../Bubbles/hooks/useManageSelectedToken'
import { isSui } from '../Swap/utils'
import { useRouter } from 'next/router'
import { SUI } from '../Swap/state'
import { useManageOptions } from '../Bubbles/hooks/useManageOptions'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'

const Scrollable = styled(Box)`
  &::-webkit-scrollbar {
    display: none;
  }

  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
`

const StyledTable = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  height: 100%;
  width: 100%;
`

const TableHeader = styled.thead`
  width: 100%;
  height: 30px;
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.2);
  border-top: 0.1px solid rgba(255, 255, 255, 0.2);
`

const Tr = styled.tr`
  display: table;
  table-layout: fixed;
  cursor: pointer;
  width: 100%;
`

const BodyTr = styled.tr`
  display: table;
  table-layout: fixed;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const IconWrap = styled(Box)<{
  $active: boolean
}>`
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(0)')};
  height: 16px;
`

const Th = styled.td<{
  width?: number
  hoverDisable?: boolean
  pr?: number
  pl?: number
  active?: boolean
}>`
  color: rgb(156, 163, 175);
  font-size: 14px;

  height: 30px;
  text-align: center;
  vertical-align: middle;
  padding: 10px 0;
  width: ${({ width }) => (width ? width : '')}px;

  background-color: ${({ active }) => (active ? '#595c7a' : '')};
  border-bottom: 2px solid
    ${({ active }) => (active ? '#d5c5ff' : 'transparent')};

  &:hover {
    transition: all 0.3s;
    background-color: ${({ hoverDisable }) =>
      !hoverDisable ? 'rgba(255, 255, 255, 0.05);' : ''};
  }

  &:hover ${IconWrap} {
    transform: scale(1);
  }

  padding-right: ${({ pr }) => (pr ? pr : 0)}px;
  padding-left: ${({ pl }) => (pl ? pl : 0)}px;
`

const SortWrap = styled(Flex)`
  margin-right: 5px;
  margin-top: 2px;
`

const TableBody = styled.tbody`
  overflow: auto;
  display: block;
`

const Td = styled.td<{ width?: number; pr?: number; pl?: number }>`
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  padding: 10px 0;
  height: 53px;
  width: ${({ width }) => (width ? width : '')}px;
  padding-right: ${({ pr }) => (pr ? pr : 0)}px;
  padding-left: ${({ pl }) => (pl ? pl : 0)}px;
`

const TradeButton = styled(Flex)`
  transition: all 0.2;
  padding: 6px;
  border-radius: 6px;
  &:hover {
    transform: scale(1.05);
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const TableContent: FC<{
  data: CoingeckoCoinData[]
  options: IOptions
  setOptions: React.Dispatch<React.SetStateAction<IOptions>>
  isLoading: boolean
}> = ({ data, options, setOptions, isLoading }) => {
  const { setSelectedToken } = useManageSelectedToken()

  const {
    options: { chain },
  } = useManageOptions()

  const { push } = useRouter()

  const onSort = (sortBy: SortBy) => {
    if (!options.sortBy || options.sortBy !== sortBy) {
      setOptions((p) => ({
        ...p,
        sortBy: sortBy,
        sortDirection: SortDirection.DESC,
      }))
    } else if (
      options.sortBy === sortBy &&
      options.sortDirection === SortDirection.ASC
    ) {
      setOptions((p) => ({
        ...p,
        sortBy: null,
        sortDirection: SortDirection.DESC,
      }))
    } else if (
      options.sortBy === sortBy &&
      options.sortDirection === SortDirection.DESC
    ) {
      setOptions((p) => ({ ...p, sortDirection: SortDirection.ASC }))
    }
  }

  const onBuyClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      token: CoingeckoCoinData
    ) => {
      e.stopPropagation()

      if (isSui(token?.address || '')) {
        push(`/swap`)
      } else {
        push(
          `/swap?inputCurrencyId=${SUI.address}&outputCurrencyId=${token?.address}`
        )
      }

      setSelectedToken({ selectedToken: null })
    },
    [push, setSelectedToken]
  )

  return (
    <Scrollable>
      <StyledTable suppressHydrationWarning>
        <TableHeader>
          <Tr>
            {Columns.map((item, index) => (
              <Th
                width={item.width}
                pr={item.paddingRight}
                pl={item.paddingLeft || 0}
                hoverDisable={item.hoverDisable}
                key={item.name}
                style={{ cursor: item.hoverDisable ? 'default' : 'pointer' }}
                onClick={() => {
                  if (item?.sortBy) {
                    onSort(item?.sortBy)
                  }
                }}
              >
                <Flex justifyContent={item.justifyContent}>
                  {!item?.hoverDisable && (
                    <SortWrap alignItems="center">
                      <IconWrap
                        $active={
                          Boolean(options.sortBy) &&
                          options.sortBy === item.sortBy
                        }
                      >
                        {options?.sortDirection === SortDirection.DESC ? (
                          <ArrowDownwardIcon
                            sx={{
                              height: '14px',
                              width: '14px',
                              color: '#8d8b8b',
                            }}
                          />
                        ) : (
                          <ArrowUpwardIcon
                            sx={{
                              height: '14px',
                              width: '14px',
                              color: '#8d8b8b',
                            }}
                          />
                        )}
                      </IconWrap>
                    </SortWrap>
                  )}
                  <Text fontSize="14px">{item.name}</Text>
                </Flex>
              </Th>
            ))}
          </Tr>
        </TableHeader>

        {isLoading ? (
          <TableLoading />
        ) : (
          <TableBody>
            {data?.map((token: CoingeckoCoinData) => {
              return (
                <BodyTr
                  key={token.address}
                  onClick={() => setSelectedToken({ selectedToken: token })}
                >
                  <Td width={TableColWidth.name}>
                    <Flex
                      pl="10px"
                      alignItems="center"
                    >
                      <TokenLogo
                        address={token.pairAddress}
                        chain={chain}
                      />

                      <Flex
                        flexDirection="column"
                        alignItems="flex-start"
                        ml="5px"
                      >
                        <Text
                          lineHeight={1}
                          textTransform="uppercase"
                          fontSize="14px"
                          mb="5px"
                        >
                          {token.symbol}
                        </Text>
                        <Text
                          maxWidth={130}
                          ellipsis
                          lineHeight={1}
                          fontSize="12px"
                          color="rgb(184, 173, 210)"
                        >
                          {token.name}
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.price}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text fontSize="14px">
                        {formatToSignificantDigits(Number(token?.price) || 0)}
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.mkc}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text fontSize="14px">
                        {formatNumber(token?.marketCap || 0)}
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.liquidity}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text fontSize="14px">
                        {formatNumber(token?.totalLiquidity || 0)}
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.vol}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text fontSize="14px">
                        {formatNumber(token?.volume || 0)}
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.changePercent}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text
                        color={getChangeColor(token?.h1)}
                        fontSize="14px"
                      >
                        {formatPercent(token?.h1)}%
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.changePercent}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text
                        color={getChangeColor(token?.h6)}
                        fontSize="14px"
                      >
                        {formatPercent(token?.h6)}%
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.changePercent}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text
                        color={getChangeColor(token?.h24)}
                        fontSize="14px"
                      >
                        {formatPercent(token?.h24)}%
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.changePercent}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text
                        color={getChangeColor(token?.week)}
                        fontSize="14px"
                      >
                        {formatPercent(token?.week)}%
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.changePercent}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text
                        color={getChangeColor(token?.month)}
                        fontSize="14px"
                      >
                        {formatPercent(token?.month)}%
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.changePercent}>
                    <Flex
                      pr="8px"
                      justifyContent="flex-end"
                    >
                      <Text
                        color={getChangeColor(token?.year)}
                        fontSize="14px"
                      >
                        {formatPercent(token?.year)}%
                      </Text>
                    </Flex>
                  </Td>
                  <Td width={TableColWidth.action}>
                    <Flex justifyContent="center">
                      <TradeButton onClick={(e) => onBuyClick(e, token)}>
                        <SwapHorizIcon
                          sx={{
                            height: '20px',
                            width: '20px',
                            color: '#8d8b8b',
                          }}
                        />
                      </TradeButton>
                    </Flex>
                  </Td>
                </BodyTr>
              )
            })}
          </TableBody>
        )}
      </StyledTable>
    </Scrollable>
  )
}

export default React.memo(TableContent)
