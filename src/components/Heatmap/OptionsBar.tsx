import React, { FC, useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import Box from '../commonStyled/Box'
import ArrowDownIcon from '../icons/ArrowDownIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import {
  BlockSize,
  NarrativeType,
  Options,
  PriceChangePercentage,
} from './type'
import SuiLogoImg from '@/public/chains/sui.png'
import SolLogoImg from '@/public/chains/sol.webp'
import BeraLogoImg from '@/public/chains/berachain.png'
import Image from 'next/image'
import { useManageOptions } from '../Bubbles/hooks/useManageOptions'
import { Chain } from '../Bubbles/bubbles.types'
import { keyBy } from 'lodash'
import { devices, dropdownVariantsFromTop } from '@/config'
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import { takeScreenShot } from './utils'

const OptionsWrap = styled(Flex)`
  width: 100%;
  max-width: calc(100vw - 20px);
  margin-bottom: 10px;
  justify-content: space-between;
  gap: 6px;

  @media ${devices.mobileL} {
    gap: 10px;
  }
`

const OptionBtn = styled(Flex)`
  border-radius: 8px;
  padding: 8px 10px;
  background-color: #3534346e;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
  position: relative;
`

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 50px;
  width: 100%;
  background-color: #262525c9;
  border: 1px solid #8c8c8c;
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  right: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 130px;
`

const DropdownItem = styled(Flex)`
  padding: 10px 15px;
  color: #b8b6b6;
  cursor: pointer;
  align-items: center;
  width: 100%;

  &:hover {
    background-color: #736f6f;
  }
`

const PcText = styled.span`
  display: none;
  margin-right: 2px;
  font-size: 16px;
  @media ${devices.tablet} {
    display: inline;
  }
`

const LeftSide = styled(Flex)`
  height: 100%;
  gap: 6px;

  @media ${devices.mobileL} {
    gap: 10px;
  }
