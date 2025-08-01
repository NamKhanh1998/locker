import React, { FC, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import {
  useAccounts,
  useCurrentAccount,
  useDisconnectWallet,
  useSwitchAccount,
} from '@mysten/dapp-kit'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { formatAddress } from '../ConnectWallet/utils'
import { poppins } from '@/fonts'
import UserMenu from './UserMenu'

const Wrap = styled(Flex)`
  width: max-content;
  position: relative;
  height: 46px;
`

const ConnectBtn = styled(Flex)`
  border-radius: 10px;
  padding: 0 12px;
  background-color: #3534346e;
  cursor: pointer;
  transition: all 0.3s;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ffffff36;
  }
`

const WalletText = styled.p`
  max-width: 95px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  margin: 0;
  font-weight: 600;
`

const ConnectButton: FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
}> = ({ open, setOpen }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false)

  const currentAccount = useCurrentAccount()

  const buttonTitle = useMemo(() => {
    return currentAccount ? formatAddress(currentAccount?.address) : 'Connect'
  }, [currentAccount])

  const onBtnClick = useCallback(() => {
    if (!currentAccount) {
      setOpen(true)
    } else {
      setOpenUserMenu(true)
    }
  }, [setOpen, currentAccount])

  return (
    <>
      <Wrap className={poppins.className}>
        <ConnectBtn onClick={onBtnClick}>
          <WalletText>{buttonTitle}</WalletText>

          <Flex
            justifyContent="center"
            ml="4px"
          >
            <AccountBalanceWalletIcon
              style={{
                color: '#fff',
                height: '24px',
                width: '24px',
              }}
            />
          </Flex>
        </ConnectBtn>
      </Wrap>

      <UserMenu
        open={openUserMenu}
        setOpen={setOpenUserMenu}
      />
    </>
  )
}

export default ConnectButton
