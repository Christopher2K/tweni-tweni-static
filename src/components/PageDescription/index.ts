import styled from '@emotion/styled'

import { desktopStyle } from 'styles/responsive'

export const PageDescription = styled.p`
  padding: 0 ${props => props.theme.nav.padding.sides.mobile};
  font-family: ${props => props.theme.fonts.sneak};
  font-size: 1.9rem;
  line-height: 22.9px;
  text-align: left;
  margin-bottom: 5rem;

  ${props => desktopStyle`
    font-size: 3.1rem;
    line-height: 40.3px;
    width: 50%;
    padding: 0 ${props.theme.nav.padding.sides.desktop};
    margin-bottom: 12rem;
  `};
`
