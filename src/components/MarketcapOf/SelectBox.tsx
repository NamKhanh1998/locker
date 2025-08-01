import { devices, dropdownVariantsFromTop } from '@/config'
import useDebounce from '@/hooks/useDebounce'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { AnimatePresence, motion } from 'framer-motion'
import { FC, useMemo, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import styled from 'styled-components'
import Box from '../commonStyled/Box'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { SwapTokensList } from '../Swap/config/swapList'
import { ICurrency } from '../Swap/state'
import TokenLogo from '../TokenLogo'
import { tokensList } from '@/config/tokens/sui'

const Wrap = styled(Flex)`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  height: 46px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0 10px;
  align-items: center;
  position: relative;
  min-width: 300px;
`

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 50px;
  width: 100%;
  background: center center / cover rgba(23, 37, 52, 0.8);
  border: 0.1px solid rgba(255, 255, 255, 0.2);
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
    background-color: rgba(255, 255, 255, 0.05);
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

const MbBox = styled(Flex)`
  @media ${devices.laptop} {
    display: none;
  }
`

const PcBox = styled(Flex)`
  display: none;

  @media ${devices.mobileM} {
    display: flex;
  }
`

const IconWrap = styled(Box)`
  height: 24px;
  transition: all 0.2s;
`

const SelectedToken = styled(Flex)`
  width: 100%;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

const InputWrap = styled(Flex)`
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 10px 10px;
  &:focus-within {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
  }
  border-radius: 10px;
  transition: all 0.2s;
`

const SelectBox: FC<{
  token: ICurrency
  selectToken: (token: ICurrency) => void
}> = ({ token, selectToken }) => {
  const [isShow, setShow] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const debounceValue = useDebounce(searchValue, 500)

  const displayData = useMemo(() => {
    if (!debounceValue) return tokensList

    const filteredData = tokensList?.filter((coin) => {
      const searchLower = debounceValue.toLowerCase()
      return (
        coin.symbol.toLowerCase().includes(searchLower) ||
        coin.name.toLowerCase().includes(searchLower)
      )
    })

    return filteredData
  }, [debounceValue, tokensList])

  const onSelectToken = (token: ICurrency) => {
    selectToken(token)
    setShow(false)
  }

  const dropDownRef = useRef(null)
  const btnRef: any = useRef(null)

  useClickAway(dropDownRef, (event) => {
    if (btnRef.current && btnRef.current.contains(event.target)) {
      return
    }
    setShow(false)
  })

  return (
    <Wrap>
      <SelectedToken
        onClick={() => {
          setShow((p) => !p)
        }}
        ref={btnRef}
      >
        <Flex
          width="100%"
          alignItems="center"
        >
          <TokenLogo address={token?.pairAddress} />
          <Text
            ml="10px"
            textTransform="uppercase"
          >
            {token?.symbol}
          </Text>
        </Flex>

        <IconWrap
          style={{
            transform: isShow ? 'rotate(180deg)' : '',
          }}
        >
          <KeyboardArrowDownIcon
            sx={{
              color: 'rgb(216, 216, 216)',
            }}
          />
        </IconWrap>
      </SelectedToken>

      <AnimatePresence>
        {isShow && (
          <Dropdown
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariantsFromTop}
            ref={dropDownRef}
          >
            <Flex padding="10px 10px">
              <InputWrap>
                <Input
                  placeholder="Search tokens"
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </InputWrap>
            </Flex>

            <Flex
              width="100%"
              flexDirection="column"
              overflowY="auto"
              maxHeight="300px"
            >
              {displayData?.map((token: ICurrency) => (
                <DropdownItem
                  key={token?.address}
                  onClick={() => onSelectToken(token)}
                >
                  <Flex
                    alignItems="center"
                    height="100%"
                  >
                    <TokenLogo address={token.pairAddress} />
                    <Text
                      ml="5px"
                      textTransform="uppercase"
                    >
                      {token?.symbol}
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
            </Flex>
          </Dropdown>
        )}
      </AnimatePresence>
    </Wrap>
  )
}

export default SelectBox
