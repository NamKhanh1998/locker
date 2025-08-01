import React, { FC } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import Flex from '../commonStyled/Flex'
import Overlay from './Overlay'
import { devices, dropdownVariantsFromBot } from '@/config'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import MenuContent from './MenuContent'
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded'

const Wrap = styled(motion(Flex))`
  position: fixed;
  z-index: 999;
  right: 5px;
  top: 100px;
  bottom: 0px;
  left: 5px;

  @media ${devices.mobileM} {
    right: 5px;
    top: 5px;
    bottom: 5px;
    left: unset;
  }
`

const CloseBar = styled(Flex)`
  width: 65px;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 12px 0 0 12px;
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

const UserMenu: FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
}> = ({ open, setOpen }) => {
  const { isMobileM } = useMatchBreakPoints()

  return (
    <AnimatePresence>
      {open && (
        <>
          <Overlay setOpen={setOpen} />

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
            <MenuContent setOpen={setOpen} />
          </Wrap>
        </>
      )}
    </AnimatePresence>
  )
}

export default UserMenu
