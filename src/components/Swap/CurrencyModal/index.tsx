import Flex from '@/components/commonStyled/Flex'
import Text from '@/components/commonStyled/Text'
import ModalV2 from '@/components/ModalV2'
import { ModalContainer } from '@/components/ModalV2/styles'
import { devices } from '@/config'
import React, { FC, useCallback, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@/components/icons/SearchIcon'
import TokenLogo from '@/components/TokenLogo'
import {
  Field,
  ICurrency,
  SearchNarrative,
  useSwapActionHandler,
  useSwapState,
} from '../state'
import useDebounce from '@/hooks/useDebounce'
import { displayValueFormatted, filterTokens, isSuiTokenType } from '../utils'
import { useCombineTokenListWithBalances } from '../hooks/useCombineTokenListWithBalances'
import { displayBalanceValue, getBalanceValue } from '../utils/bigNumber'
import { CommonTokensArr } from '../config/commonList'
import TokenDetailModal from '../TokenDetailModal'
import InfoIcon from '@/components/icons/InfoIcon'
import TrendingIcon from '@/components/icons/TrendingIcon'
import { isEmpty, isNumber, size } from 'lodash'
import {
  useManageImportToken,
  useTokensImport,
} from '../hooks/useManageImportToken'
import ImportRow from './ImportRow'
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom'
import Box from '@/components/commonStyled/Box'

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  max-width: calc(100vw - 10px) !important;
  padding-bottom: 16px;

  @media ${devices.mobileL} {
    max-width: 460px !important;
  }
`

const ModalHeader = styled(Flex)`
  padding: 16px;
  width: 100%;
  justify-content: space-between;
`

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
`

const IconWrap = styled(Flex)`
  border-radius: 50%;
  padding: 0 5px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover > svg {
    fill: #fff;
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

const Body = styled(Flex)`
  width: 100%;
  padding: 16px;
  padding-top: 0px;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`

const SearchWrap = styled(Flex)`
  border-radius: 15px;
  padding: 10px;
  border: 1px solid transparent;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  gap: 4px;
  align-items: center;
  transition: all 0.2s;
  &:focus-within {
    border: 1px solid #3dbb9a;
  }
`
const Input = styled.input`
  width: 100%;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;
  background-color: transparent;
  transition: all 0.2s;

  ::placeholder {
    color: #5454548f;
  }
`

const CommonTokens = styled(Flex)`
  width: 100%;
  justify-content: space-around;
  margin-top: 12px;
  flex-wrap: wrap;
  gap: 8px;
`

const Common = styled(Flex)<{ $isSelected: boolean }>`
  padding: 4px 12px;
  color: #fff;
  border-radius: 16px;
  cursor: pointer;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  width: 30%;
  justify-content: center;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
    `}

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const TokenList = styled(Flex)`
  width: 100%;

  padding: 16px 8px;
  flex-direction: column;
  height: calc(80vh - 270px);
  overflow-y: auto;
  gap: 2px;
  padding-bottom: 0px;
  padding-top: 0px;

  @media ${devices.mobileL} {
    height: 465px;
  }
`

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

const FilterItem = styled(Flex)<{ $isSelected: boolean; $isDisable?: boolean }>`
  padding: 4px 12px;
  color: #fff;
  border-radius: 16px;
  cursor: pointer;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
  width: 30%;
  justify-content: center;
  border: 1px solid rgba(106, 105, 105, 0.1);
  background-color: transparent;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border: 1px solid rgba(255, 255, 255, 0.1);
      background-color: rgba(255, 255, 255, 0.05);
    `}

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  ${({ $isDisable }) =>
    $isDisable &&
    css`
      border: 1px solid rgba(106, 105, 105, 0.1);
      background-color: transparent;
      cursor: default;
      &:hover {
        background-color: transparent;
      }
    `}
`

const Filters = styled(Flex)`
  width: 100%;
  padding: 16px;
  justify-content: space-between;
`

const narratives = [
  { name: 'Trending', value: SearchNarrative.TRENDING },
  { name: 'Default', value: SearchNarrative.DEFAULT },
  { name: 'Meme', value: SearchNarrative.MEME },
]

export const CurrencyModal: FC<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  field: Field
}> = ({ open, setOpen, field }) => {
  const { tokenListWithBalance, trendingListWithBalance } =
    useCombineTokenListWithBalances()

  const [searchValue, setSearchValue] = useState('')
  const [narrative, setNarrative] = useState<SearchNarrative>(
    SearchNarrative.DEFAULT
  )

  const { onSelectCurrency } = useSwapActionHandler()
  const {
    swapState: { inputCurrency, outputCurrency },
  } = useSwapState()

  const onSelect = useCallback(
    (currency: ICurrency) => {
      onSelectCurrency(field, currency)
      setOpen(false)
      setSearchValue('')
    },
    [onSelectCurrency, field]
  )

  const selectedToken = useMemo(() => {
    return field === Field.INPUT ? inputCurrency : outputCurrency
  }, [inputCurrency, outputCurrency, field])

  const debounceQuery = useDebounce(searchValue, 300)

  const filteredList = useMemo(() => {
    let modifyList =
      narrative === SearchNarrative.TRENDING
        ? trendingListWithBalance
        : tokenListWithBalance

    if (narrative === SearchNarrative.MEME) {
      modifyList = modifyList?.filter((_) =>
        _?.narratives?.includes(SearchNarrative.MEME)
      )
    }

    if (!debounceQuery) return modifyList

    return filterTokens(modifyList, debounceQuery)
  }, [debounceQuery, tokenListWithBalance, narrative, trendingListWithBalance])

  const [tokenDetail, setTokenDetail] = useState<ICurrency | null>(null)

  const onInfoClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>, token: ICurrency) => {
      event.preventDefault()
      event.stopPropagation()

      setTokenDetail(token)
    },
    []
  )

  const onSelectNarrative = useCallback(
    (narrative: SearchNarrative) => {
      if (narrative === SearchNarrative.TRENDING) {
        if (size(trendingListWithBalance)) {
          setNarrative(narrative)
        }
      } else {
        setNarrative(narrative)
      }
    },
    [trendingListWithBalance]
  )

  // import tokens

  const { fetchedToken } = useManageImportToken(
    debounceQuery,
    isEmpty(filteredList) && isSuiTokenType(debounceQuery?.trim())
  )

  const { onImportToken } = useTokensImport()

  const isShowImport = useMemo(() => {
    return (
      isSuiTokenType(debounceQuery?.trim()) &&
      isEmpty(filteredList) &&
      !!fetchedToken &&
      isNumber(fetchedToken?.decimals) &&
      !!fetchedToken?.symbol &&
      (narrative === SearchNarrative.DEFAULT ||
        narrative === SearchNarrative.MEME)
    )
  }, [debounceQuery, filteredList, fetchedToken, narrative])

  const onModalClose = () => {
    setOpen(false)
    setNarrative(SearchNarrative.DEFAULT)
    setSearchValue('')
  }

  const handleImportToken = useCallback(() => {
    if (isShowImport) {
      onSelect(fetchedToken as ICurrency)
      onImportToken(fetchedToken as ICurrency)
      onModalClose()
    }
  }, [fetchedToken, isShowImport, onImportToken, onSelect, onModalClose])

  return (
    <>
      <ModalV2
        open={open}
        callBack={onModalClose}
      >
        <StyledModalContainer
          $minHeight="300px"
          $positionBottomOnMb
        >
          <ModalHeader>
            <Title>Select a Token</Title>

            <IconWrap onClick={onModalClose}>
              <CloseIcon
                sx={{
                  color: 'rgb(116, 116, 116)',
                  height: '20px',
                  width: '20px',
                }}
              />
            </IconWrap>
          </ModalHeader>

          <Body>
            <SearchWrap>
              <SearchIcon fill="#fff" />
              <Input
                placeholder="Search token name, symbol or type"
                spellCheck={false}
                value={searchValue}
                onChange={(e) => setSearchValue(e?.target?.value)}
              />
            </SearchWrap>

            <CommonTokens>
              {CommonTokensArr?.map((token) => {
                const isTokenSelected =
                  selectedToken?.address === token?.address

                return (
                  <Common
                    onClick={() => onSelect(token)}
                    $isSelected={isTokenSelected}
                  >
                    <TokenLogo
                      address={token?.pairAddress}
                      height={24}
                      width={24}
                    />

                    <Text textTransform="uppercase">{token.symbol}</Text>
                  </Common>
                )
              })}
            </CommonTokens>
          </Body>
          <Filters>
            {narratives?.map((n) => (
              <FilterItem
                key={n.value}
                $isSelected={n.value === narrative}
                onClick={() => onSelectNarrative(n.value)}
                $isDisable={
                  n.value === SearchNarrative.TRENDING &&
                  isEmpty(trendingListWithBalance)
                }
              >
                {n.value === SearchNarrative.TRENDING && <TrendingIcon />}
                <Text
                  fontSize="14px"
                  color={n.value === narrative ? '#fff' : '#8f8e8e'}
                >
                  {n.name}
                </Text>
              </FilterItem>
            ))}
          </Filters>
          <TokenList>
            {isShowImport ? (
              <ImportRow
                token={fetchedToken as any}
                onImportToken={handleImportToken}
              />
            ) : (
              filteredList?.map((token, index) => (
                <CurrencyRow
                  key={token.address}
                  onClick={() => onSelect(token)}
                  $isSelected={selectedToken?.address === token?.address}
                >
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

                        {narrative === SearchNarrative.TRENDING && (
                          <Flex
                            alignItems="center"
                            ml="4px"
                          >
                            <TrendingIcon
                              height={12}
                              width={12}
                            />
                            <Text
                              mt="2px"
                              ml="3px"
                              fontWeight={600}
                              fontSize="12px"
                              color="#f90"
                            >
                              #{token?.rank}
                            </Text>
                          </Flex>
                        )}

                        {token?.import && (
                          <Box
                            ml="2px"
                            mt="2px"
                          >
                            <VerticalAlignBottomIcon
                              sx={{
                                height: '18px',
                                width: '18px',
                                color: '#b8add2',
                              }}
                            />
                          </Box>
                        )}

                        <InfoWrap
                          className="info-icon"
                          onClick={(event) => onInfoClick(event, token)}
                        >
                          <InfoIcon
                            height="18px"
                            width="18px"
                            fill="#b8add2"
                          />
                        </InfoWrap>
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

                  <Flex
                    flexDirection="column"
                    alignItems="end"
                  >
                    <Text
                      lineHeight={1}
                      textTransform="uppercase"
                    >
                      {Number(token?.balance)
                        ? displayValueFormatted(token?.balance)
                        : ''}
                    </Text>

                    <Text
                      fontSize="12px"
                      lineHeight={1}
                      color="#b8add2"
                      mt="6px"
                    >
                      {Number(token?.balance)
                        ? `${displayBalanceValue(
                            token?.balance,
                            token?.price
                          )} USD`
                        : ''}
                    </Text>
                  </Flex>
                </CurrencyRow>
              ))
            )}
          </TokenList>
        </StyledModalContainer>
      </ModalV2>

      <TokenDetailModal
        callBack={() => setTokenDetail(null)}
        tokenDetail={tokenDetail}
      />
    </>
  )
}
