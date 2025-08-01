import React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Flex from '../commonStyled/Flex'
import { displaySuccessToast } from '../utils/toast'
interface IComponentCopy {
  stringCopy: string
  height?: number
  width?: number
}
const WraperCopy = styled.div`
  position: relative;
  height: 100%;
`

const Button = styled(Flex)`
  transition: all 0.2s;
  &:hover > svg {
    transform: scale(1.03);
    fill: gray;
  }
  cursor: pointer;
`

const Copy = ({ stringCopy, height = 20, width = 20 }: IComponentCopy) => {
  const copyAddress = () => {
    if (navigator.clipboard && navigator.permissions) {
      navigator.clipboard
        .writeText(stringCopy)
        .then(() => displaySuccessToast('Copied'))
    } else if (document.queryCommandSupported('copy')) {
      const ele = document.createElement('textarea')
      ele.value = stringCopy
      document.body.appendChild(ele)
      ele.select()
      document.execCommand('copy')
      document.body.removeChild(ele)
      displaySuccessToast('Copied')
    }
  }

  return (
    <WraperCopy>
      <Button onClick={copyAddress}>
        <ContentCopyIcon
          style={{
            height: `${height}`,
            width: `${width}`,
            color: '#d8d8d8',
          }}
        />
      </Button>
    </WraperCopy>
  )
}

export default Copy
