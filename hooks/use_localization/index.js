import React, { useContext } from 'react'

import localizedNumber from './localized_number'
import localizedText from './localized_text'
import texts from '../../assets/texts'

const localeContext = React.createContext('en')
localeContext.displayName = 'LocaleContext'

export const useLocalization = () => {
  const locale = useContext(localeContext)

  return {
    locale,
    getText: (id, args) => localizedText(texts, locale, id, args),
    formatNumber: value => localizedNumber(value, locale)
  }
}

export const LocaleProvider = localeContext.Provider
