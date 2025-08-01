import { devices, dropdownVariantsFromTop, themes } from '@/config'
import { dynaPuff, orbitron } from '@/fonts'
import LogoImg3 from '@/public/bubo_logo.png'
import BeraLogoImg from '@/public/chains/berachain.png'
import SolLogoImg from '@/public/chains/sol.webp'
import SuiLogoImg from '@/public/chains/sui.png'
import Image from 'next/image'
import { FC, useMemo, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import Modal from '../Modal'
import SettingModalContent from '../SettingModalContent'
import useDebounce from '@/hooks/useDebounce'
import SearchIcon from '@mui/icons-material/Search'
import SettingsIcon from '@mui/icons-material/Settings'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import DropdownMenu from '../DropdownMenu'
import UserWallet from '../UserWallet'
import { Chain, SpecialSortType } from './bubbles.types'
import { useFetchAndManageCoins } from './hooks/useFetchCoins'
import { useManageOptions } from './hooks/useManageOptions'
import { useManageSelectedToken } from './hooks/useManageSelectedToken'
import { getDefaultSearchList } from './lib/utils'

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
  background-color: ${themes.headerBackgroundColor};
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

const SelectButton = styled(Flex)`
  border-radius: 10px;
  padding: 8px 15px;
  background-color: #3534346e;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
  &:hover {
    background-color: #ffffff36;
  }
`

const IconWrap = styled(Flex)`
  border-radius: 50%;
  padding: 5px;
  background-color: #3534346e;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #ffffff36;
  }
  min-width: 46px;
  align-items: center;
  justify-content: center;
`

const MbBox = styled(Flex)`
  @media ${devices.laptop} {
    display: none;
  }
`

const PcBox = styled(Flex)`
  display: none;

  @media ${devices.laptop} {
    display: flex;
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 16px;
  background-color: none;
  background: none;
  color: #b8b6b6;

  &::placeholder {
    color: #b8b6b644;
  }
`

const SearchWrap = styled(Flex)`
  height: 100%;
  max-width: 500px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid #8c8c8c39;
  height: 46px;
  background-color: #262525;
  padding: 0 10px;
  align-items: center;
  position: relative;
  transition: all 0.3s;

  &:focus-within {
    border: 1px solid #9bf2c1; // Change border color when focused
  }

  width: 210px;

  @media ${devices.tablet} {
    width: 500px;
  }
`

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 50px;
  width: 100%;
  background-color: #262525c9;
  border: 1px solid #8c8c8c39;
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  right: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 250px;
`

const DropdownItem = styled(Flex)`
  padding: 10px 15px;
  color: #b8b6b6;
  cursor: pointer;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  &:hover {
    background-color: #736f6f42;
  }
`

const ConnectWalletWrap = styled(Flex)`
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const getChangeColor = (percent: number) => {
  if (percent === 0) return '#bcb9b9'
  if (percent > 0) return '#51f55c'
  return '#ff6666'
}

const Header: FC<{}> = () => {
  const [isOpenSetting, setIsOpenSetting] = useState(false)

  const {
    options: { page, pagesRange, performance, chain, specialSortType },
  } = useManageOptions()

  const { setSelectedToken } = useManageSelectedToken()

  const currentRange = useMemo(() => {
    if (specialSortType) {
      return specialSortType === SpecialSortType.GAINERS ? 'Gainers' : 'Losers'
    }

    const item = pagesRange?.find((_: any) => _?.page === page)
    return (item as any)?.range
  }, [pagesRange, page, specialSortType])

  const [isShowSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const debounceValue = useDebounce(searchValue, 500)

  const { fullData, fullDataMap } = useFetchAndManageCoins()

  const displayData = useMemo(() => {
    if (!debounceValue) return getDefaultSearchList(fullData!, fullDataMap)

    const filteredData = fullData?.filter((coin) => {
      const searchLower = debounceValue.toLowerCase()
      return (
        coin.symbol.toLowerCase().includes(searchLower) ||
        coin.name.toLowerCase().includes(searchLower)
      )
    })

    return filteredData?.slice(0, 10)
  }, [debounceValue, fullData, fullDataMap])

  const { push } = useRouter()

  return (
    <>
      <StyledHeader
        suppressHydrationWarning
        className={dynaPuff.className}
      >
        <MenuIner>
          <Flex
            height="100%"
            alignItems="flex-end"
            style={{
              cursor: 'pointer',
              gap: '8px',
            }}
            padding="16px 0"
            onClick={() => push('/')}
          >
            <Logo
              src={LogoImg3}
              alt="logo"
            />
            <PcBox>
              <Title className={orbitron.className}>Bubbo</Title>
            </PcBox>
          </Flex>

          <Flex>
            <SearchWrap mr="5px">
              <SearchIcon
                style={{
                  height: '28px',
                  width: '28px',
                  color: isShowSearch ? '#9bf2c1' : '#8c8c8c7d',
                }}
              />
              <Input
                placeholder="Search tokens"
                onFocus={() => setShowSearch(true)}
                onBlur={() => setShowSearch(false)}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <AnimatePresence>
                {isShowSearch && (
                  <Dropdown
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariantsFromTop}
                  >
                    {displayData?.map((token) => (
                      <DropdownItem
                        key={token?.address}
                        onClick={() => {
                          setSelectedToken({ selectedToken: token as any })
                          setSearchValue('')
                        }}
                      >
                        <Flex
                          alignItems="center"
                          height="100%"
                        >
                          <Image
                            src={`/tokens/${chain}/${token?.pairAddress?.toLowerCase()}.png`}
                            alt="token-logo"
                            width={25}
                            height={25}
                            style={{
                              borderRadius: '50%',
                            }}
                          />
                          <Text
                            ml="5px"
                            textTransform="uppercase"
                            fontSize="14px"
                          >
                            {token?.symbol}
                          </Text>

                          <Text
                            fontSize="14px"
                            ml="5px"
                            color={getChangeColor(token?.[performance])}
                          >
                            ({token?.[performance]?.toFixed(2)}%)
                          </Text>
                        </Flex>

                        <PcBox>
                          <Flex
                            alignItems="center"
                            height="100%"
                          >
                            <Text
                              fontSize="14px"
                              ml="5px"
                              color="#b8b6b6"
                              textTransform="uppercase"
                            >
                              {token?.name}
                            </Text>
                          </Flex>
                        </PcBox>
                      </DropdownItem>
                    ))}
                  </Dropdown>
                )}
              </AnimatePresence>
            </SearchWrap>
            <PcBox
              style={{
                gap: '5px',
              }}
              alignItems="center"
            >
              <SelectButton onClick={() => setIsOpenSetting((p) => !p)}>
                <Text
                  fontWeight={600}
                  fontSize="16px"
                  className={dynaPuff.className}
                  minWidth="max-content"
                >
                  {currentRange}
                </Text>
              </SelectButton>
              <SelectButton onClick={() => setIsOpenSetting((p) => !p)}>
                <Image
                  src={
                    chain === Chain.SUI
                      ? SuiLogoImg
                      : chain === Chain.SOL
                      ? SolLogoImg
                      : BeraLogoImg
                  }
                  alt="chainlogo"
                  style={{
                    height: '20px',
                    width: '20px',
                    borderRadius: '50%',
                  }}
                />
                <Text
                  ml="5px"
                  fontSize="16px"
                  className={dynaPuff.className}
                  minWidth="max-content"
                  fontWeight={600}
                >
                  {chain === Chain.SUI
                    ? 'SUI'
                    : chain === Chain.SOL
                    ? 'SOL'
                    : 'BERA'}
                </Text>
              </SelectButton>
            </PcBox>

            <MbBox>
              <IconWrap onClick={() => setIsOpenSetting((p) => !p)}>
                <SettingsIcon
                  sx={{
                    color: '#fff',
                    height: '30px',
                    width: '30px',
                  }}
                />
              </IconWrap>
            </MbBox>

            <ConnectWalletWrap ml="5px">
              <UserWallet />
            </ConnectWalletWrap>
            <DropdownMenu />
          </Flex>
        </MenuIner>
      </StyledHeader>

      <Modal
        isOpen={isOpenSetting}
        onClose={() => setIsOpenSetting(false)}
      >
        <SettingModalContent onClose={() => setIsOpenSetting(false)} />
      </Modal>
    </>
  )
}

export default Header
