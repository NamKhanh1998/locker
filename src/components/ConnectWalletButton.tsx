import React, { FC, useState } from 'react'
import { ConnectModal } from '@mysten/dapp-kit'
import Flex from './commonStyled/Flex'
import styled from 'styled-components'

const ConnectButton = styled(Flex)`
  width: 100%;
  align-items: center;
  border: 0px;
  border-radius: 8px;
  background-color: #3dbb9a;
  height: 48px;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  &:hover {
    transform: scale(1.005);
    opacity: 0.9;
  }

  color: #fff;
`

const ConnectWalletButton = () => {
  const [open, setOpen] = useState(false)

  return (
    <Flex>
      <ConnectModal
        trigger={
          <ConnectButton onClick={() => setOpen(true)}>
            Connect Wallet{' '}
          </ConnectButton>
        }
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
    </Flex>
  )
}

export default ConnectWalletButton
