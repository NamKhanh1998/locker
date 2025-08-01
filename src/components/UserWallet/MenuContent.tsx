import { poppins } from '@/fonts'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import {
  useAccounts,
  useCurrentAccount,
  useDisconnectWallet,
} from '@mysten/dapp-kit'
import React, { FC, useMemo } from 'react'
import styled from 'styled-components'
import { formatAddress } from '../ConnectWallet/utils'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import CircleAvartaIcon from '../icons/CircleAvartaIcon'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import Copy from '../Copy'
import WalletAddress from './WalletAddress'
import BalanceList from './BalanceList'
import { Box } from '@mui/material'
import { useElementSize } from '@/hooks/useElementSize'
import { size, sumBy } from 'lodash'
import { useFecthUserBalancesWithDetails } from './hooks/useFecthUserBalancesWithDetails'
import { formatNumber } from '../utils'
import { useTransferToken } from './hooks/useTransferToken'
import { BUBO, SUI } from '../Swap/state'
import { devices } from '@/config'
import SendIcon from '../icons/SendIcon'

const Wrap = styled(Flex)`
  width: 100%;
  flex-direction: column;
  background-color: aliceblue;
  border-radius: 8px 8px 0 0;
  background: rgba(23, 37, 52, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media ${devices.mobileM} {
    border-radius: 8px;

    width: 340px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`

const Header = styled(Flex)`
  padding: 16px;
  padding-bottom: 0;
  width: 100%;
  align-items: center;
  height: fit-content;
  justify-content: space-between;
  z-index: 11;
`

const IconWrap = styled(Flex)`
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`

const Body = styled(Flex)`
  margin-top: 8px;
  flex-direction: column;
`

const Balance = styled(Flex)`
  margin-top: 10px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  justify-content: space-between;
`

const SendButton = styled(Flex)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: rgb(255, 255, 255);
  padding: 8px;
  height: 50px;
  width: 50px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  justify-content: center;
  align-items: center;

  &:focus-within {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
  }

  &:hover {
    border: 1px solid #3dbb9a;
    box-shadow: 0px 0px 3px 0px #3dbb9a;
    transform: scale(1.03);
  }
`
const MenuContent: FC<{
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setOpen }) => {
  const account = useCurrentAccount()
  const { mutate: disconnect } = useDisconnectWallet()
  const accounts = useAccounts()

  const onDisconnect = () => {
    disconnect()
    setOpen(false)
  }

  const [ref, elSize] = useElementSize()

  const { data, isLoading, refetch } = useFecthUserBalancesWithDetails()

  const totalBalanceInUsd = useMemo(() => {
    if (!data) return 0

    return sumBy(
      data,
      (token) => Number(token?.balance || 0) * Number(token?.price || 0)
    )
  }, [data])

  return (
    <>
      {account && (
        <Wrap
          className={poppins.className}
          ref={ref}
        >
          <Header>
            <Flex alignItems="center">
              <CircleAvartaIcon />
              <Text margin="0 5px">
                {formatAddress(account?.address || '', {
                  first: 4,
                  last: -6,
                })}
              </Text>

              <Copy
                stringCopy={account?.address}
                height={14}
                width={14}
              />

              <IconWrap
                onClick={() =>
                  window.open(
                    `https://suivision.xyz/account/${account?.address}`
                  )
                }
              >
                <OpenInNewIcon
                  sx={{
                    height: '16px',
                    width: '16px',
                    color: '#c1bcbc',
                  }}
                />
              </IconWrap>
            </Flex>

            <IconWrap onClick={onDisconnect}>
              <PowerSettingsNewIcon
                sx={{
                  height: '25px',
                  width: '25px',
                  color: '#c1bcbc',
                }}
              />
            </IconWrap>
          </Header>

          <Body>
            <Flex
              width="100%"
              padding="0 16px"
            >
              <WalletAddress />
            </Flex>

            <Box padding="0 16px">
              <Balance>
                <Flex flexDirection="column">
                  <Text
                    fontSize="12px"
                    lineHeight={1}
                    color="#c1bcbc"
                  >
                    Total Balance
                  </Text>
                  <Text
                    ellipsis
                    maxWidth={230}
                    lineHeight={1}
                    fontSize="26px"
                    marginTop="12px"
                  >
                    $
                    {totalBalanceInUsd > 100000
                      ? formatNumber(totalBalanceInUsd)
                      : totalBalanceInUsd?.toLocaleString(undefined, {
                          maximumFractionDigits: 5,
                        })}
                  </Text>
                </Flex>

                {/* <SendButton>
                  <SendIcon
                    height="25px"
                    width="25px"
                  />
                </SendButton> */}
              </Balance>
            </Box>

            <Text
              mt="10px"
              fontSize="14px"
              padding="0 16px"
            >
              Token
            </Text>

            <Box maxHeight={elSize?.height - (size(accounts) > 1 ? 230 : 195)}>
              <BalanceList
                balances={data}
                isLoading={isLoading}
                setOpen={setOpen}
              />
            </Box>
          </Body>
        </Wrap>
      )}
    </>
  )
}

export default MenuContent
