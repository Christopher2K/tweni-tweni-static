import React, { FC, useState, useEffect } from 'react'
import { PageProps } from 'gatsby'
import styled, { createGlobalStyle, useTheme } from 'styled-components'

import { Navbar } from 'components/Navbar'
import { Footer } from 'components/Footer'
import { global } from 'styles/global'
import { desktopMediaQuery } from 'styles/responsive'
import { useWindowSize } from 'hooks/useWindowSize'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { toPixels, getLogoHeightForGivenWidth } from 'utils/layout'

const GlobalStyle = createGlobalStyle`${global}`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  min-height: 100vh;
`

interface PageContainerProps {
  isHomepage: boolean
  marginTop: number
}
const PageContainer = styled.main<PageContainerProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  margin-top: ${props => (props.isHomepage ? props.marginTop : 0)}px;
`

export const Layout: FC<PageProps> = ({ children, location }) => {
  // Hooks
  const theme = useTheme()
  const { width: windowWidth } = useWindowSize()
  const { match: desktopScreen } = useMediaQuery(`(${desktopMediaQuery})`)

  const [homepageOffset, setHompageOffset] = useState(0)

  // Computed
  const isHomepage = location.pathname === '/'

  useEffect(() => {
    const currentContentWidth = windowWidth > 1920 ? 1920 : windowWidth
    const _navSidePaddingValue = toPixels(
      desktopScreen
        ? theme.nav.padding.sides.desktop
        : theme.nav.padding.sides.mobile,
    )
    const _currentLogoHeight = getLogoHeightForGivenWidth(
      currentContentWidth - _navSidePaddingValue * 2,
    )
    setHompageOffset(_currentLogoHeight + toPixels('2rem'))
  }, [windowWidth, desktopScreen])

  return (
    <Root>
      <GlobalStyle />
      <Navbar />
      <PageContainer isHomepage={isHomepage} marginTop={homepageOffset}>
        {children}
      </PageContainer>
      <Footer />
    </Root>
  )
}
