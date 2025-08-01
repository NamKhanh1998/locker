import React, { FC } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import TokenLogo from '../TokenLogo'
import Text from '../commonStyled/Text'
import Copy from '../Copy'
import Link from 'next/link'
import Image from 'next/image'
import { NodeType } from './type'
import { formatAddress } from '../ConnectWallet/utils'
import { formatNumber } from '../Heatmap/utils'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tippy from '@tippyjs/react'
import { ICurrency } from '../Swap/state'
import { toUpper } from 'lodash'

const Wrap = styled(Flex)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 200px;
  height: fit-content;
  background-color: #212020bf;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 8px;
  flex-direction: column;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
`

const WalletDetail: FC<{
  selectedNode: NodeType | null
  selectToken: ICurrency
}> = ({ selectedNode, selectToken }) => {
  return (
    <Wrap>
      <Flex
        alignItems="center"
        height="30px"
        width="100%"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <TokenLogo
            address={selectToken.pairAddress}
            height={30}
            width={30}
          />
          <Text
            ml="5px"
            fontWeight={600}
          >
            {toUpper(selectToken.symbol)}
          </Text>
        </Flex>
        <Tippy
          content={
            <Text fontSize="12px">
              Data is updated every hour. Nodes that are connected have been
              detected based on transfer activity between wallets — meaning
              linked wallets may belong to the same user. Data powered by Nexa.
            </Text>
          }
        >
          <Flex>
            <HelpOutlineIcon
              sx={{
                height: '20px',
                width: '20px',
                color: 'rgba(255, 255, 255, 0.805)',
              }}
            />
          </Flex>
        </Tippy>
      </Flex>

      {!!selectedNode && (
        <>
          <Flex mt="5px">
            <Text
              mr="5px"
              fontWeight={600}
              fontSize="14px"
            >
              Rank
            </Text>
            <Text
              fontSize="14px"
              fontWeight={600}
              color={selectedNode?.color}
            >
              #{selectedNode?.rank}
            </Text>
          </Flex>

          <Flex
            mt="5px"
            alignItems="center"
          >
            <Text
              fontSize="14px"
              mr="5px"
            >
              {formatAddress(selectedNode?.user, { first: 6, last: -6 })}
            </Text>

            <Copy
              stringCopy={selectedNode?.user}
              height={14}
              width={14}
            />
            <Link
              href={`https://suivision.xyz/account/${selectedNode?.user}`}
              target="_blank"
              style={{
                height: '14px',
                marginLeft: '5px',
              }}
            >
              <Image
                src="/socials/suivision.png"
                height={14}
                width={14}
                alt="sui"
              />
            </Link>
          </Flex>

          <Flex mt="5px">
            <Text
              fontWeight={600}
              fontSize="14px"
              mr="5px"
            >
              Amount:
            </Text>
            <Text
              fontWeight={600}
              fontSize="14px"
            >
              {formatNumber(selectedNode?.balance)}
            </Text>
            <Text
              fontSize="14px"
              ml="4px"
            >
              (
              {selectedNode?.percentage?.toLocaleString(undefined, {
                maximumFractionDigits: 3,
              })}
              %)
            </Text>
          </Flex>
        </>
      )}
    </Wrap>
  )
}

export default WalletDetail
