import React, { FC } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useFetchSecurity } from './hooks/useFetchSecurity'
import GoPlusIcon from '../icons/GoPlusIocn'
import Box from '../commonStyled/Box'
import ErrorIcon from '@mui/icons-material/Error'
import Image from 'next/image'

const Wrap = styled(Flex)`
  padding: 10px 0;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-around;
  max-height: calc(100% - 20px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`

const Row = styled(Flex)`
  padding: 4px;
  justify-content: space-between;
  width: 100%;

  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`

const Security: FC<{
  address: string
}> = ({ address }) => {
  const { data, isLoading } = useFetchSecurity(address)

  return (
    <Box width="100%">
      <Wrap>
        <Row>
          <Text
            color="#d7d7d7"
            fontSize="14px"
          >
            Honeypot
          </Text>
          <Flex alignItems="center">
            {isLoading ? (
              <Text
                color="#d7d7d7"
                fontSize="14px"
              >
                Loading...
              </Text>
            ) : (
              <>
                <Text
                  mr="5px"
                  fontSize="14px"
                  color={data?.isCoinHoneyPot ? '#f5d451' : '#51f55c'}
                >
                  {data?.isCoinHoneyPot ? 'Yes' : 'No'}
                </Text>
                {data?.isCoinHoneyPot ? (
                  <ErrorIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: '#f5d451',
                    }}
                  />
                ) : (
                  <CheckCircleIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: data?.isCoinHoneyPot ? '#f5d451' : '#51f55c',
                    }}
                  />
                )}
              </>
            )}
          </Flex>
        </Row>
        <Row>
          <Text
            color="#d7d7d7"
            fontSize="14px"
          >
            LP Burned
          </Text>
          <Flex alignItems="center">
            {isLoading ? (
              <Text
                color="#d7d7d7"
                fontSize="14px"
              >
                Loading...
              </Text>
            ) : (
              <>
                <Text
                  mr="5px"
                  fontSize="14px"
                  color={!!data?.burntLpPosition ? '#51f55c' : '#f5d451'}
                >
                  {!!data?.burntLpPosition ? 'Yes' : 'No'}
                </Text>

                {!data?.burntLpPosition ? (
                  <ErrorIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: '#f5d451',
                    }}
                  />
                ) : (
                  <CheckCircleIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: data?.isCoinHoneyPot ? '#f5d451' : '#51f55c',
                    }}
                  />
                )}
              </>
            )}
          </Flex>
        </Row>
        <Row>
          <Text
            color="#d7d7d7"
            fontSize="14px"
          >
            Metadata Modifiable
          </Text>
          <Flex alignItems="center">
            {isLoading ? (
              <Text
                color="#d7d7d7"
                fontSize="14px"
              >
                Loading...
              </Text>
            ) : (
              <>
                <Text
                  mr="5px"
                  fontSize="14px"
                  color={data?.metadataModifiable ? '#f5d451' : '#51f55c'}
                >
                  {data?.metadataModifiable ? 'Yes' : 'No'}
                </Text>

                {data?.metadataModifiable ? (
                  <ErrorIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: '#f5d451',
                    }}
                  />
                ) : (
                  <CheckCircleIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: data?.isCoinHoneyPot ? '#f5d451' : '#51f55c',
                    }}
                  />
                )}
              </>
            )}
          </Flex>
        </Row>
        <Row>
          <Text
            color="#d7d7d7"
            fontSize="14px"
          >
            Mintable
          </Text>

          <Flex alignItems="center">
            {isLoading ? (
              <Text
                color="#d7d7d7"
                fontSize="14px"
              >
                Loading...
              </Text>
            ) : (
              <>
                <Text
                  mr="5px"
                  fontSize="14px"
                  color={data?.mintable ? '#f5d451' : '#51f55c'}
                >
                  {data?.mintable ? 'Yes' : 'No'}
                </Text>
                {data?.mintable ? (
                  <ErrorIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: '#f5d451',
                    }}
                  />
                ) : (
                  <CheckCircleIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: data?.isCoinHoneyPot ? '#f5d451' : '#51f55c',
                    }}
                  />
                )}
              </>
            )}
          </Flex>
        </Row>
        <Row>
          <Text
            color="#d7d7d7"
            fontSize="14px"
          >
            Blacklist
          </Text>
          <Flex alignItems="center">
            {isLoading ? (
              <Text
                color="#d7d7d7"
                fontSize="14px"
              >
                Loading...
              </Text>
            ) : (
              <>
                <Text
                  mr="5px"
                  fontSize="14px"
                  color={data?.blacklist ? '#f5d451' : '#51f55c'}
                >
                  {data?.blacklist ? 'Yes' : 'No'}
                </Text>
                {data?.blacklist ? (
                  <ErrorIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: '#f5d451',
                    }}
                  />
                ) : (
                  <CheckCircleIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: data?.isCoinHoneyPot ? '#f5d451' : '#51f55c',
                    }}
                  />
                )}
              </>
            )}
          </Flex>
        </Row>
        <Row>
          <Text
            color="#d7d7d7"
            fontSize="14px"
          >
            Contract Upgradable
          </Text>
          <Flex alignItems="center">
            {isLoading ? (
              <Text
                color="#d7d7d7"
                fontSize="14px"
              >
                Loading...
              </Text>
            ) : (
              <>
                <Text
                  mr="5px"
                  fontSize="14px"
                  color={data?.contractUpgradeable ? '#f5d451' : '#51f55c'}
                >
                  {data?.contractUpgradeable ? 'Yes' : 'No'}
                </Text>
                {data?.contractUpgradeable ? (
                  <ErrorIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: '#f5d451',
                    }}
                  />
                ) : (
                  <CheckCircleIcon
                    sx={{
                      height: '20px',
                      width: '20px',
                      color: data?.isCoinHoneyPot ? '#f5d451' : '#51f55c',
                    }}
                  />
                )}
              </>
            )}
          </Flex>
        </Row>
      </Wrap>
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Text
          mr="5px"
          fontSize="10px"
          color="#d7d7d7"
        >
          Powered by
        </Text>
        <Text
          mr="5px"
          fontSize="10px"
          color="#d7d7d7"
          fontWeight={600}
        >
          GOPLUS
        </Text>
        <Box>
          <GoPlusIcon
            width={16}
            height={16}
          />
        </Box>
        <Text
          mr="5px"
          fontSize="10px"
          color="#d7d7d7"
        >
          and
        </Text>
        <Text
          mr="5px"
          fontSize="10px"
          color="#d7d7d7"
          fontWeight={600}
        >
          NEXA
        </Text>
        <Image
          src="/socials/nexa.png"
          alt="nexa"
          height={16}
          width={16}
          style={{
            borderRadius: '50%',
          }}
        />
      </Flex>
    </Box>
  )
}

export default Security
