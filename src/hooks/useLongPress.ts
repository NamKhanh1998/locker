import { isFunction } from 'lodash'
import { useCallback, useState } from 'react'

const useLongPress = (onClick: any, onHold: any, delayPeriod: number) => {
  const [mouseDownTime, setMouseDownTime] = useState(0)

  const onMouseDown = useCallback(() => {
    setMouseDownTime(new Date().getTime())
  }, [])

  const onMouseUp = useCallback(() => {
    const now = new Date().getTime()

    if (now - mouseDownTime < delayPeriod) {
      if (onClick && isFunction(onClick)) onClick()
    } else {
      if (onHold && isFunction(onHold)) onHold()
    }
  }, [mouseDownTime, onClick, onHold, delayPeriod])

  return {
    onMouseUp,
    onMouseDown,
  }
}

export default useLongPress
