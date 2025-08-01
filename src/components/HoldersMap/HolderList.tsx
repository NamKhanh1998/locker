import { devices, dropdownVariantsFromBot } from '@/config'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded'
import SearchIcon from '@mui/icons-material/Search'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { formatAddress } from '../ConnectWallet/utils'
import Copy from '../Copy'
import { NodeType } from './type'
import useDebounce from '@/hooks/useDebounce'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import GroupIcon from '@mui/icons-material/Group'
import Tippy from '@tippyjs/react'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

const Wrap = styled(motion(Flex))`
  position: fixed;
  right: 5px;
  top: 220px;
  bottom: 0px;
  left: 5px;
  z-index: 9;

  @media ${devices.mobileM} {
    right: 0px;
    top: 60px;
    bottom: 0px;
    left: unset;
  }
`

const CloseBar = styled(Flex)`
  width: 65px;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  right: -8px;
  padding: 16px;
  padding-top: 20px;

  &:hover {
    right: -12px;
    background-color: rgba(255, 255, 255, 0.05);
  }

  display: none;
  @media ${devices.mobileM} {
    display: flex;
  }
`

const IconWrap = styled(Flex)`
  width: 100%;
  height: 100%;
  position: relative;
`

const List = styled(Flex)`
  width: 100%;
  flex-direction: column;
  background-color: aliceblue;
  background-color: #212020;
  border-left: 1px solid #333;
  border-bottom: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px 8px 0px 0px;

  @media ${devices.mobileM} {
    width: 340px;
    border-radius: 0px;
  }
`

const Wallets = styled(Flex)`
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
`
const GroupColor = styled(Flex)<{ color: string }>`
  height: 40px;
  width: 3px;
  background-color: ${({ color }) => (color ? color : 'transparent')};
`

const Wallet = styled(Flex)<{ $active: boolean }>`
  padding: 10px;
  padding-left: 7px;
  height: 40px;
  width: 100%;
  cursor: pointer;

  ${({ $active }) =>
    $active
      ? css`
          background: linear-gradient(145deg, #56ff9fbe, #fefeff18);
        `
      : css`
          &:hover {
            background: linear-gradient(145deg, #56ff9f66, #fefeff18);
          }
        `}
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #333;
`

const SearchContainer = styled.div`
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #333;
`

const SearchWrap = styled(Flex)`
  height: 100%;
  border-radius: 10px;
  border: 1px solid #8c8c8c39;
  height: 40px;
  background-color: #262525;
  padding: 0 10px;
  align-items: center;
  position: relative;
  transition: all 0.3s;

  &:focus-within {
    border: 1px solid #9bf2c1; // Change border color when focused
  }

  @media ${devices.tablet} {
    width: 100%;
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  background-color: none;
  background: none;
  color: #b8b6b6;

  &::placeholder {
    color: #b8b6b644;
  }
`

const ViewModeBtn = styled(Flex)`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
  }
`

const HeaderOptionsCOntainer = styled(Flex)`
  width: 100%;
  justify-content: space-between;

  @media ${devices.mobileM} {
    justify-content: flex-end;
  }
`

const CloseMbBtn = styled(ViewModeBtn)`
  @media ${devices.mobileM} {
    display: none;
  }
`

const slideIn = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: '0%', opacity: 1 },
  exit: { x: '100%', opacity: 0 },
}

const transition = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeOut',
}

enum ViewMode {
  GROUP = 'GROUP',
  RANK = 'RANK',
}

