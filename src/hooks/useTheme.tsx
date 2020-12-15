import React, { useContext, createContext, ComponentType, FC } from 'react'

import { theme, Theme } from 'styles/theme'

const ThemeContext = createContext<Theme>(theme)

export const ThemeProvider = ThemeContext.Provider

export interface ThemeProps {
  theme: Theme
}

export function useTheme(): Theme {
  const themeContext = useContext(ThemeContext)
  if (themeContext == null) {
    throw Error('useTheme must be used inside ThemeContextProvider')
  }
  return themeContext
}

export function withTheme<T = Record<string, unknown>>(
  ThemableComponent: ComponentType<T & { theme: Theme }>,
): FC<T> {
  const theme = useTheme()
  const Component: FC<T> = props => (
    <ThemableComponent {...{ ...props, theme }} />
  )
  return Component
}
