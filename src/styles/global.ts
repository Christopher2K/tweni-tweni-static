import { css } from 'styled-components'

import { theme } from './theme'
import { reset } from './reset'
import { fonts } from './fonts'

export const global = css`
  ${fonts}
  ${reset}

  :root {
    position: relative;
    font-family: ${theme.fonts.helvetica};
    font-size: ${theme.rootFontSize};
    color: ${theme.colors.black};
    background-color: ${theme.colors.white};
    min-height: 100%;
    transition: background-color 200ms linear;
  }

  body {
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    min-height: 100vh;
  }

  a {
    color: ${theme.colors.black};

    &:active {
      color: ${theme.colors.black};
    }
  }

  .tl-edges {
    flex: 1;
    display: flex;
  }
`
