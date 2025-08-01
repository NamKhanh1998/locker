import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Skeleton from '../commonStyled/Skeleton/Skeleton'
import Text from '../commonStyled/Text'
import { Field, ICurrency, SUI, useSwapActionHandler } from '../Swap/state'
import { displayValueFormatted } from '../Swap/utils'
import { displayBalanceValue } from '../Swap/utils/bigNumber'
import TokenLogo from '../TokenLogo'

const Wrap = styled(Flex)`
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  max-height: 100%;
`

const CurrencyRow = styled(Flex)`
  padding: 10px 16px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
  height: 60px;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &:hover .actions {
    opacity: 1;
    pointer-events: auto;
  }
`

const IconWrap = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover > svg {
    transform: scale(1.2);
  }

  &:hover > svg {
    fill: rgb(61, 187, 154);
    transition: all 0.2s;
  }
`

const Actions = styled(Flex)`
  height: 100%;
  align-items: center;
  opacity: 0;
`

const Loading = () => {
  return (
    <Flex
      mt="10px"
      flexDirection="column"
      style={{
        gap: '10px',
      }}
      padding="0 16px"
    >
      <Skeleton
        height={52}
        width="100%"
      />
      <Skeleton
        height={52}
        width="100%"
      />
      <Skeleton
        height={52}
        width="100%"
      />
    </Flex>
  )
}

const BalanceList: FC<{
  balances?: any[]
  isLoading: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ balances, isLoading, setOpen }) => {
  const { push } = useRouter()

  const { onSelectCurrency } = useSwapActionHandler()

  const onSwapClick = (token: ICurrency) => {
    if (!token) return

    push(
      `/swap?inputCurrencyId=${SUI.address}&outputCurrencyId=${token?.address}`
    )
    onSelectCurrency(Field.INPUT, SUI)
    onSelectCurrency(Field.OUTPUT, token)

    setOpen(false)
  }

  return (
    <Wrap>
      {isLoading ? (
        <Loading />
      ) : (
        balances?.map((token) => (
          <CurrencyRow key={token?.address}>
            <Flex alignItems="center">
              <TokenLogo
                address={token?.pairAddress}
                url={token?.logoUrl}
                height={28}
                width={28}
              />

              <Flex
                ml="8px"
                flexDirection="column"
              >
                <Flex alignItems="center">
                  <Text
                    lineHeight={1}
                    fontSize="14px"
                    ellipsis={true}
                    maxWidth={130}
                  >
                    {token.symbol}
                  </Text>

                  <Actions className="actions">
                    <IconWrap
                      height="18px"
                      width="18px"
                      ml="5px"
                      onClick={() => {
                        onSwapClick(token)
                      }}
                    >
                      <SwapVertRoundedIcon
                        sx={{
                          height: '18px',
                          width: '18px',
                          color: '#fff',
                        }}
                      />
                    </IconWrap>

                    {/* <IconWrap
                      height="18px"
                      width="18px"
                    >
                      <SendIcon
                        height="18px"
                        width="18px"
                        fill="#fff"
                      />
                    </IconWrap> */}
                  </Actions>
                </Flex>
                <Text
                  fontSize="12px"
                  lineHeight={1}
                  color="#b8add2"
                  mt="6px"
                  ellipsis={true}
                  maxWidth={130}
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
          </CurrencyRow>
        ))
      )}
    </Wrap>
  )
}

export default BalanceList
