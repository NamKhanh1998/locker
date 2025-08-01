import { useState, useEffect, useCallback } from 'react'

export function useElementSize() {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries.length > 0) {
        const { width, height } = entries[0].contentRect
        setSize({ width, height })
      }
    })

    resizeObserver.observe(node)
    return () => resizeObserver.disconnect()
  }, [])

  return [ref, size] as const
}
