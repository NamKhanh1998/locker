import React, { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { formatAddress } from '../ConnectWallet/utils'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DoneIcon from '@mui/icons-material/Done'
import {
  useAccounts,
  useCurrentAccount,
  useSwitchAccount,
} from '@mysten/dapp-kit'
import { AnimatePresence, motion } from 'framer-motion'
import Box from '../commonStyled/Box'
import { dropdownVariantsFromTop } from '@/config'
import { useClickAway } from 'react-use'
import { size } from 'lodash'

const Wrap = styled(Flex)`
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  padding: 6px 0px;
  position: relative;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`

const Dropdown = styled(motion.div)`
  position: absolute;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  z-index: 10;
  background: rgba(23, 37, 52, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  top: 40px;
  padding: 6px 0;
`

const DropDownItem = styled(Flex)`
  width: 100%;
  padding: 8px 6px;
  cursor: pointer;
  transition: all 0.2s;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`

const WalletText = styled.p`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #b8b8b8;
  margin: 0;
  padding-left: 10px;
  font-size: 14px;
`

const IconWrap = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const WalletAddress = () => {
  const [showWalletDropDown, setShowWalletDropDown] = useState(false)

  const account = useCurrentAccount()
  const accounts = useAccounts()
  const { mutate: switchAccount } = useSwitchAccount()

  const dropDownRef = useRef(null)
  const btnRef: any = useRef(null)

  useClickAway(dropDownRef, (event) => {
    if (btnRef.current && btnRef.current.contains(event.target)) {
      return
    }
    setShowWalletDropDown(false)
  })

  const onSwicthAccount = useCallback(
    (account: any) => {
      switchAccount({ account })
      setShowWalletDropDown(false)
    },
    [switchAccount]
  )

  return (
    <>
      {size(accounts) > 1 && (
        <Box
          position="relative"
          width="100%"
        >
          <Wrap
            ref={btnRef}
            onClick={() => {
              if (size(accounts) > 1) setShowWalletDropDown(true)
            }}
          >
            <WalletText>
              {account?.label ||
                formatAddress(account?.address || '', {
                  first: 6,
                  last: -6,
                })}
            </WalletText>

            {size(accounts) > 1 && (
              <ExpandMoreIcon
                sx={{
                  height: '22px',
                  width: '22px',
                  color: '#c1bcbc',
                }}
              />
            )}
          </Wrap>
          <AnimatePresence>
            {showWalletDropDown && (
              <Dropdown
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariantsFromTop}
                ref={dropDownRef}
              >
                {accounts?.map((acc) => (
                  <DropDownItem
                    key={acc?.address}
                    onClick={() => onSwicthAccount(acc)}
                  >
                    <WalletText
                      style={{
                        maxWidth: '200px',
                        paddingLeft: '6px',
                      }}
                    >
                      {acc?.label ||
                        formatAddress(acc?.address || '', {
                          first: 8,
                          last: -10,
                        })}
                    </WalletText>

                    {acc?.address === account?.address && (
                      <DoneIcon
                        sx={{
                          height: '14px',
                          width: '14px',
                          color: '#c1bcbc',
                        }}
                      />
                    )}
                  </DropDownItem>
                ))}
              </Dropdown>
            )}
          </AnimatePresence>
        </Box>
      )}
    </>
  )
}

export default WalletAddress
