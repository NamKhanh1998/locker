import React, { useCallback } from 'react'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import styled from 'styled-components'
import { Switch } from '@mui/material'
import { themes } from '@/config'
import { useManageOptions } from '../Bubbles/hooks/useManageOptions'
import { useCheckBuboBalances } from '../Bubbles/hooks/useCheckBuboBalances'
import { toast } from 'react-toastify'

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: 'rgb(20, 242, 242)',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: 'rgb(130, 240, 240)',
  },
}))

const Title = styled(Text)`
  font-size: 20px;
  text-transform: uppercase;
  color: ${themes.luxury};
`

const BubboHolderSettings = () => {
  const {
    holderSettings: { rememberSetting },
    setHolderSettings,
  } = useManageOptions()

  const { isBalancesValid } = useCheckBuboBalances()

  const onCheckRememberSettings = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isBalancesValid) {
        setHolderSettings((p) => ({
          ...p,
          rememberSetting: event.target.checked,
        }))
      } else {
        toast.info(
          'Only for BUBO holders with a minimum of 5,000,000 BUBO. Connect your wallet to verify!',
          {
            position: 'top-center',
          }
        )
      }
    },
    [rememberSetting, setHolderSettings, isBalancesValid]
  )

  return (
    <Flex
      width="100%"
      flexDirection="column"
      pb="20px"
    >
      <Title>For BUBO holders</Title>

      <Flex alignItems="center">
        <Text>Auto-Save Settings</Text>
        <PinkSwitch
          checked={rememberSetting && isBalancesValid}
          onChange={onCheckRememberSettings}
        />
      </Flex>
    </Flex>
  )
}

export default BubboHolderSettings
