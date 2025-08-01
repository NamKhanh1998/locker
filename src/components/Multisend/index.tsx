import { dropdownVariantsFromTopFast } from '@/config'
import { poppins } from '@/fonts'
import useDebounce from '@/hooks/useDebounce'
import { AnimatePresence, motion } from 'framer-motion'
import { isEmpty, size, sum, sumBy } from 'lodash'
import { Search } from 'lucide-react'
import React, { FC, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { formatAddress } from '../ConnectWallet/utils'
import SpinLoading from '../SpinLoading'
import { displayValueFormatted, filterTokens } from '../Swap/utils'
import { displayBalanceValue } from '../Swap/utils/bigNumber'
import TokenLogo from '../TokenLogo'
import { useFecthUserBalancesWithDetails } from '../UserWallet/hooks/useFecthUserBalancesWithDetails'
import Body from './Body'
import DetailCard from './DetailCard'
import {
  ICurrencyWBalance,
  useManageBulkSendState,
} from './hooks/useManageBulkSendState'
import { useCurrentAccount } from '@mysten/dapp-kit'
import ConfirmTxModal from './ConfirmTxModal'
import ExampleCsvModal from './ExampleCsvModal'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  padding-top: 90px;
`

const Inner = styled(Flex)`
  width: 100%;
  min-height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
  max-width: calc(100vw - 10px);
  gap: 20px;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 50px;
`

const Card = styled(Flex)`
  width: 100%;
  max-width: 650px;
  border-radius: 16px;
  min-height: 390px;
`

const CardInner = styled(Flex)`
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

const SearchWrap = styled(Flex)`
  position: relative;
  border-radius: 8px;
  padding: 10px;
  border: 1px solid transparent;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  transition: 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
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
  font-size: 14px;
  outline: none;
  background-color: transparent;
  transition: all 0.2s;

  ::placeholder {
    color: #788791;
  }
`

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  transition: 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  right: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 250px;
  max-height: 290px;
  overflow-y: auto;
`

const DropdownItem = styled(Flex)`
  padding: 10px 15px;
  color: #b8b6b6;
  cursor: pointer;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  &:hover {
    background-color: #736f6f42;
  }
`

const TokenList: FC<{
  isShowSearch: boolean
  data: any[]
  onSelectToken: (token: any) => void
}> = React.memo(({ isShowSearch, data, onSelectToken }) => {
  return (
    <AnimatePresence>
      {isShowSearch && !isEmpty(data) && (
        <Dropdown
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={dropdownVariantsFromTopFast}
        >
          {data?.map((token) => (
            <DropdownItem
              key={token.address}
              onClick={() => onSelectToken(token)}
            >
              <Flex
                alignItems="center"
                height="100%"
              >
                <TokenLogo
                  address={token?.pairAddress}
                  url={token?.logoUrl}
                  height={28}
                  width={28}
                />

                <Flex flexDirection="column">
                  <Text
                    ml="5px"
                    textTransform="uppercase"
                    fontSize="14px"
                  >
                    {token.symbol}
                  </Text>
                  <Text
                    ml="5px"
                    fontSize="12px"
                    lineHeight={1}
                    color="#b8add2"
                    ellipsis={true}
                    maxWidth={130}
                  >
                    {formatAddress(token?.address, {
                      first: 6,
                      last: -8,
                    })}
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
                  fontSize="14px"
                  ellipsis={true}
                  maxWidth={160}
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
                  ellipsis={true}
                  maxWidth={160}
                >
                  {Number(token?.balance)
                    ? `${displayBalanceValue(token?.balance, token?.price)} $`
                    : ''}
                </Text>
              </Flex>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </AnimatePresence>
  )
})

const MultiSender = () => {
  const [isShowSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const debounceQuery = useDebounce(searchValue, 300)

  const currentAccount = useCurrentAccount()

  const { data, isLoading, refetch } = useFecthUserBalancesWithDetails()

  const filteredList = useMemo(() => {
    if (!debounceQuery) return data || []

    return filterTokens(data || [], debounceQuery)
  }, [debounceQuery, data])

  const {
    onSelectToken: _onSelectToken,
    bulkSendState: { selectToken },
    amounts,
    recipients,
  } = useManageBulkSendState()

  const onSelectToken = (token: ICurrencyWBalance) => {
    _onSelectToken(token)
    setSearchValue(token?.symbol)
    setShowSearch(false)
  }

  useEffect(() => {
    setSearchValue('')
  }, [currentAccount?.address])

  const [showCsvModal, setShowModal] = useState(false)
  return (
    <>
      <Wrapper className="swap-bg">
        <Inner className={poppins.className}>
          <Card>
            <CardInner>
              <Header>
                <Flex
                  width="100%"
                  flexDirection="column"
                  style={{ gap: '10px' }}
                >
                  <Flex
                    width="100%"
                    justifyContent="space-between"
                  >
                    <Text
                      fontSize="14px"
                      fontWeight={500}
                    >
                      Select Token
                    </Text>

                    {!!selectToken && (
                      <Flex
                        alignItems="center"
                        style={{ gap: '5px' }}
                      >
                        <TokenLogo
                          address={selectToken?.pairAddress}
                          url={selectToken?.logoUrl}
                          height={16}
                          width={16}
                        />
                        <Text
                          fontSize="14px"
                          fontWeight={500}
                        >
                          Balance:{' '}
                          <span
                            style={{
                              color: '#b8add2',
                            }}
                          >
                            {Number(selectToken?.balance)?.toLocaleString()}
                          </span>
                        </Text>
                      </Flex>
                    )}
                  </Flex>

                  <SearchWrap mr="5px">
                    <Search color="#788791" />
                    <Input
                      placeholder={isLoading ? 'Loading...' : 'Search tokens'}
                      onFocus={() => setShowSearch(true)}
                      onBlur={() => setShowSearch(false)}
                      onChange={(e) => setSearchValue(e.target.value)}
                      value={searchValue}
                    />

                    {isLoading && (
                      <SpinLoading
                        height={20}
                        width={20}
                        strokeW={2}
                      />
                    )}
                    <TokenList
                      isShowSearch={isShowSearch}
                      data={filteredList}
                      onSelectToken={onSelectToken}
                    />
                  </SearchWrap>
                </Flex>
              </Header>

              <Body setShowModal={setShowModal} />
            </CardInner>
          </Card>

          <DetailCard
            token={selectToken}
            recipients={size(recipients)}
            amounts={sumBy(amounts, (_: string) => Number(_ || 0))}
          />
        </Inner>
      </Wrapper>
      <ConfirmTxModal />
      <ExampleCsvModal
        open={showCsvModal}
        callBack={() => {
          setShowModal(false)
        }}
      />
    </>
  )
}

export default MultiSender
