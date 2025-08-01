import React, { FC, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import HamburgerMenu from '../HamburgerMenu'
import { AnimatePresence, motion } from 'framer-motion'
import Text from '../commonStyled/Text'
import { useClickAway } from 'react-use'
import Box from '../commonStyled/Box'
import { links } from '@/config/constant'
import Link from 'next/link'
import { dropdownVariantsFromTop } from '@/config'
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle'
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt'
import ScaleIcon from '@mui/icons-material/Scale'
import RadarIcon from '@mui/icons-material/Radar'
import ImageIcon from '@mui/icons-material/Image'
import ArticleIcon from '@mui/icons-material/Article'
import HubIcon from '@mui/icons-material/Hub'
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import TrendingIcon from '../icons/TrendingIcon'

const Wrap = styled(Flex)`
  border-radius: 10px;
  padding: 8px 10px;
  background-color: #3534346e;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
  margin-left: 5px;
  &:hover {
    background-color: #ffffff36;
  }

  position: relative;
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
  min-width: 180px;
  background-color: #262525c9;
  border: 1px solid #8c8c8c39;
`

const DropdownItem = styled(Flex)`
  padding: 10px 15px;
  color: #b8b6b6;
  cursor: pointer;
  align-items: center;
  width: 100%;

  &:hover {
    background-color: #736f6f42;
  }
`

const SocialImg = styled.img`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;

  transition: all 0.1s;
  &:hover {
    transform: scale(1.06);
  }
`

const MenuItems = [
  {
    name: 'Swap',
    link: '/swap',
    target: '_self',
    imgUrl: '/swap.png',
    logo: SwapVerticalCircleIcon,
  },
  {
    name: 'Radar',
    link: '/radar',
    target: '_self',
    imgUrl: '/radar.png',
    logo: RadarIcon,
    isHot: true,
  },
  {
    name: 'MultiSend',
    link: '/multisend',
    target: '_self',
    imgUrl: '/swap.png',
    logo: DoubleArrowIcon,
  },
  {
    name: 'Heatmap',
    link: '/heatmap',
    target: '_self',
    imgUrl: '/heatmap.png',
    logo: ViewQuiltIcon,
  },
  {
    name: 'CapOf',
    link: '/marketcapof',
    target: '_self',
    imgUrl: '/compare.png',
    logo: ScaleIcon,
  },

  {
    name: 'Gallery',
    link: '/gallery',
    target: '_self',
    imgUrl: '/gallery.png',
    logo: ImageIcon,
  },

  {
    name: 'Docs',
    link: links.docs,
    target: '_blank',
    imgUrl: '/socials/gitbook.png',
    logo: ArticleIcon,
  },
]

const DropdownMenuLandingPage: FC<{
  isHoldersMap?: boolean
}> = ({ isHoldersMap = false }) => {
  const [open, setOpen] = useState(false)

  const dropDownRef = useRef(null)
  const btnRef: any = useRef(null)

  useClickAway(dropDownRef, (event) => {
    if (btnRef.current && btnRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  })

  const displayItems = useMemo(() => {
    if (!isHoldersMap) {
      return [
        {
          name: 'HoldersMap',
          link: '/holders-map',
          target: '_self',
          imgUrl: '/swap.png',
          logo: HubIcon,
        },
        ...MenuItems,
      ]
    }

    return [
      {
        name: 'Bubbles',
        link: '/',
        target: '_self',
        imgUrl: '/',
        logo: BubbleChartIcon,
      },

      ...MenuItems,
    ]
  }, [isHoldersMap, MenuItems])

  return (
    <Wrap
      onClick={() => setOpen((p) => !p)}
      ref={btnRef}
    >
      <Box>
        <HamburgerMenu open={open} />
      </Box>

      <AnimatePresence>
        {open && (
          <Dropdown
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariantsFromTop}
            ref={dropDownRef}
          >
            {displayItems?.map((item: any) => {
              const Logo = item?.logo as any
              return (
                <Link
                  key={item.link}
                  href={item.link}
                  target={item.target}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <DropdownItem key={item.link}>
                    {/* <SocialImg src={item.imgUrl} /> */}
                    {Logo ? <Logo /> : <></>}
                    <Text ml="5px">{item.name}</Text>

                    {item?.isHot && (
                      <Flex
                        ml="4px"
                        alignItems="center"
                      >
                        <TrendingIcon />
                      </Flex>
                    )}
                  </DropdownItem>
                </Link>
              )
            })}
          </Dropdown>
        )}
      </AnimatePresence>
    </Wrap>
  )
}

export default DropdownMenuLandingPage
