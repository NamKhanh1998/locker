import React, { FC, useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { dynaPuff } from '@/fonts'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import { useManageSelectedToken } from '../Bubbles/hooks/useManageSelectedToken'
import { devices } from '@/config'
import { formatNumber, formatToSignificantDigits } from '../utils'
import { isNumber } from 'lodash'
import { useManageOptions } from '../Bubbles/hooks/useManageOptions'
import { Chain } from '../Bubbles/bubbles.types'
import badgeImg from '@/public/friendbadge.png'
import Tippy from '@tippyjs/react'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { useRouter } from 'next/router'
import { SUI } from '../Swap/state'
import { isSui } from '../Swap/utils'
import { ModalContainer } from '../ModalV2/styles'
import LineChart from './LineChart'
import SecurityIcon from '@mui/icons-material/Security'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import Security from './Security'
import Poolist from './Poolist'
import OpacityIcon from '@mui/icons-material/Opacity'

const Container = styled(ModalContainer)<{ $isPartner?: boolean }>`
  width: 100%;
  background-color: ${({ $isPartner }) => ($isPartner ? '#95959587' : '')};
  border-radius: 10px;
  padding: 15px;
  flex-direction: column;
  border: ${({ $isPartner }) =>
    $isPartner ? '2px solid #35d8f3e3' : '2px solid rgb(50, 67, 86)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  max-width: calc(100vw - 10px);

  @media ${devices.mobileM} {
    max-width: 620px;
  }
`

const Title = styled(Text)`
  font-size: 30px;
  margin-left: 8px;
  text-transform: uppercase;
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
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`

const Body = styled(Flex)`
  width: 100%;
  flex-direction: column;
  overflow: auto;
  max-height: 600px;

  @media ${devices.mobileM} {
    max-height: max-content;
  }
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

const TokenLogo = styled(Image)`
  border-radius: 50%;
`

const Socials = styled(Flex)`
  width: 100%;
  align-items: center;
  gap: 6px;
  justify-content: center;

  @media ${devices.mobileM} {
    justify-content: flex-start;
  }
`

const SocialWrap = styled(Flex)<{ $isPartner?: boolean }>`
  align-items: center;
  border-radius: 50%;
  padding: 5px;

  background-color: ${({ $isPartner }) => ($isPartner ? '#bcfbff' : '#706f6e')};

  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;

  /* @media ${devices.mobileM} {
    height: 35px;
    width: 35px;
  } */
`

const SocialImg = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.1s;
  &:hover {
    transform: scale(1.06);
  }

  /* @media ${devices.mobileM} {
    height: 30px;
    width: 30px;
  } */
`

const InfoWrap = styled(Flex)`
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
  max-width: 600px;
  gap: 0px;

  @media ${devices.mobileM} {
    gap: 10px;
  }
`

const InfoBox = styled(Flex)<{ $bg?: boolean }>`
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 5px;
  cursor: pointer;
  justify-content: center;
  background-color: ${({ $bg }) => ($bg ? '#706f6e' : 'none')};
  width: 85px;

  @media ${devices.mobileM} {
    width: 115px;
  }
`

const PerformanceWrap = styled(Flex)`
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
  max-width: 600px;
  gap: 10px;

  @media ${devices.mobileM} {
    justify-content: space-between;
    gap: 0px;
  }
`

const PerformanceBox = styled(Flex)<{ $borderColor?: string }>`
  flex-direction: column;
  align-items: center;
  width: max-content;
  border-radius: 8px;
  padding: 5px 8px;
  cursor: pointer;
  justify-content: center;
  background-color: #706f6e;
  width: 90px;
  border: ${({ $borderColor }) => `2px solid ${$borderColor}`};
`

const PcBox = styled(Flex)`
  display: none;
  @media ${devices.mobileM} {
    display: flex;
  }
`

const MbBox = styled(Flex)`
  display: flex;

  @media ${devices.mobileM} {
    display: none;
  }
`

const Badge = styled(Image)`
  width: 25px;
  height: auto;
  cursor: pointer;
`

const Actions = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: column-reverse;
  gap: 10px;

  @media ${devices.mobileM} {
    flex-direction: row;
  }
`

const BuyBtn = styled(Flex)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: rgb(255, 255, 255);
  padding: 4px 8px;
  align-items: center;
  min-width: 100px;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: center;
  border: 1px solid #bcb9b9;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  margin: 0 2px;

  &:hover {
    border: 1px solid #bcfbff;
    box-shadow: 0px 0px 4px 1px #bcfbff;
  }

  @media ${devices.mobileM} {
    width: auto;
  }
`

const ResponsiveText = styled(Text)`
  font-size: 14px;
`

const ValueText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
`

const OptionBtn = styled(Flex)<{
  $active: boolean
}>`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: rgb(255, 255, 255);
  padding: 4px 8px;
  align-items: center;
  height: 35px;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: center;
  width: 40px;
  margin: 0 2px;

  &:hover {
    transform: scale(1.03);
  }
  ${({ $active }) =>
    $active
      ? `border: 1px solid #bcfbff`
      : `border: 1px solid rgba(255, 255, 255, 0.05)`}
`

const getChangeColor = (percent: number) => {
  if (percent === 0) return '#bcb9b9'
  if (percent > 0) return '#51f55c'
  return '#ff6666'
}

const getChangeBgColor = (percent: number) => {
  if (percent === 0) return '#706f6e'
  if (percent > 0) return '#50ff5093'
  return '#b43a3a'
}

const formatPercent = (percent?: number) => {
  if (isNumber(percent) || isNumber(Number(percent))) {
    return percent?.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  return '0'
}

enum InfoArea {
  CHART = 'CHART',
  SECURITY = 'SECURITY',
  POOL = 'POOL',
}

const TokenModalContent = () => {
  const [isShowChart, setIsShowChart] = useState(false)
  const { setSelectedToken, selectedToken } = useManageSelectedToken()

  const {
    options: { chain },
  } = useManageOptions()

  const onClose = useCallback(() => {
    setSelectedToken({ selectedToken: null })
  }, [setSelectedToken])

  const {
    coingeckoUrl,
    dexscreenerUrl,
    telegramUrl,
    websiteUrl,
    xUrl,
    nexaUrl,
    geckoTerminal,
    suiVisionUrl,
  } = useMemo(() => {
    const slug = chain === Chain.SOL ? 'solana' : chain
    const geckoSlug =
      chain === Chain.SUI
        ? 'sui-network'
        : chain === Chain.SOL
        ? 'solana'
        : 'berachain'

    return {
      dexscreenerUrl: `https://dexscreener.com/${slug}/${selectedToken?.activePairAddress}`,
      websiteUrl: selectedToken?.website,
      telegramUrl: selectedToken?.telegram,
      coingeckoUrl: `https://www.coingecko.com/en/coins/${selectedToken?.coingeckoId}`,
      xUrl: selectedToken?.twitter,
      nexaUrl: `https://app.nexa.xyz/trade/${selectedToken?.address}`,
      geckoTerminal: `https://www.geckoterminal.com/${geckoSlug}/pools/${selectedToken?.activePairAddress}`,
      suiVisionUrl: `https://suivision.xyz/coin/${selectedToken?.address}`,
    }
  }, [selectedToken])

  const scrollRef: any = useRef(null)

  const { push } = useRouter()

  const onBuyClick = useCallback(() => {
    if (isSui(selectedToken?.address || '')) {
      push(`/swap`)
    } else {
      push(
        `/swap?inputCurrencyId=${SUI.address}&outputCurrencyId=${selectedToken?.address}`
      )
    }

    setSelectedToken({ selectedToken: null })
  }, [push, setSelectedToken])

  const [showInfo, setShowInfo] = useState<InfoArea>(InfoArea.CHART)

  return (
    <Container
      $minHeight="300px"
      className={dynaPuff.className}
      $isPartner={selectedToken?.isPartner}
    >
      <Header>
        <Flex alignItems="center">
          <TokenLogo
            alt="token-logo"
            src={`/tokens/${chain}/${selectedToken?.pairAddress?.toLowerCase()}.png`}
            width={40}
            height={40}
          />

          <Title className={dynaPuff.className}>{selectedToken?.symbol}</Title>

          <PcBox>
            <Text
              ml="5px"
              color="#d7d7d7"
              fontSize="18px"
              className={dynaPuff.className}
            >
              ({selectedToken?.name})
            </Text>
          </PcBox>

          {selectedToken?.isPartner && (
            <Flex ml="10px">
              <Tippy content={<Text>Partnered with BUBO.</Text>}>
                <Badge
                  src={badgeImg}
                  alt="badge"
                />
              </Tippy>
            </Flex>
          )}

          <MbBox>
            <BuyBtn
              onClick={onBuyClick}
              style={{
                marginLeft: '10px',
              }}
            >
              <SwapHorizIcon
                sx={{
                  height: '22px',
                  width: '22px',
                  color: '#fff',
                }}
              />
              <Text
                ml="4px"
                fontSize="16px"
                fontWeight={600}
              >
                Trade
              </Text>
            </BuyBtn>
          </MbBox>
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

      <Body
        pt="20px"
        ref={scrollRef}
      >
        <Actions>
          <Socials>
            {chain === Chain.SUI && (
              <SocialWrap
                onClick={() => {
                  if (suiVisionUrl) window.open(suiVisionUrl)
                }}
                $isPartner={selectedToken?.isPartner}
              >
                <SocialImg
                  alt="suiscan"
                  src="/socials/suivision.png"
                />
              </SocialWrap>
            )}
            {!!dexscreenerUrl && (
              <SocialWrap
                onClick={() => {
                  if (dexscreenerUrl) window.open(dexscreenerUrl)
                }}
                $isPartner={selectedToken?.isPartner}
              >
                <SocialImg
                  alt="dexscreener"
                  src="/socials/dexscreener.webp"
                />
              </SocialWrap>
            )}

            {!!geckoTerminal && (
              <SocialWrap
                onClick={() => {
                  if (geckoTerminal) window.open(geckoTerminal)
                }}
                $isPartner={selectedToken?.isPartner}
              >
                <SocialImg
                  alt="geckoTerminal"
                  src="/socials/geckoterminal.png"
                />
              </SocialWrap>
            )}

            {!!coingeckoUrl && (
              <SocialWrap
                onClick={() => {
                  if (coingeckoUrl) window.open(coingeckoUrl)
                }}
                $isPartner={selectedToken?.isPartner}
              >
                <SocialImg
                  alt="coingecko"
                  src="/socials/coingecko.png"
                />
              </SocialWrap>
            )}

            {!!nexaUrl && (
              <SocialWrap
                onClick={() => {
                  if (nexaUrl) window.open(nexaUrl)
                }}
                $isPartner={selectedToken?.isPartner}
              >
                <SocialImg
                  alt="nexa"
                  src="/socials/nexa.png"
                />
              </SocialWrap>
            )}

            {!!telegramUrl && (
              <SocialWrap
                onClick={() => {
                  if (telegramUrl) window.open(telegramUrl)
                }}
                $isPartner={selectedToken?.isPartner}
              >
                <SocialImg
                  alt="tele"
                  src="/socials/telegram.webp"
                />
              </SocialWrap>
            )}

            {!!xUrl && (
              <SocialWrap
                onClick={() => {
                  if (xUrl) window.open(xUrl)
                }}
                $isPartner={selectedToken?.isPartner}
              >
                <SocialImg
                  alt="x-img"
                  src="/socials/x.webp"
                />
              </SocialWrap>
            )}

            {!!websiteUrl && (
              <SocialWrap
                onClick={() => {
                  if (websiteUrl) window.open(websiteUrl)
                }}
                $isPartner={selectedToken?.isPartner}
              >
                <SocialImg
                  alt="web"
                  src="/socials/web.webp"
                />
              </SocialWrap>
            )}
          </Socials>

          <PcBox>
            <BuyBtn onClick={onBuyClick}>
              <SwapHorizIcon
                sx={{
                  height: '22px',
                  width: '22px',
                  color: '#fff',
                }}
              />
              <Text
                ml="4px"
                fontSize="16px"
                fontWeight={600}
              >
                Trade
              </Text>
            </BuyBtn>
          </PcBox>
        </Actions>

        <Flex
          width="100%"
          flexDirection="column"
        >
          <InfoWrap>
            <InfoBox>
              <ValueText
                fontWeight={500}
                className={dynaPuff.className}
              >
                {formatToSignificantDigits(Number(selectedToken?.price) || 0)}
              </ValueText>
              <ResponsiveText
                className={dynaPuff.className}
                color="#d7d7d7"
              >
                Price
              </ResponsiveText>
            </InfoBox>

            <InfoBox>
              <ValueText
                fontWeight={500}
                className={dynaPuff.className}
              >
                {formatNumber(selectedToken?.marketCap || 0)}
              </ValueText>
              <ResponsiveText
                color="#d7d7d7"
                className={dynaPuff.className}
              >
                MKC
              </ResponsiveText>
            </InfoBox>

            <InfoBox>
              <ValueText
                fontWeight={500}
                className={dynaPuff.className}
              >
                {formatNumber(selectedToken?.volume || 0)}
              </ValueText>
              <ResponsiveText
                color="#d7d7d7"
                className={dynaPuff.className}
              >
                Volume
              </ResponsiveText>
            </InfoBox>

            <InfoBox>
              <ValueText
                className={dynaPuff.className}
                fontSize="20px"
                fontWeight={500}
              >
                {formatNumber(selectedToken?.totalLiquidity || 0)}
              </ValueText>

              <Flex alignItems="center">
                <ResponsiveText
                  className={dynaPuff.className}
                  color="#d7d7d7"
                  mr="5px"
                >
                  Liquidity
                </ResponsiveText>
                {/* <Tippy
                  content={
                    <Text fontSize="14px">
                      Total Liquidity on {chain?.toUpperCase()}
                    </Text>
                  }
                  placement="bottom"
                >
                  <Box>
                    <InfoIcon
                      height={20}
                      width={20}
                      fill="#fff"
                    />
                  </Box>
                </Tippy> */}
              </Flex>
            </InfoBox>

            {!!selectedToken?.coingeckoId && (
              <>
                <InfoBox>
                  <ValueText
                    className={dynaPuff.className}
                    fontSize="20px"
                    fontWeight={500}
                  >
                    {formatToSignificantDigits(selectedToken?.high24h || 0)}
                  </ValueText>
                  <ResponsiveText
                    color="#d7d7d7"
                    className={dynaPuff.className}
                  >
                    24H High
                  </ResponsiveText>
                </InfoBox>

                <InfoBox>
                  <ValueText
                    fontWeight={500}
                    className={dynaPuff.className}
                  >
                    {formatToSignificantDigits(selectedToken?.low24h || 0)}
                  </ValueText>
                  <ResponsiveText
                    color="#d7d7d7"
                    className={dynaPuff.className}
                  >
                    24H Low
                  </ResponsiveText>
                </InfoBox>

                <InfoBox>
                  <ValueText
                    fontWeight={500}
                    className={dynaPuff.className}
                  >
                    {formatToSignificantDigits(selectedToken?.ath || 0)}
                  </ValueText>
                  <ResponsiveText
                    color="#d7d7d7"
                    className={dynaPuff.className}
                  >
                    ATH
                  </ResponsiveText>
                </InfoBox>
                <InfoBox>
                  <ValueText
                    fontWeight={500}
                    className={dynaPuff.className}
                  >
                    {formatToSignificantDigits(selectedToken?.atl || 0)}
                  </ValueText>
                  <ResponsiveText
                    color="#d7d7d7"
                    className={dynaPuff.className}
                  >
                    ATL
                  </ResponsiveText>
                </InfoBox>
              </>
            )}
          </InfoWrap>
        </Flex>

        <Flex
          width="100%"
          justifyContent="center"
          pt="10px"
          style={{
            gap: '5px',
          }}
        >
          <OptionBtn
            $active={showInfo === InfoArea.CHART}
            onClick={() => setShowInfo(InfoArea.CHART)}
          >
            <QueryStatsIcon
              sx={{
                fill: showInfo === InfoArea.CHART ? '#fff' : '#c6c6c6',
              }}
            />
          </OptionBtn>

          {chain === Chain.SUI && (
            <OptionBtn
              $active={showInfo === InfoArea.SECURITY}
              onClick={() => setShowInfo(InfoArea.SECURITY)}
            >
              <SecurityIcon
                sx={{
                  fill: showInfo === InfoArea.SECURITY ? '#fff' : '#c6c6c6',
                }}
              />
            </OptionBtn>
          )}

          {chain === Chain.SUI && (
            <OptionBtn
              $active={showInfo === InfoArea.POOL}
              onClick={() => setShowInfo(InfoArea.POOL)}
            >
              <OpacityIcon
                sx={{
                  fill: showInfo === InfoArea.POOL ? '#fff' : '#c6c6c6',
                }}
              />
            </OptionBtn>
          )}
        </Flex>
        <Flex
          width="100%"
          height="220px"
        >
          {showInfo === InfoArea.CHART && <LineChart token={selectedToken} />}
          {showInfo === InfoArea.SECURITY && (
            <Security address={selectedToken?.address!} />
          )}
          {showInfo === InfoArea.POOL && (
            <Poolist address={selectedToken?.address!} />
          )}
        </Flex>

        <Flex
          width="100%"
          flexDirection="column"
          alignItems="center"
        >
          <PerformanceWrap>
            <PerformanceBox
              $borderColor={getChangeColor(selectedToken?.h1 || 0)}
              style={{
                backgroundColor: getChangeBgColor(selectedToken?.h1 || 0),
              }}
            >
              <ValueText
                fontWeight={500}
                className={dynaPuff.className}
              >
                {formatPercent(selectedToken?.h1)}%
              </ValueText>
              <ResponsiveText className={dynaPuff.className}>
                Hour
              </ResponsiveText>
            </PerformanceBox>

            <PerformanceBox
              $borderColor={getChangeColor(selectedToken?.h6 || 0)}
              style={{
                backgroundColor: getChangeBgColor(selectedToken?.h6 || 0),
              }}
            >
              <ValueText
                fontWeight={500}
                className={dynaPuff.className}
              >
                {formatPercent(selectedToken?.h6)}%
              </ValueText>
              <ResponsiveText className={dynaPuff.className}>
                6Hours
              </ResponsiveText>
            </PerformanceBox>

            <PerformanceBox
              $borderColor={getChangeColor(selectedToken?.h24 || 0)}
              style={{
                backgroundColor: getChangeBgColor(selectedToken?.h24 || 0),
              }}
            >
              <ValueText
                fontWeight={500}
                className={dynaPuff.className}
              >
                {formatPercent(selectedToken?.h24)}%
              </ValueText>
              <ResponsiveText className={dynaPuff.className}>
                Day
              </ResponsiveText>
            </PerformanceBox>

            <PerformanceBox
              $borderColor={getChangeColor(selectedToken?.week || 0)}
              style={{
                backgroundColor: getChangeBgColor(selectedToken?.week || 0),
              }}
            >
              <ValueText
                className={dynaPuff.className}
                fontWeight={500}
              >
                {formatPercent(selectedToken?.week)}%
              </ValueText>
              <ResponsiveText className={dynaPuff.className}>
                Week
              </ResponsiveText>
            </PerformanceBox>

            <PerformanceBox
              $borderColor={getChangeColor(selectedToken?.month || 0)}
              style={{
                backgroundColor: getChangeBgColor(selectedToken?.month || 0),
              }}
            >
              <ValueText
                fontWeight={500}
                className={dynaPuff.className}
              >
                {formatPercent(selectedToken?.month)}%
              </ValueText>
              <ResponsiveText className={dynaPuff.className}>
                Month
              </ResponsiveText>
            </PerformanceBox>

            <PerformanceBox
              $borderColor={getChangeColor(selectedToken?.year || 0)}
              style={{
                backgroundColor: getChangeBgColor(selectedToken?.year || 0),
              }}
            >
              <ValueText
                fontWeight={500}
                className={dynaPuff.className}
              >
                {formatPercent(selectedToken?.year)}%
              </ValueText>
              <ResponsiveText className={dynaPuff.className}>
                Year
              </ResponsiveText>
            </PerformanceBox>
          </PerformanceWrap>
        </Flex>
      </Body>
    </Container>
  )
}

export default TokenModalContent
