import Box from '@/components/commonStyled/Box'
import styled from 'styled-components'
import { Empty } from '@/components/layout'
import Header from '@/components/common/Header'
import Flex from '@/components/commonStyled/Flex'
import Text from '@/components/commonStyled/Text'
import { Button } from '@mui/material'
import { useCallMoveFunction } from '@/hooks/useDispatchTokens'
import { useState } from 'react'
import { useCheckLock } from '@/hooks/useCheckLock'

const StyledHome = styled(Box)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-top: 60px;
`
const Input = styled.input`
  width: 100%;
  border: none;
  color: #000;
  font-size: 16px;
  outline: none;
  background-color: #fff;
  transition: all 0.2s;
  height: 30px;
  ::placeholder {
    color: #5454548f;
  }
`

const Home = () => {
  const { lock, unlock } = useCallMoveFunction()

  const { data: lockers } = useCheckLock()

  const [data, setData] = useState({
    amount: '',
    address: '',
    receipt: '',
  })

  console.log(lockers)

  return (
    <StyledHome>
      <Header />

      <Flex
        marginTop="50px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        padding="20px"
        flexDirection="column"
      >
        <Text>Token Address</Text>
        <Input
          value={data.address}
          onChange={(e) => setData((p) => ({ ...p, address: e.target.value }))}
        />
        <Text>Amount</Text>
        <Input
          value={data.amount}
          onChange={(e) => setData((p) => ({ ...p, amount: e.target.value }))}
        />

        <Text>Receiver</Text>
        <Input
          value={data.receipt}
          onChange={(e) => setData((p) => ({ ...p, receipt: e.target.value }))}
        />
        <Flex mt="20px">
          <Button
            variant="contained"
            onClick={() => {
              lock(data.address, data.amount, data.receipt)
            }}
          >
            LOCK
          </Button>
        </Flex>
      </Flex>

      <Flex
        marginTop="20px"
        width="100%"
        justifyContent="center"
        alignItems="center"
        padding="20px"
        flexDirection="column"
      >
        {lockers?.map((lock: any) => {
          return (
            <Flex
              style={{ gap: '10px', alignItems: 'center' }}
              flexDirection="column"
              borderBottom="1px solid #fff"
            >
              <Text>{lock?.token}</Text>
              <Text>Amount: {lock?.amount}</Text>
              <Button onClick={() => unlock(lock?.objectId, lock?.token)}>
                Claim
              </Button>
            </Flex>
          )
        })}
      </Flex>
    </StyledHome>
  )
}

Home.Layout = Empty

export default Home
