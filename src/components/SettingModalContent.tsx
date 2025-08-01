import React, { FC } from 'react'
import styled from 'styled-components'
import Flex from './commonStyled/Flex'
import Text from './commonStyled/Text'
import { dynaPuff } from '@/fonts'
import SettingsIcon from '@mui/icons-material/Settings'

import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import SuiLogoImg from '@/public/chains/sui.png'
import SolLogoImg from '@/public/chains/sol.webp'
import BeraLogoImg from '@/public/chains/berachain.png'
import {
  BubbleSize,
  Chain,
  Colors,
  PriceChangePercentage,
  SpecialSortType,
} from './Bubbles/bubbles.types'
import { useManageOptions } from './Bubbles/hooks/useManageOptions'
import { Switch } from '@mui/material'
import BubboHolderSettings from './Settings/BubboHolderSettings'

const Container = styled(Flex)`
  max-width: 600px;
  width: 100%;
  height: 100%;
  background-color: #5a5a5ae4;
  border-radius: 10px;
  padding: 15px;
  backdrop-filter: blur(10px);
  flex-direction: column;
`

const Title = styled(Text)`
  font-size: 20px;
  margin-left: 8px;
  font-weight: 600;
`

const Header = styled(Flex)`
  width: 100%;
  align-items: center;
  max-height: 40px;
  justify-content: space-between;
`

const IconWrap = styled(Flex)`
  border-radius: 50%;
  padding: 5px;
  background-color: #706f6e;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #898888;
  }
`

const Body = styled(Flex)`
  width: 100%;
  flex-direction: column;
  max-height: 500px;
  overflow-y: auto;
`

const SubTitle = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`

const Button = styled(Flex)<{ $active?: boolean }>`
  align-items: center;
  width: max-content;
  border-radius: 8px;
  padding: 5px 12px;
  cursor: pointer;
  transition: all 0.3s;
  gap: 5px;
  justify-content: center;
  background-color: ${({ $active }) => {
    if ($active) {
      return '#50ff5093'
    }

    return '#706f6e'
  }};

  &:hover {
    background-color: ${({ $active }) => (!$active ? '#898888' : '')};
  }
`

const ChainLogo = styled(Image)`
  border-radius: 50%;
  height: 20px;
  width: 20px;
