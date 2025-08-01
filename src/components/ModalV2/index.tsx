import React, { FC, PropsWithChildren } from 'react'
import { AnimatePresence, LazyMotion } from 'framer-motion'
import { StyledModalWrapper } from './styles'
import Overlay from './Overlay'
import { useKeyPress, useKeyPressEvent } from 'react-use'

const DomMax = () => import('./motionDomMax').then((mod) => mod.default)

const ModalV2: FC<
  PropsWithChildren & {
    open: boolean
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    callBack?: () => any
    overlayBg?: string
  }
> = ({ open, setOpen, children, callBack, overlayBg }) => {
  useKeyPressEvent('Escape', () => {
    callBack?.()
    setOpen?.(false)
  })

  return (
    <LazyMotion features={DomMax}>
      <AnimatePresence>
        {open && (
          <StyledModalWrapper
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0, y: 50 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: overlayBg || '',
            }}
          >
            <Overlay
              onClick={() => {
                setOpen?.(false)
                callBack?.()
              }}
            />
            {children}
          </StyledModalWrapper>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}

export default ModalV2
