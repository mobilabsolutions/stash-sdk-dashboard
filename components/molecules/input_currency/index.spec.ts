import { testRender } from '../../../test_utils'

import InputCurrency from './index'

it('Input Should Render', () =>
  testRender(InputCurrency, {
    field: { name: 'test', value: 12345 },
    form: { touched: { name: false }, errors: {} },
    currencyId: 'EUR'
  }))
