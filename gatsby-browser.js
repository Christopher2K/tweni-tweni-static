/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Layout } from './src/components/Layout'
import { theme } from './src/styles/theme'

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}

export function wrapRootElement({ element }) {
  return (
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  )
}