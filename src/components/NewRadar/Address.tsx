import React, { FC, useState } from 'react'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { Copy, Check } from 'lucide-react'

const StyledAddress = styled(Flex)`
  width: max-content;
`

const AddressText = styled(Text)`
  font-size: 12px;
  color: #b9b9b9;
`

const CopyBtn = styled(Flex)`
  align-items: center;
  margin-left: 3px;
  cursor: pointer;
`

const Address: FC<{
  coinType: string
  first?: number
  last?: number
}> = ({ coinType, first = 6, last = -6 }) => {
  const [copy, setCopy] = useState(false)

  const onCopy = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    setCopy(true)
    navigator.clipboard.writeText(coinType)
    setTimeout(() => {
      setCopy(false)
    }, 2000)
  }
  return (
    <StyledAddress>
      <AddressText>
        {`${coinType?.slice(0, first)}...${coinType?.slice(last)}`}
      </AddressText>

      <CopyBtn onClick={onCopy}>
        {copy ? (
          <Check
            color="#46e754"
            size="16px"
          />
        ) : (
          <Copy
            color="#b9b9b9"
            size="14px"
          />
        )}
      </CopyBtn>
    </StyledAddress>
  )
}

export default Address
