import React, { FC, ComponentType } from 'react'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

import RawLogo from 'assets/images/svgs/logo.svg'
import { desktopStyle, desktopMediaQuery } from 'styles/responsive'
import { useWindowSize } from 'hooks/useWindowSize'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { toPixels } from 'utils/layout'

const Logo = styled(RawLogo as ComponentType)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  transform-origin: top center;

  top: calc(
    ${props =>
      `${props.theme.nav.padding.top.mobile} + (${props.theme.nav.itemSize.mobile}/ 2)`}
  );
  width: ${props => props.theme.nav.logoWidth.mobile};
  ${props => desktopStyle`
    top: 50%;
    width: ${props.theme.nav.logoWidth.desktop};
  `}

  height: auto;
  & > path {
    fill: ${props => props.theme.colors.black};
  }
`

// eslint-disable-next-line
const Root = styled(AniLink as ComponentType<Record<any, any>>)<{
  activeScaleFactor: number
}>`
  --animation-length: ${props => props.theme.nav.animationDuration};

  display: block;
  flex: 1;

  ${Logo} {
    transition: top ease-in var(--animation-length),
      transform ease-in var(--animation-length);

    & > path {
      transition: fill ease-in var(--animation-length);
    }
  }

  &.active {
    ${Logo} {
      top: calc(
        ${({ theme }) =>
          `(${theme.nav.padding.top.mobile} + ${theme.nav.padding.bottom.mobile}) + ${theme.nav.itemSize.mobile} + 10px`}
      );
      transform: translate(-50%, -50%)
        scale(${props => props.activeScaleFactor});

      ${({ theme }) => desktopStyle`
        top: calc(
          ${`(${theme.nav.padding.top.desktop} + ${theme.nav.padding.bottom.desktop}) + ${theme.nav.itemSize.desktop} + 13px`}
        );
      `}

      transition: top ease-out var(--animation-length),
        transform ease-out var(--animation-length);

      & > path {
        transition: fill ease-out var(--animation-length);
        fill: ${props => props.theme.colors.violet};
      }
    }
  }
`

export const HomeLink: FC = () => {
  const theme = useTheme()
  const { width: windowWidth } = useWindowSize()
  const { match: desktopScreen } = useMediaQuery(`(${desktopMediaQuery})`)

  const _navSidePaddingValue = toPixels(
    desktopScreen
      ? theme.nav.padding.sides.desktop
      : theme.nav.padding.sides.mobile,
  )

  const currentLogoWidth = toPixels(
    desktopScreen ? theme.nav.logoWidth.desktop : theme.nav.logoWidth.mobile,
  )
  const maxLogoWidth =
    (windowWidth > 1920 ? 1920 : windowWidth) - _navSidePaddingValue * 2
  const activeScaleFactor = maxLogoWidth / currentLogoWidth

  return (
    <Root
      to="/"
      activeClassName="active"
      activeScaleFactor={activeScaleFactor}
      fade
      duration={0.1}
    >
      <Logo />
    </Root>
  )
}
