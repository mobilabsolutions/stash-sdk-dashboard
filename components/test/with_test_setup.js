import React from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../style'

import Router from 'next/router'
const mockedRouter = { push: () => {}, prefetch: () => {} }
Router.router = mockedRouter

const getDisplayName = Component => {
  return Component.displayName || Component.name || 'Component'
}

export default WrappedComponent => {
  const wrapper = props => {
    return (
      <ThemeProvider theme={theme}>
        <WrappedComponent {...props} />
      </ThemeProvider>
    )
  }
  wrapper.displayName = `WithTestSetup(${getDisplayName(WrappedComponent)})`

  return wrapper
}
