import { FC } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Skeleton from '../commonStyled/Skeleton/Skeleton'
import Text from '../commonStyled/Text'
import { formatNumber, formatTimeSince } from '../utils'
import DexLogo from './DexLogo'
import { useFetchPools } from './hooks/useFetchPools'

const Wrap = styled(Flex)`
  padding: 10px 0;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-around;
`

const Header = styled(Flex)`
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`

const Scrollable = styled(Flex)`
  width: 100%;
  height: 150px;
  overflow-y: auto;
  flex-direction: column;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`

const Row = styled(Flex)`
  padding: 5px;
  width: 100%;
  min-height: 38px;
  min-height: 38px;
  cursor: pointer;
  border-radius: 6px;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const Poolist: FC<{
  address: string
}> = ({ address }) => {
  const { data, isLoading } = useFetchPools(address)

  return (
    <Wrap>
      <Header>
        <Flex width="40%">
          <Text
            color="#d7d7d7"
            fontSize="14px"
            fontWeight={600}
          >
            Pair
          </Text>
        </Flex>

        <Flex
          justifyContent="flex-end"
          width="20%"
        >
          <Text
            color="#d7d7d7"
            fontSize="14px"
            fontWeight={600}
          >
            Volume
          </Text>
        </Flex>
        <Flex
          justifyContent="flex-end"
          width="20%"
        >
          <Text
            color="#d7d7d7"
            fontSize="14px"
            fontWeight={600}
          >
            Liquidity
          </Text>
        </Flex>
        <Flex
          width="20%"
          justifyContent="flex-end"
        >
          <Text
            color="#d7d7d7"
            fontSize="14px"
            fontWeight={600}
          >
            Age
          </Text>
        </Flex>
      </Header>

      <Scrollable>
        {isLoading ? (
          <Flex
            flexDirection="column"
            style={{ gap: '5px' }}
          >
            <Skeleton height="38px" />
            <Skeleton height="38px" />
            <Skeleton height="38px" />
          </Flex>
        ) : (
          data?.map((pair: any) => {
            return (
              <Row
                onClick={() => {
                  if (pair?.url) window.open(pair?.url)
                }}
              >
                <Flex width="40%">
                  <Flex mr="6px">
                    <DexLogo
                      height={18}
                      width={18}
                      dexId={pair?.dexId}
                    />
                  </Flex>
                  <Flex alignItems="center">
                    <Text
                      fontWeight={600}
                      fontSize="14px"
                    >
                      {pair?.baseToken?.symbol}
                    </Text>
                    <Text
                      mx="2px"
                      fontSize="12px"
                    >
                      /
                    </Text>
                    <Text fontSize="14px">{pair?.quoteToken?.symbol}</Text>
                  </Flex>
                </Flex>

                <Flex
                  justifyContent="flex-end"
                  width="20%"
                >
                  <Text fontSize="14px">
                    {formatNumber(pair?.volume?.['h24'])}
                  </Text>
                </Flex>
                <Flex
                  justifyContent="flex-end"
                  width="20%"
                >
                  <Text fontSize="14px">
                    {formatNumber(pair?.liquidity?.['usd'] || 0)}
                  </Text>
                </Flex>
                <Flex
                  width="20%"
                  justifyContent="flex-end"
                >
                  <Text fontSize="14px">
                    {pair?.pairCreatedAt
                      ? formatTimeSince(pair?.pairCreatedAt)
                      : '-'}
                  </Text>
                </Flex>
              </Row>
            )
          })
        )}
      </Scrollable>
    </Wrap>
  )
}

export default Poolist
