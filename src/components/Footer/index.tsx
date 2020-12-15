import React, { FC } from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import styled, { css } from 'styled-components'
import { desktopStyle } from 'styles/responsive'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  padding: 3rem ${props => props.theme.nav.padding.sides.mobile} 3rem;
  font-size: 1.4rem;

  ${props => desktopStyle`
    flex-direction: row;
    justify-content: space-between;
    font-size: 3rem;
    padding: 3rem ${props.theme.nav.padding.sides.desktop} 3rem;
    margin: 0;
  `}
`

const commonTextStyle = css`
  display: inline-block;
  font-size: inherit;
`

const LegalNoticeLink = styled(AniLink)`
  ${commonTextStyle}
  color: ${props => props.theme.colors.black};
`

const Copyright = styled.span`
  ${commonTextStyle}
  margin-top: 0.5rem;
`

export const Footer: FC = () => {
  return (
    <Root>
      <LegalNoticeLink to="/mentions-legales" fade duration={0.1}>
        Mentions légales
      </LegalNoticeLink>
      <Copyright>All rights reserved ©2020</Copyright>
    </Root>
  )
}
