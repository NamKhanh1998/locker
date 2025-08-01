import React, { FC, useState } from 'react'
import Flex from '../commonStyled/Flex'
import { ConnectModal } from '@mysten/dapp-kit'
import ConnectButton from './ConnectButton'

const ConnectWallet: FC<{ invertDropdownOnMobile?: boolean }> = ({
  invertDropdownOnMobile,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Flex>
      <ConnectModal
        trigger={
          <ConnectButton
            invertDropdownOnMobile={invertDropdownOnMobile}
            setOpen={setOpen}
            open={open}
          />
        }
        open={open}
        onOpenChange={(isOpen) => setOpen(isOpen)}
      />
    </Flex>
  )
}

export default ConnectWallet