const HolderList: FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  data?: string
  selectedNode: NodeType | null
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeType | null>>
}> = ({ setOpen, open, data, selectedNode, setSelectedNode }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GROUP)
  const { isMobileM } = useMatchBreakPoints()

  const { nodes } = useMemo(() => {
    if (!data) return { nodes: [] }

    const parsedData = JSON.parse(data)

    return {
      nodes: parsedData?.nodes as NodeType[],
    }
  }, [data])

  const debounceSearch = useDebounce(searchTerm, 300)

  const filteredNodes = useMemo(() => {
    if (!nodes) return []

    if (viewMode === ViewMode.RANK) {
      return debounceSearch
        ? nodes.filter((node) => node?.user?.includes(debounceSearch))
        : nodes
    }

    let displayNodes = nodes

    if (viewMode === ViewMode.GROUP) {
      const groupMap = nodes.reduce(
        (acc: Record<string, typeof nodes>, node) => {
          const group = node.group ?? '0'
          if (!acc[group]) acc[group] = []
          acc[group].push(node)
          return acc
        },
        {}
      )

      displayNodes = [
        ...Object.entries(groupMap)
          .filter(([key]) => key !== '0')
          .flatMap(([, groupNodes]) => groupNodes),
        ...(groupMap['0'] || []),
      ]
    }

    if (debounceSearch) {
      return displayNodes.filter((node) => node?.user?.includes(debounceSearch))
    }

    return displayNodes
  }, [nodes, debounceSearch, viewMode])

  return (
    <AnimatePresence>
      {open && (
        <>
          <Wrap
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={isMobileM ? dropdownVariantsFromBot : slideIn}
            transition={transition}
          >
            <CloseBar onClick={() => setOpen(false)}>
              <IconWrap>
                <KeyboardDoubleArrowRightRoundedIcon
                  sx={{
                    height: '24px',
                    width: '24px',
                    color: 'rgba(255, 255, 255, 0.65)',
                  }}
                />
              </IconWrap>
            </CloseBar>
            <List>
              <Header>
                <Text
                  fontSize="18px"
                  fontWeight={600}
                  minWidth="max-content"
                  mr="10px"
                >
                  Holders List
                </Text>

                <HeaderOptionsCOntainer>
                  <Flex>
                    <Tippy
                      content={<Text fontSize="12px">Sorted by Rank</Text>}
                    >
                      <ViewModeBtn onClick={() => setViewMode(ViewMode.RANK)}>
                        <MilitaryTechIcon
                          sx={{
                            height: '24px',
                            width: '24px',
                            color:
                              viewMode === ViewMode.RANK
                                ? '#fff'
                                : 'rgba(255, 255, 255, 0.40)',
                          }}
                        />
                      </ViewModeBtn>
                    </Tippy>
                    <Tippy
                      content={
                        <Text fontSize="12px">Grouped by Connection</Text>
                      }
                    >
                      <ViewModeBtn onClick={() => setViewMode(ViewMode.GROUP)}>
                        <GroupIcon
                          sx={{
                            height: '24px',
                            width: '24px',
                            color:
                              viewMode === ViewMode.GROUP
                                ? '#fff'
                                : 'rgba(255, 255, 255, 0.40)',
                          }}
                        />
                      </ViewModeBtn>
                    </Tippy>
                  </Flex>

                  <CloseMbBtn onClick={() => setOpen(false)}>
                    <KeyboardDoubleArrowDownIcon
                      sx={{
                        height: '24px',
                        width: '24px',
                        color: '#fff',
                      }}
                    />
                  </CloseMbBtn>
                </HeaderOptionsCOntainer>
              </Header>
              <SearchContainer>
                <SearchWrap mr="5px">
                  <SearchIcon
                    style={{
                      height: '24px',
                      width: '24px',
                      color: '#8c8c8c7d',
                    }}
                  />
                  <Input
                    placeholder="Search wallets"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchWrap>
              </SearchContainer>

              <Wallets>
                {filteredNodes?.map((wallet: any, index) => {
                  if (wallet?.user) {
                    return (
                      <Flex>
                        <GroupColor
                          color={
                            wallet?.group !== 0 && viewMode === ViewMode.GROUP
                              ? wallet.color
                              : null
                          }
                        />
                        <Wallet
                          alignItems="center"
                          justifyContent="space-between"
                          $active={selectedNode?.user === wallet?.user}
                          onClick={() => setSelectedNode(wallet)}
                          key={wallet?.user}
                        >
                          <Flex alignItems="center">
                            <Flex
                              justifyContent="flex-start"
                              minWidth="35px"
                            >
                              <Text
                                fontSize="14px"
                                fontWeight={600}
                                color={wallet?.color}
                              >
                                #{wallet?.rank}
                              </Text>
                            </Flex>

                            <Text
                              ml="3px"
                              // color="#b8b6b6"
                              fontSize="14px"
                            >
                              {formatAddress(wallet?.user, {
                                first: 6,
                                last: -6,
                              })}
                              :
                            </Text>

                            <Text
                              ml="5px"
                              // color="#b8b6b6"
                              fontWeight={600}
                              fontSize="14px"
                            >
                              {wallet?.percentage?.toLocaleString(undefined, {
                                maximumFractionDigits: 3,
                              })}
                              %
                            </Text>
                          </Flex>

                          <Flex
                            alignItems="center"
                            pr="5px"
                          >
                            <IconWrap mr="4px">
                              <Link
                                href={`https://suivision.xyz/account/${wallet.user}`}
                                target="_blank"
                                style={{
                                  height: '14px',
                                }}
                              >
                                <Image
                                  src="/socials/suivision.png"
                                  height={14}
                                  width={14}
                                  alt="sui"
                                />
                              </Link>
                            </IconWrap>
                            <Copy
                              stringCopy={wallet.user}
                              height={14}
                              width={14}
                            />
                          </Flex>
                        </Wallet>
                      </Flex>
                    )
                  }
                })}
              </Wallets>
            </List>
          </Wrap>
        </>
      )}
    </AnimatePresence>
  )
}

export default HolderList