`

const ColorsOptions = [
  { name: 'Green - Red', value: Colors.RED_GREEN },
  { name: 'Blue - Yellow', value: Colors.BLUE_YELLOW },
  { name: 'Pink - Mint', value: Colors.PINK_MINT },
  { name: 'Neutral', value: Colors.NEUTRAL },
]

const SettingModalContent: FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const {
    options: {
      bubbleSize,
      performance,
      page,
      pagesRange,
      pageSize,
      chain,
      specialSortType,
      bubbleColor,
    },
    setOptions,
    onSelectSpecialSort,
    onSelectChain,
  } = useManageOptions()

  return (
    <Container>
      <Header>
        <Flex>
          <SettingsIcon
            sx={{
              color: '#fff',
              height: '30px',
              width: '30px',
            }}
          />
          <Title className={dynaPuff.className}>Settings</Title>
        </Flex>

        <IconWrap onClick={onClose}>
          <CloseIcon
            sx={{
              color: '#fff',
              height: '30px',
              width: '30px',
            }}
          />
        </IconWrap>
      </Header>

      <Body pt="10px">
        <BubboHolderSettings />

        <Flex
          width="100%"
          flexDirection="column"
        >
          <SubTitle className={dynaPuff.className}>Chain</SubTitle>

          <Flex
            width="100%"
            mt="5px"
            alignItems="center"
            style={{
              gap: '10px',
            }}
          >
            <Button
              $active={chain === Chain.SUI}
              onClick={() => onSelectChain(Chain.SUI)}
            >
              <ChainLogo
                alt="sui"
                src={SuiLogoImg}
              />
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                SUI
              </Text>
            </Button>

            <Button
              $active={chain === Chain.SOL}
              onClick={() => onSelectChain(Chain.SOL)}
            >
              <ChainLogo
                alt="sui"
                src={SolLogoImg}
              />
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Solana
              </Text>
            </Button>

            <Button
              $active={chain === Chain.BERA}
              onClick={() => onSelectChain(Chain.BERA)}
            >
              <ChainLogo
                alt="bera-chain"
                src={BeraLogoImg}
              />
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Bera
              </Text>
            </Button>
          </Flex>
        </Flex>

        <Flex
          width="100%"
          flexDirection="column"
          mt="10px"
        >
          <SubTitle className={dynaPuff.className}>Top</SubTitle>

          <Flex
            width="100%"
            mt="5px"
            alignItems="center"
            flexWrap="wrap"
            style={{
              gap: '10px',
            }}
          >
            <Button
              $active={specialSortType === SpecialSortType.NEW}
              minWidth="100px"
              onClick={() => onSelectSpecialSort(SpecialSortType.NEW)}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                New
              </Text>
            </Button>
            <Button
              $active={specialSortType === SpecialSortType.GAINERS}
              minWidth="100px"
              onClick={() => onSelectSpecialSort(SpecialSortType.GAINERS)}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Gainers
              </Text>
            </Button>

            <Button
              $active={specialSortType === SpecialSortType.LOSERS}
              minWidth="100px"
              onClick={() => onSelectSpecialSort(SpecialSortType.LOSERS)}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Losers
              </Text>
            </Button>

            {pagesRange?.map((_: any) => (
              <Button
                $active={page === _?.page && !specialSortType}
                minWidth="100px"
                onClick={() =>
                  setOptions((p) => ({
                    ...p,
                    page: _?.page,
                    specialSortType: null,
                  }))
                }
              >
                <Text
                  className={dynaPuff.className}
                  fontSize="16px"
                >
                  {_?.range}
                </Text>
              </Button>
            ))}
          </Flex>
        </Flex>
        <Flex
          width="100%"
          flexDirection="column"
          mt="10px"
          flexWrap="wrap"
        >
          <SubTitle className={dynaPuff.className}>Page Size</SubTitle>

          <Flex
            width="100%"
            mt="5px"
            alignItems="center"
            style={{
              gap: '10px',
            }}
          >
            {!!specialSortType ? (
              <Button minWidth="100px">
                <Text
                  className={dynaPuff.className}
                  fontSize="16px"
                >
                  Max 15
                </Text>
              </Button>
            ) : (
              <>
                <Button
                  $active={pageSize === 50}
                  minWidth="100px"
                  onClick={() =>
                    setOptions((p) => ({ ...p, pageSize: 50, page: 1 }))
                  }
                >
                  <Text
                    className={dynaPuff.className}
                    fontSize="16px"
                  >
                    50
                  </Text>
                </Button>

                <Button
                  $active={pageSize === 100}
                  minWidth="100px"
                  onClick={() =>
                    setOptions((p) => ({ ...p, pageSize: 100, page: 1 }))
                  }
                >
                  <Text
                    className={dynaPuff.className}
                    fontSize="16px"
                  >
                    100
                  </Text>
                </Button>
              </>
            )}
          </Flex>
        </Flex>
        <Flex
          width="100%"
          flexDirection="column"
          mt="10px"
        >
          <SubTitle className={dynaPuff.className}>Bubble Size</SubTitle>

          <Flex
            width="100%"
            mt="5px"
            alignItems="center"
            style={{
              gap: '10px',
            }}
            flexWrap="wrap"
          >
            <Button
              $active={bubbleSize === BubbleSize.PERFORMANCE}
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({
                  ...p,
                  bubbleSize: BubbleSize.PERFORMANCE,
                }))
              }
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Performance
              </Text>
            </Button>

            <Button
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({ ...p, bubbleSize: BubbleSize.MKC }))
              }
              $active={bubbleSize === BubbleSize.MKC}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Marketcap
              </Text>
            </Button>

            <Button
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({ ...p, bubbleSize: BubbleSize.LIQUIDITY }))
              }
              $active={bubbleSize === BubbleSize.LIQUIDITY}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Liquidity
              </Text>
            </Button>

            <Button
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({ ...p, bubbleSize: BubbleSize.VOLUME }))
              }
              $active={bubbleSize === BubbleSize.VOLUME}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Volume 24H
              </Text>
            </Button>
          </Flex>
        </Flex>
        <Flex
          width="100%"
          flexDirection="column"
          mt="10px"
        >
          <SubTitle className={dynaPuff.className}>Bubble Colors</SubTitle>

          <Flex
            width="100%"
            mt="5px"
            alignItems="center"
            style={{
              gap: '10px',
            }}
            flexWrap="wrap"
          >
            {ColorsOptions.map((item) => (
              <Button
                $active={bubbleColor === item.value}
                minWidth="100px"
                key={item.value}
                onClick={() =>
                  setOptions((p) => ({
                    ...p,
                    bubbleColor: item.value,
                  }))
                }
              >
                <Text
                  className={dynaPuff.className}
                  fontSize="16px"
                >
                  {item.name}
                </Text>
              </Button>
            ))}
          </Flex>
        </Flex>
        <Flex
          width="100%"
          flexDirection="column"
          mt="10px"
        >
          <SubTitle className={dynaPuff.className}>Performance</SubTitle>

          <Flex
            width="100%"
            mt="5px"
            alignItems="center"
            style={{
              gap: '10px',
            }}
            flexWrap="wrap"
          >
            <Button
              $active={performance === PriceChangePercentage.HOUR}
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({
                  ...p,
                  performance: PriceChangePercentage.HOUR,
                }))
              }
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Hour
              </Text>
            </Button>

            <Button
              $active={performance === PriceChangePercentage.SIXHOURS}
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({
                  ...p,
                  performance: PriceChangePercentage.SIXHOURS,
                }))
              }
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                6Hours
              </Text>
            </Button>

            <Button
              $active={performance === PriceChangePercentage.DAY}
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({
                  ...p,
                  performance: PriceChangePercentage.DAY,
                }))
              }
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Day
              </Text>
            </Button>

            <Button
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({
                  ...p,
                  performance: PriceChangePercentage.WEEK,
                }))
              }
              $active={performance === PriceChangePercentage.WEEK}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Week
              </Text>
            </Button>

            <Button
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({
                  ...p,
                  performance: PriceChangePercentage.MONTH,
                }))
              }
              $active={performance === PriceChangePercentage.MONTH}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Month
              </Text>
            </Button>

            <Button
              minWidth="100px"
              onClick={() =>
                setOptions((p) => ({
                  ...p,
                  performance: PriceChangePercentage.YEAR,
                }))
              }
              $active={performance === PriceChangePercentage.YEAR}
            >
              <Text
                className={dynaPuff.className}
                fontSize="16px"
              >
                Year
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Body>
    </Container>
  )
}

export default SettingModalContent
