import { useLayoutEffect, useState } from 'react'

export const useWindowSize = (ref: React.MutableRefObject<HTMLDivElement>) => {
  const [size, setSize] = useState([0, 0])

  useLayoutEffect(() => {
    function updateSize() {
      const divElement = ref?.current
      if (divElement) {
        const width = divElement.offsetWidth
        const height = divElement.offsetHeight

        setSize([width, height])
      }
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [ref])
  return size
}
