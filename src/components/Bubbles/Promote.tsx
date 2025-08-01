import React, { useCallback } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import { devices } from '@/config'
import TokenLogo from '../TokenLogo'
import { PromoteProjects } from './config'
import { useFetchAndManageCoins } from './hooks/useFetchCoins'
import { useManageSelectedToken } from './hooks/useManageSelectedToken'

const OptionBtn = styled(Flex)<{
  $active?: boolean
}>`
  border-radius: 0 0 10px 10px;
  height: 40px;
  gap: 5px;
  align-items: center;
  padding: 0 5px;
  cursor: pointer;
  transition: all 0.3s;

  background-color: ${({ $active }) => {
    return '#45799d82'
  }};

  border: 3px solid #46affb;
  border-top: none;

  @media ${devices.mobileM} {
    padding: 0 15px;
    gap: 10px;
  }
`

const Button = styled(Flex)`
  border-radius: 50%;
  padding: 2px;
  background-color: #c1e5ffd7;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
  }
`

const OptionBtnMb = styled(Flex)<{
  $active?: boolean
}>`
  border-radius: 10px 10px 0 0;
  height: 45px;
  gap: 10px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  justify-content: center;
  background-color: ${({ $active }) => {
    return '#45799d82'
  }};

  border: 3px solid #46affb;
  border-bottom: none;

  @media ${devices.mobileM} {
    padding: 0 15px;
  }
`

const Promote = () => {
  const { fullDataMap } = useFetchAndManageCoins()
  const { setSelectedToken } = useManageSelectedToken()

  const onSelect = useCallback(
    (project: any) => {
      if (fullDataMap?.[project?.address?.toLowerCase()]) {
        console.log(fullDataMap?.[project?.address?.toLowerCase()])

        setSelectedToken({
          selectedToken: fullDataMap?.[project?.address?.toLowerCase()],
        })
      }
    },
    [fullDataMap, setSelectedToken]
  )

  return (
    <OptionBtn>
      {PromoteProjects?.map((project) => (
        <Button
          onClick={() => onSelect(project)}
          key={project?.address}
        >
          <TokenLogo
            key={project.pairAddress}
            address={project.pairAddress}
            height={25}
            width={25}
          />
        </Button>
      ))}
    </OptionBtn>
  )
}

export default Promote
