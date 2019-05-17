/** Used in jest.config.js */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

function polyfillIntl() {
  const areIntlLocalesSupported = require('intl-locales-supported')
  const localesMyAppSupports = ['en', 'de']

  if (global.Intl) {
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
      const IntlPolyfill = require('intl')
      Intl.NumberFormat = IntlPolyfill.NumberFormat
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
    }
  } else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl')
  }
}

polyfillIntl()
