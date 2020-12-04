import '@emotion/react'
import type { Theme as AppTheme } from 'styles/theme'

declare module '@emotion/react' {
  interface Theme extends AppTheme {}
}
