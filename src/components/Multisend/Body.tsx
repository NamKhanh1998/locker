import { poppins } from '@/fonts'
import { useCurrentWallet } from '@mysten/dapp-kit'
import { createTheme } from '@uiw/codemirror-themes'
import CodeMirror from '@uiw/react-codemirror'
import { isEmpty, size, sumBy } from 'lodash'
import { TriangleAlert } from 'lucide-react'
import { FC, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import Box from '../commonStyled/Box'
import Flex from '../commonStyled/Flex'
import Text from '../commonStyled/Text'
import ConnectWalletButton from '../ConnectWalletButton'
import {
  ICurrencyWBalance,
  useManageBulkSendState,
} from './hooks/useManageBulkSendState'
import { errorHighlighter, lineHeightExtension } from './utils'
import { useFetchUserSuiBalances } from './hooks/useFetchUserSuiBalances'
import { useBulkSend } from './hooks/useBulkSend'
import { ChevronsUpDown, ChevronsDownUp } from 'lucide-react'
import { usePlatformFee } from './hooks/usePlatformFee'
import { tryParseDecimalAmount } from '../Swap/utils/bigNumber'

export const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#ffffff0',
    foreground: '#ffffff',
    caret: '#fefefe',
    selection: '#036cd677',
    selectionMatch: '#036cd60',
    lineHighlight: '#8a91990',
    gutterBackground: '#ffffff0d',
    gutterForeground: '#ffffffa0',
    gutterActiveForeground: '#ffffff',
    gutterBorder: '#ffffff0d',
    fontSize: '13px',
    fontFamily: poppins.style.fontFamily,
  },
  styles: [],
})

const Container = styled(Flex)`
  width: 100%;
  padding: 16px;
  padding-top: 0;
  flex-direction: column;
  gap: 10px;
`

const Header = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

const TextAreaContainer = styled(Box)`
  width: 100%;
  height: 215px;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.05);
  transition: 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;

  .cm-theme {
    height: 100% !important;
  }
  .cm-editor {
    height: 100% !important;
  }
  .cm-gutters {
    height: 100% !important;
    backdrop-filter: blur(10px);
  }

  .cm-activeLine {
    background-color: transparent;
  }
  .cm-activeLineGutter {
    background-color: transparent;
  }

  .cm-scroller {
    border: none;
  }
`

const ExpandWrap = styled(Flex)`
  width: 100%;
  position: relative;
  height: 20px;
`

const ExpandBtn = styled(Flex)`
  width: 50px;
  height: 20px;
  transition: 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-top: none;
  border-radius: 0px 0px 4px 4px;
  position: absolute;
  top: 0;
  right: 10px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff18;

  &:hover {
    opacity: 0.8;
  }
`

const ExcuteBtn = styled(Flex)<{ $disable: boolean }>`
  width: 100%;
  align-items: center;
  border: 0px;
  border-radius: 8px;
  background-color: #3dbb9a;
  height: 42px;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
  &:hover {
    transform: scale(1.005);
    opacity: 0.9;
  }
  margin-top: 8px;
  color: #fff;
  font-size: 14px;
  ${({ $disable }) =>
    $disable &&
    css`
      background-color: #252f39;
      cursor: default;
      color: #788791;

      &:hover {
        transform: scale(1);
        opacity: 1;
      }
    `}
`

const ErrorInfo = styled(Flex)`
  width: 100%;
  border-radius: 8px;
  background-color: #ff5c6f6b;
  padding: 10px;
  gap: 5px;
  max-height: 74px;
  overflow-y: auto;
`

const BtnText = styled(Text)`
  font: 14px;
  font-weight: 500;
  color: #3dbb9a;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`

