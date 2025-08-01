import React from 'react'
import ModalV2 from '../ModalV2'
import { useManageSelectedToken } from '../Bubbles/hooks/useManageSelectedToken'
import TokenModalContent from './TokenModalContent'

const TokenModal = () => {
  const { setSelectedToken, selectedToken } = useManageSelectedToken()

  const onClose = () => {
    setSelectedToken({ selectedToken: null })
  }
  return (
    <ModalV2
      open={!!selectedToken}
      callBack={onClose}
      overlayBg="#76767657"
    >
      <TokenModalContent />
    </ModalV2>
  )
}

export default TokenModal
