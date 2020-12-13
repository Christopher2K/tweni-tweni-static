import React, { FC } from 'react'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'

import { Navbar } from 'components/Navbar'
import { global } from 'styles/global'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  min-height: 100vh;
`

export const Layout: FC = ({ children }) => {
  return (
    <Root>
      <Global styles={global} />
      <Navbar />
      {children}
    </Root>
  )
}
