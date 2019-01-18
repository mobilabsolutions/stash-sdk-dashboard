import React from 'react'

import { Consumer } from './context'
import localizedNumber from './localized_number'
import localizedText from './localized_text'
import texts from './texts'

export const Localization = ({ children }) => {
  if (typeof children !== 'function')
    throw new Error('Translation children have to be a function.')

  return (
    <Consumer>
      {locale =>
        children({
          locale,
          getText: (id, args) => localizedText(texts, locale, id, args),
          formatNumber: value => localizedNumber(value, locale)
        })
      }
    </Consumer>
  )
}

export { Provider as LocaleProvider } from './context'
