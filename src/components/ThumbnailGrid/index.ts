import styled from '@emotion/styled'

import { desktopStyle } from 'styles/responsive'

export const ThumbnailGrid = styled.div`
  width: 100%;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 1fr; /* one full width colum */
  grid-template-rows: auto;
  grid-gap: 8rem;

  padding: 0 ${props => props.theme.nav.padding.sides.mobile} 5rem;

  ${props => desktopStyle`
    grid-template-columns: 1fr 1fr 1fr;
    padding: 5rem ${props.theme.nav.padding.sides.desktop} 7rem;
  `}
`