const ExcuteButton: FC<{
  selectToken: ICurrencyWBalance | null
  amounts: string[]
  recipients: string[]
  errors: string[]
}> = ({ selectToken, amounts, recipients, errors }) => {
  const { isConnected } = useCurrentWallet()
  const { fee } = usePlatformFee()
  const { balances, isLoading } = useFetchUserSuiBalances()
  const { onExcute } = useBulkSend()

  const totalAmounts = useMemo(() => {
    return sumBy(amounts, (_) => Number(_))
  }, [amounts])

  const recipientsSize = useMemo(() => {
    return size(recipients)
  }, [recipients])

  const onProceed = async () => {
    if (selectToken) {
      await onExcute(selectToken, recipients, amounts)
    }
  }

  if (!isConnected) {
    return (
      <Box mt="8px">
        <ConnectWalletButton />
      </Box>
    )
  }

  if (!selectToken) {
    return <ExcuteBtn $disable={true}>Please select token</ExcuteBtn>
  }

  if (size(errors)) {
    return <ExcuteBtn $disable={true}>Make sure the format is valid</ExcuteBtn>
  }

  if (recipientsSize < 2) {
    return (
      <ExcuteBtn $disable={true}>Please enter at least 2 addresses</ExcuteBtn>
    )
  }

  if (recipientsSize > 400) {
    return (
      <ExcuteBtn $disable={true}> Maximum of 400 addresses allowed</ExcuteBtn>
    )
  }

  if ((totalAmounts || 0) > Number(selectToken?.balance || 0)) {
    return <ExcuteBtn $disable={true}>Insufficient amount</ExcuteBtn>
  }

  if (isLoading) {
    return <ExcuteBtn $disable={true}>Loading...</ExcuteBtn>
  }

  if (
    Number(balances?.totalBalance) <
    tryParseDecimalAmount(fee || '0', 9)?.toNumber()
  ) {
    return (
      <ExcuteBtn $disable={true}>You need {fee} SUI to cover the fee</ExcuteBtn>
    )
  }

  return (
    <ExcuteBtn
      $disable={false}
      onClick={onProceed}
    >
      Proceed
    </ExcuteBtn>
  )
}

const Body: FC<{
  setShowModal: any
}> = ({ setShowModal }) => {
  const {
    onChangeTextAreaValue,
    bulkSendState: { selectToken, textAreaValue },
    amounts,
    recipients,
    errors: _errors,
  } = useManageBulkSendState()

  const [isFocus, setFocus] = useState<boolean>(false)
  const [isExpand, setExpand] = useState<boolean>(false)

  return (
    <Container>
      <Header>
        <Text fontSize="14px">List of Addresses in CSV</Text>
        <BtnText
          onClick={() => {
            setShowModal(true)
          }}
          fontSize="14px"
        >
          Show Sample CSV
        </BtnText>
      </Header>

      <Flex
        width="100%"
        flexDirection="column"
      >
        <TextAreaContainer
          style={{
            height: isExpand ? '520px' : '215px',
          }}
        >
          <CodeMirror
            onFocus={() => {
              setFocus(true)
            }}
            onBlur={() => {
              setFocus(false)
            }}
            value={textAreaValue}
            placeholder="Insert your CSV here"
            theme={myTheme}
            className={poppins.className}
            onChange={(val) => onChangeTextAreaValue(val)}
            extensions={[errorHighlighter, lineHeightExtension]}
          />
        </TextAreaContainer>
        <ExpandWrap>
          <ExpandBtn onClick={() => setExpand((p) => !p)}>
            {isExpand ? (
              <ChevronsDownUp
                color="#788791"
                size={18}
              />
            ) : (
              <ChevronsUpDown
                color="#788791"
                size={18}
              />
            )}
          </ExpandBtn>
        </ExpandWrap>
      </Flex>

      {!isEmpty(_errors) && !isFocus && (
        <ErrorInfo>
          <Flex mt="2px">
            <TriangleAlert
              size={14}
              color="#ff5c6f"
            />
          </Flex>

          <Flex flexDirection="column">
            {_errors?.map((code, i) => (
              <Text
                key={i}
                fontSize="12px"
              >
                {code}
              </Text>
            ))}
          </Flex>
        </ErrorInfo>
      )}

      <ExcuteButton
        selectToken={selectToken}
        amounts={amounts}
        recipients={recipients}
        errors={_errors}
      />
    </Container>
  )
}

export default Body
