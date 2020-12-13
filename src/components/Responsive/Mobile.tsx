import React, { FC } from 'react'
import { mobileMediaQuery } from 'styles/responsive'
import { useMediaQuery } from 'hooks/useMediaQuery'

export const Mobile: FC = ({ children }) => {
  const { match } = useMediaQuery(`(${mobileMediaQuery})`)
  return <>{match && children}</>
}
