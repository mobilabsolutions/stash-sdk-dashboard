import React from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from '../style'
import { LocaleProvider } from '../translations'

import Router from 'next/router'
const mockedRouter = { push: () => {}, prefetch: () => {} }
Router.router = mockedRouter

const getDisplayName = Component => {
  return Component.displayName || Component.name || 'Component'
}

export default (WrappedComponent, locale = 'en') => {
  const wrapper = props => {
    return (
      <LocaleProvider value={locale}>
        <ThemeProvider theme={theme}>
          <WrappedComponent {...props} />
        </ThemeProvider>
      </LocaleProvider>
    )
  }
  wrapper.displayName = `WithTestSetup(${getDisplayName(WrappedComponent)})`

  return wrapper
}
