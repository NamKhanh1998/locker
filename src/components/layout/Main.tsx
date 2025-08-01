import { LayoutProps } from '@/models'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from '../commonStyled/Box'
import Header from '../common/Header'
import Footer from '../common/Footer'
import Utilities from '../Utilities'
import { ToastContainer } from 'react-toastify'

const Container = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Content = styled(Box)`
  width: 100%;
  /* margin-top: 85px; */
`

export const MainLayout = (props: LayoutProps) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  return (
    <Container>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
      {/* <Utilities setIsOpen={setIsOpen} /> */}
    </Container>
  )
}
