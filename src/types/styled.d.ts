import 'styled-components'
import type { Theme as AppTheme } from 'styles/theme'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
