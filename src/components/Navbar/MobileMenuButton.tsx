import React, { FC } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const Button = styled.button<{ menuIsOpen: boolean }>`
  background-color: transparent;
  border: none;
  outline: none;

  display: block;
  height: ${props => props.theme.nav.itemSize.mobile};
  box-sizing: border-box;
  font-size: ${props => props.theme.nav.itemSize.mobile};
  padding: 0;
  color: ${props => props.theme.colors.black};
  ${props =>
    props.menuIsOpen &&
    css`
      color: ${props.theme.colors.white};
    `};
`

interface MobileMenuButtonProps {
  className?: string
  menuIsOpen: boolean
  onClick: () => void
}

export const MobileMenuButton: FC<MobileMenuButtonProps> = ({
  className,
  menuIsOpen,
  onClick,
}) => {
  const text = menuIsOpen ? 'Close' : 'Menu'

  return (
    <Button
      type="button"
      onClick={onClick}
      className={className}
      menuIsOpen={menuIsOpen}
    >
      {text}
    </Button>
  )
}
