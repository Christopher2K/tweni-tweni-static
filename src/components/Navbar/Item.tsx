import React, { FC } from 'react'
import styled from 'styled-components'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

import { desktopStyle, mobileStyle } from 'styles/responsive'

const Root = styled.div<{ anchor: 'left' | 'right' }>`
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-size: ${props => props.theme.nav.itemSize.mobile};
  height: ${props => props.theme.nav.itemSize.mobile};

  ${mobileStyle`
    flex-basis: 0;
  `}

  ${props => desktopStyle`
    font-size: ${props.theme.nav.itemSize.desktop};
    height: ${props.theme.nav.itemSize.desktop};
    text-align: ${props.anchor};
    flex: 1;
  `}
`

const StyledLink = styled(AniLink)`
  display: inline-block;
  font-size: 1em;
  font-weight: 400;
  color: ${props => props.theme.colors.black};
  height: 100%;
  text-decoration: none;
  white-space: nowrap;

  &.active {
    display: inline-block;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${props => props.theme.colors.black};

    ${desktopStyle`
      padding-bottom: 1rem;
    `}
  }
`

type ItemProps = Readonly<{
  to: string
  name: string
  anchor: 'left' | 'right'
}>

export const Item: FC<ItemProps> = ({ to, name, anchor }) => {
  return (
    <Root anchor={anchor}>
      <StyledLink to={to} activeClassName="active" fade duration={0.1}>
        {name}
      </StyledLink>
    </Root>
  )
}
