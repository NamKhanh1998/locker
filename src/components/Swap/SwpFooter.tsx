import { devices, themes } from '@/config'
import React from 'react'
import styled from 'styled-components'
import Box from '../commonStyled/Box'
import { links } from '@/config/constant'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { openSans } from '@/fonts'

const StyledFooter = styled(Box)`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #000;
`

const FooterInner = styled(Flex)`
  width: 100%;
  padding: 0 10px;

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

const FooterContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Socials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  flex-direction: column;
`

const SocialsInner = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
`

const IconWrap = styled(Flex)`
  border-radius: 50%;
  padding: 3px;
  background-color: #706f6e;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #898888;
  }
`

const SocialImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.1s;
  &:hover {
    transform: scale(1.06);
  }
`
const SwapFooter = () => {
  return (
    <StyledFooter className={openSans.className}>
      <FooterInner id="socials">
        <FooterContent>
          <Text
            fontSize="45px"
            textAlign="center"
            mb="10px"
          >
            Bubbo.fun
          </Text>

          <Text
            color="#959595"
            textAlign="center"
          >
            Crypto Bubbles Map for Multichain – launching on SUI. Track
            real-time token prices and market trends across multiple blockchains
            with our interactive bubble map
          </Text>

          <Text
            color="#959595"
            textAlign="center"
          >
            No financial advice. Do your own research!
          </Text>
          <Socials>
            <Text
              color="#959595"
              textAlign="center"
              mb="10px"
            >
              For token listing on Bubbo, contact our Telegram support.
            </Text>
            <SocialsInner>
              {!!links.telegram && (
                <IconWrap onClick={() => window.open(links.buy)}>
                  <SocialImg
                    alt="buy"
                    src="/avatar.png"
                  />
                </IconWrap>
              )}
              {!!links.telegram && (
                <IconWrap onClick={() => window.open(links.telegram)}>
                  <SocialImg
                    alt="tele"
                    src="/socials/telegram.webp"
                  />
                </IconWrap>
              )}

              {!!links.twitter && (
                <IconWrap onClick={() => window.open(links.twitter)}>
                  <SocialImg
                    alt="x-img"
                    src="/socials/x.webp"
                  />
                </IconWrap>
              )}

              {!!links.dexscreener && (
                <IconWrap onClick={() => window.open(links.dexscreener)}>
                  <SocialImg
                    alt="dexscreener"
                    src="/socials/dexscreener.webp"
                  />
                </IconWrap>
              )}
            </SocialsInner>
          </Socials>
        </FooterContent>
      </FooterInner>
    </StyledFooter>
  )
}

export default SwapFooter
