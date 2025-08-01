import { devices, themes } from '@/config'
import React from 'react'
import styled from 'styled-components'
import Box from '../commonStyled/Box'
import { links } from '@/config/constant'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { openSans, orbitron } from '@/fonts'
import { useRouter } from 'next/router'
import Image from 'next/image'

const StyledFooter = styled(Box)`
  width: 100%;
  height: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  background-color: #000;
  /* background-color: ${themes.backgroundColor}; */
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
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.1s;
  &:hover {
    transform: scale(1.06);
  }
`

const LogoText = styled(Text)`
  font-weight: 700;
  font-size: 35px;
  line-height: 1.2;
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(
    to right,
    rgb(156, 226, 218),
    rgb(155, 242, 193)
  );
  margin-left: 8px;
`
const Footer = () => {
  return (
    <StyledFooter className={openSans.className}>
      <FooterInner id="socials">
        <FooterContent>
          <Flex
            alignItems="flex-end"
            paddingBottom="20px"
          >
            <Image
              src="/bubo_logo.png"
              alt="logo"
              width={50}
              height={50}
            />
            <LogoText className={orbitron.className}>Bubbo</LogoText>
          </Flex>

          <Text
            color="#959595"
            textAlign="center"
          >
            Bubbo is a pioneering token tracking and discovery platform built on
            the Sui ecosystem
          </Text>

          <Text
            color="#959595"
            textAlign="center"
          ></Text>
          <Socials>
            {/* <Text
              color="#959595"
              textAlign="center"
              mb="10px"
            >
              For token listing on Bubbo, contact our Telegram support.
            </Text> */}
            <SocialsInner>
              <IconWrap onClick={() => window.open(links.docs)}>
                <SocialImg
                  alt="docs"
                  src="/socials/gitbook.png"
                />
              </IconWrap>

              {!!links.suivison && (
                <IconWrap onClick={() => window.open(links.suiscan)}>
                  <SocialImg
                    alt="suivision"
                    src="/socials/suivision.png"
                  />
                </IconWrap>
              )}

              {!!links.suiscan && (
                <IconWrap onClick={() => window.open(links.suiscan)}>
                  <SocialImg
                    alt="suiscan"
                    src="/socials/suiscan.png"
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

export default Footer
