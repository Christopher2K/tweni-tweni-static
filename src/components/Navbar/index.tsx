import React, { FC, useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/react'
import { CSSTransition } from 'react-transition-group'

import { Item } from './Item'
import { HomeLink } from './HomeLink'
import { MobileMenuButton } from './MobileMenuButton'
import { MobileItemList } from './MobileItemList'
import { Responsive } from 'components/Responsive'
import { desktopStyle } from 'styles/responsive'

const menuTransition = css`
  .menu-enter {
    opacity: 0;
  }

  .menu-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }

  .menu-exit {
    opacity: 1;
  }

  .menu-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`

const Root = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;

  width: 100%;
  padding: ${({ theme }) =>
    `${theme.nav.padding.top.mobile} ${theme.nav.padding.sides.mobile} ${theme.nav.padding.bottom.mobile} ${theme.nav.padding.sides.mobile}`};

  ${props => desktopStyle`
    padding: ${props.theme.nav.padding.top.desktop} ${props.theme.nav.padding.sides.desktop} ${props.theme.nav.padding.bottom.desktop} ${props.theme.nav.padding.sides.desktop}
  `}
`.withComponent('nav')

export const Navbar: FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = useCallback(function toggleMenu() {
    setMobileMenuOpen(currentStatus => !currentStatus)
  }, [])

  return (
    <Root>
      <Global styles={menuTransition} />
      <Responsive.Desktop>
        <Item name="Génèse" to="/genese" anchor="left" />
        <Item name="Nos inspirations" to="/inspirations" anchor="left" />
        <HomeLink />
        <Item name="Nos mix" to="/mix" anchor="right" />
        <Item name="Contact" to="/contact" anchor="right" />
      </Responsive.Desktop>
      <Responsive.Mobile>
        <MobileMenuButton onClick={toggleMenu} menuIsOpen={mobileMenuOpen} />
        <HomeLink />
        <Item name="Contact" to="/contact" anchor="right" />
        <CSSTransition
          in={mobileMenuOpen}
          timeout={200}
          classNames="menu"
          unmountOnExit
        >
          <MobileItemList
            onMenuButtonClicked={toggleMenu}
            menuIsOpen={mobileMenuOpen}
          />
        </CSSTransition>
      </Responsive.Mobile>
    </Root>
  )
}
