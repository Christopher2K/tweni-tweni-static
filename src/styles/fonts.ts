import { css } from '@emotion/react'

import HelveticaNeueWoff2 from 'assets/fonts/HelveticaNeue/08b57253-2e0d-4c12-9c57-107f6c67bc49.woff2'
import HelveticaNeueWoff from 'assets/fonts/HelveticaNeue/08edde9d-c27b-4731-a27f-d6cd9b01cd06.woff'
import RubikRegularWoff2 from 'assets/fonts/Rubik/Rubik-Regular.woff2'
import RubikRegularWoff from 'assets/fonts/Rubik/Rubik-Regular.woff'
import SneakRegularWoff2 from 'assets/fonts/Sneak/Sneak-Regular.woff2'
import SneakRegularWoff from 'assets/fonts/Sneak/Sneak-Regular.woff'

export const fonts = css`
  @import url('https://fast.fonts.net/lt/1.css?apiType=css&c=08bf2dc9-a20b-4d0b-826e-a0e73383b443&fontids=5664093');
  @font-face {
    font-family: 'Helvetica Neue LT W05 55 Roman';
    src: url(${HelveticaNeueWoff2}) format('woff2'),
      url(${HelveticaNeueWoff}) format('woff');
  }

  @font-face {
    font-family: 'Rubik';
    src: url(${RubikRegularWoff2}) format('woff2'),
      url(${RubikRegularWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Sneak';
    src: url(${SneakRegularWoff2}) format('woff2'),
      url(${SneakRegularWoff}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`
