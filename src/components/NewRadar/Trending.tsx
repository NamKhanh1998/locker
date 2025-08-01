import React from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Marquee from 'react-fast-marquee'
import Text from '../commonStyled/Text'
import TokenLogo from '../TokenLogo'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useFetchTrendingCoins } from './hooks/useFetchTrendingCoins'
import { TokenAnalytics } from './type'
import { formatPercent } from '../Radar/utils'
import Box from '../commonStyled/Box'
import { formatPrice } from '../utils'
import { useRouter } from 'next/router'
import { Field, ICurrency, SUI, useSwapActionHandler } from '../Swap/state'

const StyledTrending = styled(Flex)`
  width: 100%;
  padding: 10px 0;
  background-color: #000;
  border: 1px solid #1f1f1f;
  border-left: none;
  border-right: none;
  height: 60px;
`

const TokenCard = styled(Flex)`
  border-radius: 16px;
  padding: 8px 12px;
  background-color: #222222ba;
  transition: 0.3s;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin: 0 5px;
  cursor: pointer;
  border: 1.5px solid transparent;
  height: 39px;
  overflow: hidden;

  &:hover {
    border: 1.5px solid #3dbb9a;
  }
`

const Rank = styled(Text)`
  font-size: 12px;
  font-weight: 500;
`

const Symbol = styled(Text)`
  font-size: 14px;
  font-weight: 500;
`

const Percent = styled(Text)<{
  $up: boolean
}>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ $up }) => ($up ? '#46e754' : '#fe3a3a')};
`

const Trending = () => {
  const { coins, isLoading } = useFetchTrendingCoins(true)

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
    <StyledTrending>
      <Marquee pauseOnHover>
        {coins?.map((coin: TokenAnalytics, i: number) => {
          const isUp = Number(coin.percentagePriceChange24h) > 0
          return (
            <TokenCard
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
              <Rank>#{i + 1}</Rank>
              <TokenLogo
                url={coin?.coinMetadata?.iconUrl}
                address=""
                height={20}
                width={20}
              />

              <Symbol>{coin?.coinMetadata?.symbol}</Symbol>

              <Box
                height="5px"
                width="5px"
                background="#fff"
                borderRadius="50%"
              />

              <Text
                fontSize="12px"
                fontWeight={500}
                color="#d7d7d7"
              >
                {formatPrice(Number(coin?.coinPrice))}
              </Text>

              <Flex alignItems="center">
                {isUp ? (
                  <ArrowDropUpIcon
                    style={{
                      height: '18px',
                      width: '18px',
                      color: '#46e754',
                    }}
                  />
                ) : (
                  <ArrowDropDownIcon
                    style={{
                      height: '18px',
                      width: '18px',
                      color: '#fe3a3a',
                    }}
                  />
                )}
                <Percent $up={isUp}>
                  {formatPercent(
                    Math.abs(Number(coin.percentagePriceChange24h))
                  )}
                  %
                </Percent>
              </Flex>
            </TokenCard>
          )
        })}
      </Marquee>
    </StyledTrending>
  )
}

export default Trending
