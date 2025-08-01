import { useState, useEffect, useRef } from 'react'

export function useDebounceNoTrigger<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      setDebouncedValue(value)
      isFirstRender.current = false
      return // Skip the timeout on the first render
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
