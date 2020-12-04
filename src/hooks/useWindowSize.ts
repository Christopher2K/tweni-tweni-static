import { useEffect, useCallback, useState } from 'react'

interface UseWindowSize {
  width: number
  height: number
}

export function useWindowSize(): UseWindowSize {
  const [size, setSize] = useState<UseWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const getWindowsBoundingBox: (
    this: Window,
    event: UIEvent,
  ) => void = useCallback(function getWindowsBoundingBox(event: UIEvent) {
    setSize({
      width: this.innerWidth,
      height: this.innerHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', getWindowsBoundingBox)
    return () => window.removeEventListener('resize', getWindowsBoundingBox)
  }, [])

  return size
}
