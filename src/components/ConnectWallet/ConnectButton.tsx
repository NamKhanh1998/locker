import React, { FC, useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import {
  useAccounts,
  useCurrentAccount,
  useDisconnectWallet,
  useSwitchAccount,
} from '@mysten/dapp-kit'
import { formatAddress } from './utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useClickAway } from 'react-use'
import DoneIcon from '@mui/icons-material/Done'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { dropdownVariantsFromBot, dropdownVariantsFromTop } from '@/config'

const Wrap = styled(Flex)`
  width: max-content;
  position: relative;
  height: 46px;
`

const ConnectBtn = styled(Flex)`
  border-radius: 10px;

  background-color: #ffffff1f;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ffffff36;
  }
`
const Dropdown = styled(motion.div)<{
  $isMobile: boolean
  $invertDropdownOnMobile?: boolean
}>`
  position: absolute;

  width: 100%;
  background-color: #262525c9;
  border: 1px solid #8c8c8c;
  border-radius: 10px;
  overflow: hidden;
  z-index: 10;
  right: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  min-width: 200px;
  ${({ $isMobile, $invertDropdownOnMobile }) =>
    $isMobile && $invertDropdownOnMobile ? 'bottom: 50px' : 'top: 50px'}
`

const DropdownItem = styled(Flex)`
  padding: 10px 15px;
  color: #b8b6b6;
  cursor: pointer;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  &:hover {
    background-color: #736f6f;
  }
`

const WalletText = styled.p`
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  margin: 0;
`

const ConnectButton: FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  invertDropdownOnMobile?: boolean
}> = ({ open, setOpen, invertDropdownOnMobile }) => {
  const [showWalletDropDown, setShowWalletDropDown] = useState(false)
  const { mutate: disconnect } = useDisconnectWallet()
  const { mutate: switchAccount } = useSwitchAccount()
  const { isMobile } = useMatchBreakPoints()

  const accounts = useAccounts()
  const currentAccount = useCurrentAccount()

  const buttonTitle = useMemo(() => {
    return currentAccount
      ? currentAccount?.label || formatAddress(currentAccount?.address)
      : 'Connect'
  }, [currentAccount])

  const dropDownRef = useRef(null)
  const btnRef: any = useRef(null)

  useClickAway(dropDownRef, (event) => {
    if (btnRef.current && btnRef.current.contains(event.target)) {
      return
    }
    setShowWalletDropDown(false)
  })

  const onBtnClick = useCallback(() => {
    if (!currentAccount) {
      setOpen(true)
      return
    }

    setShowWalletDropDown((p) => !p)
  }, [currentAccount, disconnect, open, setOpen, showWalletDropDown])

  const onSwitchAccount = useCallback((account: any) => {
    switchAccount({
      account,
    })
    setShowWalletDropDown(false)
  }, [])

  return (
    <Wrap ml={isMobile ? '5px' : '10px'}>
      <ConnectBtn
        onClick={onBtnClick}
        ref={btnRef}
        width={isMobile ? 'max-content' : '130px'}
        padding={isMobile ? ' 8px 10px' : ' 8px 10px'}
      >
        <WalletText>{buttonTitle}</WalletText>

        {!currentAccount && (
          <Flex
            ml={isMobile ? '5px' : '5px'}
            justifyContent="center"
          >
            <AccountBalanceWalletIcon
              style={{
                color: '#fff',
                height: '24px',
                width: '24px',
              }}
            />
          </Flex>
        )}
        {currentAccount && (
          <>
            {isMobile && invertDropdownOnMobile ? (
              <KeyboardArrowUpIcon
                style={{
                  color: '#fff',
                  height: '24px',
                  width: '24px',
                }}
              />
            ) : (
              <ExpandMoreIcon
                style={{
                  color: '#fff',
                  height: '24px',
                  width: '24px',
                }}
              />
            )}
          </>
        )}
      </ConnectBtn>

      <AnimatePresence>
        {showWalletDropDown && (
          <Dropdown
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={
              isMobile && invertDropdownOnMobile
                ? dropdownVariantsFromBot
                : dropdownVariantsFromTop
            }
            ref={dropDownRef}
            $isMobile={isMobile}
            $invertDropdownOnMobile={invertDropdownOnMobile}
          >
            {accounts?.map((acc) => {
              return (
                <DropdownItem onClick={() => onSwitchAccount(acc)}>
                  <WalletText>
                    {acc?.label || formatAddress(acc?.address)}
                  </WalletText>
                  {currentAccount === acc && (
                    <DoneIcon
                      style={{
                        height: '20px',
                        width: '20px',
                      }}
                    />
                  )}
                </DropdownItem>
              )
            })}

            <DropdownItem
              borderTop="1px solid #8c8c8c"
              onClick={() => {
                disconnect()
                setShowWalletDropDown(false)
              }}
            >
              Disconnect
            </DropdownItem>
          </Dropdown>
        )}
      </AnimatePresence>
    </Wrap>
  )
}

export default ConnectButton
