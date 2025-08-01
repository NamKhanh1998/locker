import React, { FC, useRef, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { NarrativeType } from '../Heatmap/type'
import { devices, dropdownVariantsFromTop } from '@/config'
import SearchIconBold from '../icons/SearchIconBold'
import Box from '../commonStyled/Box'
import { Chain } from '../Bubbles/bubbles.types'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import Image from 'next/image'
import SuiLogoImg from '@/public/chains/sui.png'
import SolLogoImg from '@/public/chains/sol.webp'
import BeraLogoImg from '@/public/chains/berachain.png'
import ArrowDownIcon from '../icons/ArrowDownIcon'
import { useManageOptions } from '../Bubbles/hooks/useManageOptions'
import { IOptions } from './type'

const StyledOptions = styled(Flex)`
  padding: 10px;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
`

const Title = styled(Text)`
  font-size: 20px;
  font-weight: 600;
`

const Desc = styled(Text)`
  font-size: 12px;
  color: rgb(120, 135, 145);
  margin-top: 5px;
`

const TitleWrapper = styled(Flex)`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 0.1px solid rgba(255, 255, 255, 0.2);
`

const FilterWrapper = styled(Flex)`
  flex-direction: column;
  margin-top: 10px;
`

const NarrativeBtn = styled(Flex)<{ $active?: boolean }>`
  border-radius: 8px;
  transition: 0.2s;
  font-weight: 500;
  padding: 9px 10px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: max-content;

  background-color: ${(props) =>
    props.$active ? 'rgba(255, 255, 255, 0.153)' : 'transparent'};
  color: ${(props) => (props.$active ? '#fff' : 'rgb(177, 187, 206)')};

  &:hover {
    background-color: ${(props) =>
      !props.$active ? 'rgba(255, 255, 255, 0.05)' : ''};

    color: ${(props) => (!props.$active ? '#fff' : '')};
  }
`

const NarrativeWrapper = styled(Flex)`
  gap: 5px;
`

const SearchWrapper = styled(Flex)`
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 10px;
  position: relative;
  width: 100%;
  transition: 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  max-width: 800px;

  &:focus-within {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
  }
`

const StyledInput = styled.input<{
  error?: boolean
  fontSize?: string
  align?: string
}>`
  position: relative;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  white-space: nowrap;
  padding: 0px;
  line-height: 1;
  color: #fff;
  width: 100%;
  height: 20px;
  text-overflow: ellipsis;
  font-size: 14px;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
    color: #7d7a7a;
    font-size: 14px;
  }

  &:disabled {
    opacity: 1 !important;
    color: #fff;
    -webkit-text-fill-color: inherit;
    background-color: inherit;
  }
`

const Actions = styled(Flex)`
  width: 100%;
  margin-top: 6px;
  justify-content: space-between;
  gap: 10px;
`

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 50px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  right: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 130px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
`

const DropdownItem = styled(Flex)`
  padding: 10px 15px;
  color: #b8b6b6;
  cursor: pointer;
  align-items: center;
  width: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`
const OptionBtn = styled(Flex)`
  border-radius: 8px;
  padding: 0px 10px;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
  position: relative;
  height: 42px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: 0.2s;
`

const NarrativeItems = [
  {
    name: 'Meme',
    value: NarrativeType.MEME,
  },
  {
    name: 'Defi',
    value: NarrativeType.DEFI,
  },
  {
    name: 'AI',
    value: NarrativeType.AI,
  },
  {
    name: 'New',
    value: NarrativeType.NEW,
  },
  {
    name: 'Others',
    value: NarrativeType.OTHERS,
  },
]

const ChainItems = [
  {
    name: 'SUI',
    value: Chain.SUI,
  },
  {
    name: 'SOL',
    value: Chain.SOL,
  },
  {
    name: 'BERA',
    value: Chain.BERA,
  },
]

const RadarOptions: FC<{
  options: IOptions
  setOptions: React.Dispatch<React.SetStateAction<IOptions>>
  searchValue: string
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}> = ({ options, setOptions, searchValue, setSearchValue }) => {
  const {
    options: { chain },
    setOptions: setGlobalOptions,
  } = useManageOptions()

  const [openChain, setOpenChain] = useState(false)
  const chainDropDownRef = useRef(null)
  const chainBtnRef: any = useRef(null)

  useClickAway(chainDropDownRef, (event) => {
    if (chainBtnRef.current && chainBtnRef.current.contains(event.target)) {
      return
    }
    setOpenChain(false)
  })

  const onSelectNarrative = (narrative: NarrativeType) => {
    if (options.narrative === narrative) {
      setOptions((p) => ({ ...p, narrative: null }))
    } else {
      setOptions((p) => ({ ...p, narrative }))
    }
  }
  return (
    <StyledOptions>
      <TitleWrapper flexDirection="column">
        <Title>Radar</Title>
        <Desc>
          Compare volume and performance. Filter by category or chain to quickly
          spot promising tokens.
        </Desc>
      </TitleWrapper>

      <FilterWrapper>
        {chain === Chain.SUI && (
          <NarrativeWrapper>
            {NarrativeItems?.map((item) => (
              <NarrativeBtn
                key={item.value}
                onClick={() => onSelectNarrative(item.value)}
                $active={options.narrative === item.value}
              >
                {item.name}
              </NarrativeBtn>
            ))}
          </NarrativeWrapper>
        )}

        <Actions>
          <SearchWrapper>
            <Box
              mr="8px"
              mt="2px"
              height="18px"
            >
              <SearchIconBold
                height={18}
                width={18}
              />
            </Box>
            <StyledInput
              placeholder="Search Tokens"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </SearchWrapper>

          <OptionBtn
            onClick={() => setOpenChain((p) => !p)}
            ref={chainBtnRef}
          >
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
            <Flex style={{ gap: '5px' }}>
              <Text
                ml="5px"
                textTransform="uppercase"
              >
                {chain}
              </Text>

              <Box
                height={20}
                mt="2px"
              >
                <ArrowDownIcon
                  fill="#fff"
                  height={20}
                  width={20}
                />
              </Box>
            </Flex>

            <AnimatePresence>
              {openChain && (
                <Dropdown
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariantsFromTop}
                  ref={chainDropDownRef}
                >
                  {ChainItems?.map((item) => (
                    <DropdownItem
                      key={item.value}
                      onClick={() =>
                        setGlobalOptions((p) => ({ ...p, chain: item.value }))
                      }
                    >
                      <Image
                        src={
                          item.value === Chain.SUI
                            ? SuiLogoImg
                            : item.value === Chain.SOL
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
                      <Text ml="5px">{item.name}</Text>
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </AnimatePresence>
          </OptionBtn>
        </Actions>
      </FilterWrapper>
    </StyledOptions>
  )
}

export default RadarOptions
