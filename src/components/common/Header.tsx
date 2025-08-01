import { devices, themes } from '@/config'
import { dynaPuff, orbitron } from '@/fonts'
import LogoImg3 from '@/public/bubo_logo.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import ConnectWallet from '../ConnectWallet'
import DropdownMenuLandingPage from '../DropdownMenuLandingPage'
import UserWallet from '../UserWallet'
import { links } from '@/config/constant'
import TrendingIcon from '../icons/TrendingIcon'

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
  background-color: #000;
  padding: 0 10px;
  height: 60px;
  box-shadow: 0 4px 16px #0006;
`

const MenuIner = styled(Flex)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const Title = styled(Text)`
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(
    to right,
    rgb(156, 226, 218),
    rgb(155, 242, 193)
  );
`

const Logo = styled(Image)`
  width: 25px;
  height: auto;
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
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
  min-width: max-content;
  &:hover {
    color: #3dbb9a;
  }
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

const Header = () => {
  const { push } = useRouter()

  return (
    <StyledHeader
      suppressHydrationWarning
      className={dynaPuff.className}
    >
      <MenuIner>
        <Flex
          height="100%"
          alignItems="flex-end"
          padding="16px 0"
          style={{
            cursor: 'pointer',
            gap: '8px',
          }}
          onClick={() => push('/')}
        >
          <Title className={orbitron.className}>LOCK</Title>
        </Flex>

        <MenuItems>
          <Flex>
            <UserWallet />
          </Flex>
        </MenuItems>
      </MenuIner>
    </StyledHeader>
  )
}

export default Header
