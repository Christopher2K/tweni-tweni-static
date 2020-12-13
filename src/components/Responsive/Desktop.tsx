import React, { FC } from 'react'
import { desktopMediaQuery } from 'styles/responsive'
import { useMediaQuery } from 'hooks/useMediaQuery'

export const Desktop: FC = ({ children }) => {
  const { match } = useMediaQuery(`(${desktopMediaQuery})`)
  return <>{match && children}</>
}
