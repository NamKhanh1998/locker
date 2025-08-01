import { devices } from '@/config'
import { motion } from 'framer-motion'
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'

const Wrap = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 998;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`

const overlayFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const BodyLock = () => {
  useEffect(() => {
    if (document?.body?.style) {
      document.body.style.cssText = `
      overflow: hidden;
    `
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.cssText = `
        overflow: visible;
        overflow: overlay;
      `
      }
    }

    return undefined
  }, [])

  return null
}

const Overlay: FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setOpen }) => {
  return (
    <>
      <BodyLock />
      <Wrap
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayFade}
        transition={{
          type: 'tween',
          duration: 0.2,
          ease: 'easeOut',
        }}
        onClick={() => setOpen(false)}
      />
    </>
  )
}

export default Overlay
