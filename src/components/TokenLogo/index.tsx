import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { BoxProps } from '../commonStyled/type'
import Box from '../commonStyled/Box'
import { Chain } from '../Bubbles/bubbles.types'

const Logo = styled.img`
  border-radius: 50%;
  height: 100%;
  width: 100%;
`

const GradientDot = styled(Box)`
  border-radius: 50%;
  background: linear-gradient(
    90deg,
    #f2f5f2 14.81%,
    #92f5ca 46.7%,
    #72f886 57.68%,
    #17fb4c 86.64%
  );
`

const getLogoUrl = (address: string, chain?: Chain) => {
  return `/tokens/${chain || 'sui'}/${address?.toLowerCase()}.png`
}

const TokenLogo: FC<
  {
    address: string
    url?: string
    chain?: Chain
  } & BoxProps
> = ({ chain, address, url, height = 30, width = 30, ...props }) => {
  const [isError, setIsError] = useState(false)

  const src = address ? getLogoUrl(address, chain) : url

  if (!isError) {
    return (
      <Box
        {...props}
        height={height}
        width={width}
        minWidth={width}
      >
        <Logo
          src={src}
          alt="token-logo"
          onError={() => {
            setIsError(true)
          }}
        />
      </Box>
    )
  }

  return (
    <GradientDot
      height={height}
      width={width}
    />
  )
}

export default TokenLogo
