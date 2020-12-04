import { useCallback, useEffect, useState } from 'react'

interface UseMediaQuery {
  match: boolean
}

export function useMediaQuery(mediaQuery: string): UseMediaQuery {
  const [match, setMatch] = useState(false)

  const updateMatch: (
    this: MediaQueryList,
    event: MediaQueryListEvent,
  ) => void = useCallback(
    function updateMatch(event) {
      if (match !== event.matches) {
        setMatch(event.matches)
      }
    },
    [match],
  )

  useEffect(() => {
    const mq = window.matchMedia(mediaQuery)
    setMatch(mq.matches)

    if (mq.addEventListener !== undefined) {
      mq.addEventListener('change', updateMatch)
    } else {
      mq.addListener(updateMatch)
    }

    return () => {
      if (mq.removeEventListener !== undefined) {
        mq.removeEventListener('change', updateMatch)
      } else {
        mq.removeListener(updateMatch)
      }
    }
  }, [match, mediaQuery])

  return { match }
}
