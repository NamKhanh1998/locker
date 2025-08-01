import { devices, position, themes } from '@/config'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { dynaPuff } from '@/fonts'
import Image from 'next/image'
import LogoImg3 from '@/public/logo3.png'
import { useRouter } from 'next/router'
import DropdownMenuLandingPage from '../DropdownMenuLandingPage'
import UserWallet from '../UserWallet'
import { links } from '@/config/constant'

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  height: 60px;
  box-shadow: 0 4px 16px #0006;
  background-color: rgba(23, 37, 52, 0.8);
`

const MenuIner = styled(Flex)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const Title = styled(Text)`
  color: #fff;
  font-size: 32px;
  margin-left: 10px;
  display: none;

  @media ${devices.mobileM} {
    display: block;
  }
`

const Logo = styled(Image)`
  width: auto;
  height: 50px;
`

const MenuItems = styled(Flex)`
  gap: 10px;
  height: 100%;
  align-items: center;
  width: 70%;
  justify-content: flex-end;
`

const MenuItem = styled(Flex)`
  padding: 0 5px;
  cursor: pointer;
`

const MenuText = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  transition: all 0.3s;
  min-width: max-content;
  &:hover {
    color: #3dbb9a;
  }
`

const OptionBtn = styled(Flex)`
  border-radius: 10px;
  height: 100%;
  align-items: center;
  padding: 0 25px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: #50ff5093;
  border: 2px solid #51f55c;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
  }

  justify-content: center;
`

const PcBox = styled(Flex)`
  display: none;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  @media ${devices.laptop} {
    display: flex;
  }
`

const MbBox = styled(Flex)`
  display: flex;
  width: 100%;
  justify-content: end;
  @media ${devices.laptop} {
    display: none;
  }
`

const SwapHeader = () => {
  const { push } = useRouter()

  return (
    <StyledHeader
      suppressHydrationWarning
      className={dynaPuff.className}
    >
      <MenuIner>
        <Flex
          height="100%"
          alignItems="center"
          style={{
            cursor: 'pointer',
          }}
          onClick={() => push('/')}
        >
          <Logo
            src={LogoImg3}
            alt="logo"
          />

          <Title className={dynaPuff.className}>Bubbo</Title>
        </Flex>

        <MenuItems>
          <PcBox>
            <MenuItem onClick={() => push('/swap')}>
              <MenuText>Swap</MenuText>
            </MenuItem>
            <MenuItem onClick={() => push('/')}>
              <MenuText>Bubbles</MenuText>
            </MenuItem>
            <MenuItem onClick={() => push('/heatmap')}>
              <MenuText>Heatmap</MenuText>
            </MenuItem>
            <MenuItem onClick={() => push('/marketcapof')}>
              <MenuText>CapOf</MenuText>
            </MenuItem>
            <MenuItem onClick={() => push('/radar')}>
              <MenuText>Radar</MenuText>
            </MenuItem>
            <MenuItem onClick={() => push('/gallery')}>
              <MenuText>Gallery</MenuText>
            </MenuItem>
          </PcBox>

          <Flex>
            <UserWallet />
            <MbBox>
              <DropdownMenuLandingPage />
            </MbBox>
          </Flex>
        </MenuItems>
      </MenuIner>
    </StyledHeader>
  )
}

export default SwapHeader