`

const NarrativeItems = [
  {
    name: 'All',
    value: NarrativeType.ALL,
  },
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
    name: 'New Listing',
    value: NarrativeType.NEW,
  },
  {
    name: 'Others',
    value: NarrativeType.OTHERS,
  },
]

const BlockSizeItems = [
  {
    name: 'Market Cap',
    mbName: 'MKC',
    value: BlockSize.MKC,
  },
  {
    name: 'Volume',
    mbName: 'VOL',
    value: BlockSize.VOLUME,
  },
  {
    name: 'Liquidity',
    mbName: 'LIQ',
    value: BlockSize.LIQUIDITY,
  },
]

const PerformanceItems = [
  {
    name: '1 Hour',
    mbName: '1H',
    value: PriceChangePercentage.HOUR,
  },
  {
    name: '6 Hours',
    mbName: '6H',
    value: PriceChangePercentage.SIXHOURS,
  },
  {
    name: 'Day',
    mbName: 'Day',
    value: PriceChangePercentage.DAY,
  },
  {
    name: 'Week',
    mbName: 'Week',
    value: PriceChangePercentage.WEEK,
  },
  {
    name: 'Month',
    mbName: 'Month',
    value: PriceChangePercentage.MONTH,
  },
  {
    name: 'Year',
    mbName: 'Year',
    value: PriceChangePercentage.YEAR,
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

const OptionsBar: FC<{
  options: Options
  setOptions: React.Dispatch<React.SetStateAction<Options>>
  getImage: () => void
}> = ({ options, setOptions, getImage }) => {
  const [openSize, setOpenSize] = useState(false)
  const [openPerformance, setOpenPerformance] = useState(false)
  const [openNarrative, setOpenNarrative] = useState(false)

  const [openChain, setOpenChain] = useState(false)

  const dropDownRef = useRef(null)
  const btnRef: any = useRef(null)

  useClickAway(dropDownRef, (event) => {
    if (btnRef.current && btnRef.current.contains(event.target)) {
      return
    }
    setOpenSize(false)
  })

  const perDropDownRef = useRef(null)
  const perBtnRef: any = useRef(null)

  useClickAway(perDropDownRef, (event) => {
    if (perBtnRef.current && perBtnRef.current.contains(event.target)) {
      return
    }
    setOpenPerformance(false)
  })

  const narrativeDropDownRef = useRef(null)
  const narrativeBtnRef: any = useRef(null)

  useClickAway(narrativeDropDownRef, (event) => {
    if (
      narrativeBtnRef.current &&
      narrativeBtnRef.current.contains(event.target)
    ) {
      return
    }
    setOpenNarrative(false)
  })

  const chainDropDownRef = useRef(null)
  const chainBtnRef: any = useRef(null)

  useClickAway(chainDropDownRef, (event) => {
    if (chainBtnRef.current && chainBtnRef.current.contains(event.target)) {
      return
    }
    setOpenChain(false)
  })

  const {
    options: { chain },
    setOptions: setGlobalOptions,
  } = useManageOptions()

  const BlockSizeItemsMap = useMemo(() => {
    return keyBy(BlockSizeItems, 'value')
  }, [])

  const PerformanceItemsMap = useMemo(() => {
    return keyBy(PerformanceItems, 'value')
  }, [])

  const NarrativeItemsMap = useMemo(() => {
    return keyBy(NarrativeItems, 'value')
  }, [])

  const { isMobile } = useMatchBreakPoints()

  return (
    <OptionsWrap>
      <LeftSide>
        <OptionBtn
          onClick={() => setOpenSize((p) => !p)}
          ref={btnRef}
          minWidth={isMobile ? 'auto' : '135px'}
        >
          <Text>
            <PcText
              style={{
                color: '#ffffffb7',
              }}
            >
              Size:
            </PcText>{' '}
            <span
              style={{
                fontWeight: 700,
              }}
            >
              {isMobile
                ? BlockSizeItemsMap?.[options.blockSize]?.mbName
                : BlockSizeItemsMap?.[options.blockSize]?.name}
            </span>
          </Text>
          {!isMobile && (
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
          )}

          <AnimatePresence>
            {openSize && (
              <Dropdown
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariantsFromTop}
                ref={dropDownRef}
                style={{
                  left: 0,
                }}
              >
                {BlockSizeItems?.map((item) => (
                  <DropdownItem
                    key={item.value}
                    onClick={() =>
                      setOptions((p) => ({ ...p, blockSize: item.value }))
                    }
                  >
                    <Text>{item.name}</Text>
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </AnimatePresence>
        </OptionBtn>

        <OptionBtn
          onClick={() => setOpenPerformance((p) => !p)}
          ref={perBtnRef}
        >
          <Text>
            <PcText
              style={{
                color: '#ffffffb7',
              }}
            >
              Performance:
            </PcText>{' '}
            <span
              style={{
                fontWeight: 700,
              }}
            >
              {isMobile
                ? PerformanceItemsMap?.[options.performance]?.mbName
                : PerformanceItemsMap?.[options.performance]?.name}
            </span>
          </Text>
          {!isMobile && (
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
          )}

          <AnimatePresence>
            {openPerformance && (
              <Dropdown
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariantsFromTop}
                ref={perDropDownRef}
                style={{
                  left: 0,
                }}
              >
                {PerformanceItems?.map((item) => (
                  <DropdownItem
                    key={item.value}
                    onClick={() =>
                      setOptions((p) => ({ ...p, performance: item.value }))
                    }
                  >
                    <Text>{item.name}</Text>
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </AnimatePresence>
        </OptionBtn>

        {chain === Chain.SUI && (
          <OptionBtn
            onClick={() => setOpenNarrative((p) => !p)}
            ref={narrativeBtnRef}
          >
            <Text>
              <PcText
                style={{
                  color: '#ffffffb7',
                }}
              >
                Narrative:
              </PcText>{' '}
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                {NarrativeItemsMap?.[options.narrative]?.name}
              </span>
            </Text>
            {!isMobile && (
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
            )}

            <AnimatePresence>
              {openNarrative && (
                <Dropdown
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={dropdownVariantsFromTop}
                  ref={narrativeDropDownRef}
                  style={{
                    left: 0,
                  }}
                >
                  {NarrativeItems?.map((item) => (
                    <DropdownItem
                      key={item.value}
                      onClick={() =>
                        setOptions((p) => ({ ...p, narrative: item.value }))
                      }
                    >
                      <Text>{item.name}</Text>
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </AnimatePresence>
          </OptionBtn>
        )}
      </LeftSide>

      <LeftSide>
        {/* <OptionBtn onClick={getImage}>
          <CameraEnhanceIcon
            sx={{
              heigh: '20px',
              width: '20px',
              color: '#fff',
            }}
          />
        </OptionBtn> */}
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
              fontWeight={600}
              ml="5px"
              textTransform="uppercase"
            >
              {chain}
            </Text>
            {!isMobile && (
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
            )}
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
      </LeftSide>
    </OptionsWrap>
  )
}

export default OptionsBar
