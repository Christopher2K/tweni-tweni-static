import { useEffect, useCallback, useState } from 'react'

interface UseWindowSize {
  width: number
  height: number
}

export function useWindowSize(): UseWindowSize {
  const [size, setSize] = useState<UseWindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
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
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    window.addEventListener('resize', getWindowsBoundingBox)
    return () => window.removeEventListener('resize', getWindowsBoundingBox)
  }, [])

  return size
}
