import React from 'react'

const localeContext = React.createContext('en')
localeContext.displayName = 'LocaleContext'

export const Consumer = localeContext.Consumer
export const Provider = localeContext.Provider
