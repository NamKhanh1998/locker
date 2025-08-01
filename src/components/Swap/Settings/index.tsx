import React, { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import styled from 'styled-components'
import Flex from '@/components/commonStyled/Flex'
import SettingModal from './SettingModal'

const IconWrap = styled(Flex)`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`

const Settings = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Flex>
        <IconWrap onClick={() => setOpen(true)}>
          <SettingsIcon
            sx={{
              color: '#fff',
              height: '28px',
              width: '28px',
            }}
          />
        </IconWrap>
      </Flex>

      <SettingModal
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default Settings
