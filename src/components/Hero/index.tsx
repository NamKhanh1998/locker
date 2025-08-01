import { devices } from '@/config'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import { links } from '@/config/constant'
import useMatchBreakPoints from '@/hooks/useMatchBreakPoints'
import FunnyBubbles from '../FunnyBubbles'
import MultiColorProgressBar from '../Progress'

const HeroWrapper = styled.div`
  position: relative;
  left: 0;
  right: 0;
  width: 100%;
  height: max-content;
  display: flex;
  justify-content: center;
  z-index: 1;
  padding-top: 80px;
`

const ContentInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
  z-index: 1;

  @media ${devices.mobileM} {
    max-width: 540px;
  }
  @media ${devices.mobileL} {
    max-width: 720px;
  }
  @media ${devices.tablet} {
    max-width: 960px;
  }
  @media ${devices.laptop} {
    max-width: 1140px;
  }
  @media ${devices.laptopL} {
    max-width: 1320px;
  }
`

const BigTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: 700;
  font-size: 40px;

  @media ${devices.mobileM} {
    font-size: 50px;
  }

  @media ${devices.laptop} {
    font-size: 60px;
  }
`

const Desc = styled.h1`
  margin: 0;
  color: #ccc9c9;
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  letter-spacing: 1.5;
  font-weight: 400;

  @media ${devices.tablet} {
    font-size: 18px;
  }
`

const OptionBtn = styled(Flex)`
  border-radius: 10px;
  height: 45px;
  align-items: center;
  padding: 0 25px;
  cursor: pointer;
  transition: all 0.3s;

  background-color: #50ff5093;
  border: 2px solid #51f55c;

  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
  }
  min-width: 145px;
  justify-content: center;
`

const FriendText = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 1.5;
  letter-spacing: 1.5;
  font-weight: 400;

  @media ${devices.tablet} {
    font-size: 20px;
  }
`

const Hero = () => {
  const { push } = useRouter()
  const { isMobile } = useMatchBreakPoints()

  return (
    <HeroWrapper>
      <ContentInner>
        <BigTitle>BUBBO</BigTitle>

        <Flex
          maxWidth="900px"
          flexDirection="column"
          style={{
            gap: '5px',
          }}
        >
          <Desc>
            Say goodbye to boring charts—crypto tracking just got visual
          </Desc>
        </Flex>

        <Flex
          style={{
            gap: '8px',
          }}
          mb="15px"
          mt="5px"
        >
          <OptionBtn onClick={() => push('/')}>
            <Text>Bubbles App</Text>
          </OptionBtn>

          <OptionBtn onClick={() => push('/swap')}>
            <Text>Swap Bubo</Text>
          </OptionBtn>
        </Flex>

        <FriendText>
          🌈 Welcome to BUBOverse – A World of BUBO & Friends 🌈
        </FriendText>
        <FunnyBubbles />

        <Flex
          width="100%"
          flexDirection="column"
          mt="50px"
          alignItems="center"
        >
          <Text
            mb={isMobile ? '30px' : '40px'}
            fontSize={isMobile ? '14px' : '20px'}
            textAlign="center"
          >
            ✅ We've reached milestone—500K MKC ✅
          </Text>
          <Text
            mb={isMobile ? '40px' : '60px'}
            fontSize={isMobile ? '14px' : '20px'}
            textAlign="center"
          >
            🔥 On the road to our next milestone—1M MKC 🔥
          </Text>
          <MultiColorProgressBar />
        </Flex>
      </ContentInner>
    </HeroWrapper>
  )
}

export default Hero
