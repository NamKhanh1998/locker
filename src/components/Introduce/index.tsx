import { devices, themes } from '@/config'
import React, { useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

import Image from 'next/image'
import Flex from '../commonStyled/Flex'
import bubboImg from '@/public/cutebuboleft.webp'
import bubboImg3 from '@/public/cutebuboright.webp'

import Text from '../commonStyled/Text'
import ComponentCopy from '../Copy'
import { links, tokenAddress } from '@/config/constant'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 60px;
`

const StyledIntroduce = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 10px;

  @media ${devices.tablet} {
    padding: 0;
  }

  @media ${devices.mobileM} {
    max-width: 540px;
  }
  @media ${devices.mobileL} {
    max-width: 720px;
  }
  @media ${devices.tablet} {
    max-width: 960px;
  }
  @media ${devices.laptop} {
    max-width: 1140px;
  }
  @media ${devices.laptopL} {
    max-width: 1320px;
  }
`

const Content = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 50px;
  flex-direction: column;
  padding-top: 50px;

  @media ${devices.tablet} {
    flex-direction: row;

    margin-top: 0;
  }
`

const Content2 = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 50px;
  flex-direction: column-reverse;

  @media ${devices.tablet} {
    flex-direction: row;

    margin-top: 0;
  }
`

const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 32px;

  @media ${devices.tablet} {
    align-items: flex-start;
  }
`

export const AboutWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;

  @media ${devices.tablet} {
    height: 100%;
    justify-content: space-around;
    flex: 5;
    align-items: flex-start;
    padding: 40px 0;
  }
`

export const ImgWithEggWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 50px;

  @media ${devices.tablet} {
    align-items: flex-start;
    flex: 5;
    margin-top: 0;
  }
`

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); } 
  100% { transform: translateY(0); }
`

export const MemeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  margin-top: 50px;
  animation: ${floatAnimation} 3s ease-in-out infinite;

  @media ${devices.tablet} {
    align-items: flex-end;
    flex: 5;
    margin-top: 0;
  }
`

export const LongEggImg = styled(Image)`
  width: 100%;
  max-width: 500px;
  height: auto;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  @media ${devices.tablet} {
    max-width: 500px;
  }
`

export const MemeImg = styled(Image)`
  width: 100%;
  max-width: 500px;
  height: auto;

  @media ${devices.tablet} {
    max-width: 500px;
  }
`

const BigTitle = styled.p`
  margin: 0;
  color: ${themes.main};
  font-weight: 700;
  font-size: 36px;
  text-transform: uppercase;

  @media ${devices.tablet} {
    font-size: 45px;
  }
`

const Desc = styled.h1`
  margin: 0;
  color: #ccc9c9;
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  letter-spacing: 1.5;
  line-height: 1.4;
  @media ${devices.laptop} {
    text-align: left;
  }
`

const AboutContentWrapper = styled.div``

const LinkText = styled.a`
  font-size: 14px;
  margin: 0;
  display: inline;
  color: ${themes.main};
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const RoadmadWrap = styled(Flex)`
  padding-top: 50px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const RoadmapText = styled(Text)`
  font-weight: 400;
  color: #d6d5d5;
  margin: 10px 0;
  text-align: center;
`

const OmicText = styled(RoadmapText)`
  text-align: start;
  margin: 0;
  margin-top: 10px;
`

const OmicBox = styled(Flex)`
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc9c9;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const IntroduceContents = [
  `Real-Time Crypto Tracking: BUBO tracks live token prices and market trends on SUI, SOL, Bera Network, and more.`,
  `Unlike others, BUBBO provides exclusive insights into lower-cap and newly launched projects that are hard to find elsewhere, giving users a unique edge in discovering promising investment opportunities.`,
  `Interactive Bubble Map: A visual-first approach makes it easy to spot trends and opportunities.`,
  `Focused Chain Tracking: Instead of covering the entire market, BUBO dives deep into each blockchain ecosystem for more accurate insights.`,
  ` Customizable Bubble Visualization: BUBO lets users adjust bubble sizes based on market cap, volume, and other metrics, while also allowing full control over color customization for better data interpretation.`,
  ` Purpose & Vision: Built to simplify crypto tracking, BUBO delivers real-time data and a seamless experience for smarter decisions.`,
]

const WhyBuboContents = [
  `BUBBO is built with a long-term vision, focusing on sustainable growth and continuous innovation to provide the best tracking experience for users.`,
  `Advanced Tracking Features – Continuously building new tools for deeper and more detailed project tracking.`,
  `Utility Token – BUBBO will become a utility token, unlocking premium & personalized features on bubbo.fun.`,
  `Multi-Chain Tracking – Supports tracking across multiple blockchains, providing diverse investment opportunities.`,
  `Exclusive Insights – Focuses on lower-cap & newly launched projects, giving users a first-mover advantage.`,
  `Frequent Updates – New features are consistently added, reinforcing our commitment to long-term growth.`,
  `Community-Driven – Developed based on user feedback to ensure the platform meets market demands.`,
]

const RoadMapContents = [
  {
    period: 'Phase 1',
    title: 'Foundation & Community Building',
    contents: [
      { done: true, text: 'Finalizing bubbo.fun and refining the concept' },
      { done: true, text: 'Launching BUBO token' },
      { done: true, text: 'Growing the community through marketing efforts' },
      { done: true, text: 'Selling out 100% on SUIAI' },
    ],
  },
  {
    period: 'Phase 2',
    title: 'Product Expansion & DEX Listing',
    contents: [
      { done: true, text: 'Listing BUBO on decentralized exchanges (DEXs)' },
      { done: true, text: 'Introducing new features to enhance the platform' },
      { done: true, text: 'Improving user experience and analytics tools' },
    ],
  },
  {
    period: 'Phase 3',
    title: 'Multichain Expansion',
    contents: [
      { done: true, text: 'Expanding BUBO to SOL, BSC, BASE, and more' },
      { done: true, text: 'Strengthening cross-chain tracking and analytics' },
    ],
  },
  {
    period: 'Phase 4',
    title: 'Utility & Personalization',
    contents: [
      { done: true, text: 'Transitioning BUBO into a utility token' },
      { done: true, text: 'Unlocking exclusive features for BUBO holders' },
      {
        done: true,
        text: 'Offering personalized analytics & premium tools on bubbo.fun',
      },
      {
        done: true,
        text: 'Making bubbo.fun an ad-powered platform to fund BUBO buybacks and control inflation.',
      },
    ],
  },
]

const TokenOmicsContents = [
  {
    period: 'Token Model:',
    title: 'Fair Launch on SUIAI.fun',
    contents: [
      `BUBO follows a fair launch model on SUIAI.fun, ensuring an equal
              opportunity for all participants. There are no team allocations,
              no presales, and no private investors—everyone starts on the same
              footing.`,
    ],
  },

  {
    period: 'Total Supply:',
    title: '1,000,000,000 BUBO',
    contents: [
      `The total supply of BUBO is fixed at 1 billion tokens, ensuring
              a balanced distribution and sustainable tokenomics. With no
              additional minting, BUBO maintains scarcity while supporting
              long-term growth and ecosystem utility.`,
    ],
  },

  {
    period: 'Distribution Breakdown:',
    title: 'Transparent & Community-Driven',
    contents: [
      `100% Fair Launch – All tokens are distributed through SUIAI.fun,
              with no reserved allocations.`,

      `Liquidity Pool – All funds raised from SUIAI will be added to
              liquidity and burnt, ensuring price stability and long-term
              sustainability.`,

      `Developer Allocation (5%) – The development team will purchase
              5% of the total supply from the open market, aligning incentives
              with the community.`,

      `Community & Growth – A portion of developer-held tokens will be
              allocated to community rewards, incentives, and future initiatives
              to support ecosystem growth.`,
    ],
  },
]

const Introduce = () => {
  const { isMobile } = useMatchBreakPoints()

  const bubboAdress = useMemo(() => {
    if (isMobile) {
      return `${tokenAddress.bubbo.slice(0, 13)}. . .${tokenAddress.bubbo.slice(
        -16
      )}`
    }

    return tokenAddress.bubbo
  }, [isMobile])
  return (
    <Container>
      <StyledIntroduce>
        <Content id="introduce">
          <ImgWithEggWrap
            data-aos-once="true"
            data-aos="fade-right"
          >
            <LongEggImg
              src={bubboImg}
              alt="bubboImg"
            />
          </ImgWithEggWrap>

          <AboutWrap
            data-aos-once="true"
            data-aos="fade-left"
          >
            <BigTitle>About Bubbo</BigTitle>

            {IntroduceContents?.map((content) => (
              <AboutContentWrapper key={content}>
                <Desc>{content}</Desc>
              </AboutContentWrapper>
            ))}
          </AboutWrap>
        </Content>

        <Content2 id="whuybubo">
          <AboutWrap
            data-aos-once="true"
            data-aos="fade-right"
          >
            <BigTitle>Why Bubbo</BigTitle>

            {WhyBuboContents?.map((content) => (
              <AboutContentWrapper key={content}>
                <Desc>{content}</Desc>
              </AboutContentWrapper>
            ))}
          </AboutWrap>
          <MemeWrap
            data-aos-once="true"
            data-aos="fade-left"
          >
            <MemeImg
              src={bubboImg3}
              alt="bubboImg2"
            />
          </MemeWrap>
        </Content2>

        <RoadmadWrap
          id="roadmap"
          data-aos-once="true"
          data-aos="fade-up"
          style={{
            paddingTop: '60px',
          }}
        >
          <BigTitle>Roadmap</BigTitle>

          {RoadMapContents?.map((content) => (
            <Flex
              flexDirection="column"
              width="100%"
              justifyContent="center"
              alignItems="center"
              marginTop="40px"
              key={content.period}
            >
              <Text
                fontSize="30px"
                fontWeight={700}
                textAlign="center"
                color="#51f55c"
              >
                {content.period}:{' '}
                <span
                  style={{
                    color: '#fff',
                  }}
                >
                  {content.title}:{' '}
                </span>
              </Text>

              {content?.contents?.map((item) => (
                <RoadmapText key={item.text}>● {item.text}</RoadmapText>
              ))}
            </Flex>
          ))}
        </RoadmadWrap>

        <RoadmadWrap
          style={{
            paddingTop: '80px',
          }}
          id="tokenomics"
          data-aos-once="true"
          data-aos="fade-up"
        >
          <BigTitle>Tokenomics</BigTitle>
          <Flex alignItems="center">
            <LinkText
              href={links.suiscan}
              target="_blank"
            >
              <span
                style={{
                  marginRight: '5px',
                  color: '#51f55c',
                }}
              >
                CA:
              </span>
              {bubboAdress}
            </LinkText>

            <ComponentCopy stringCopy={tokenAddress.bubbo} />
          </Flex>

          {TokenOmicsContents?.map((content) => (
            <OmicBox
              mt={40}
              key={content.period}
            >
              <Text
                fontSize="20px"
                fontWeight={700}
                color="#51f55c"
              >
                {content.period}{' '}
                <span
                  style={{
                    color: '#fff',
                  }}
                >
                  {content.title}
                </span>
              </Text>

              {content.contents.map((item) => (
                <OmicText key={item}>● {item}</OmicText>
              ))}
            </OmicBox>
          ))}
        </RoadmadWrap>
      </StyledIntroduce>
    </Container>
  )
}

export default Introduce
