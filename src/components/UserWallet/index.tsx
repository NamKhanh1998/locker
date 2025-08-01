import React, { FC, useState } from 'react'
import Flex from '../commonStyled/Flex'
import { ConnectModal } from '@mysten/dapp-kit'
import ConnectButton from './ConnectBtn'

const UserWallet = () => {
  const [open, setOpen] = useState(false)
  return (
    <Flex>
      <ConnectModal
        trigger={
          <ConnectButton
            open={open}
            setOpen={setOpen}
          />
        }
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
    </Flex>
  )
}

export default UserWallet
