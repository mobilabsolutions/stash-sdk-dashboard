import { testRender, deepRender } from '../../../test_utils'

import InputCurrency from './index'
import { fireEvent } from 'react-testing-library'

it('Input Should Render', () =>
  testRender(InputCurrency, {
    field: { name: 'test', value: 12345 },
    form: { touched: { name: false }, errors: {} },
    currencyId: 'EUR'
  }))

it('Input Should fire onChange event with numeric value', () => {
  const onChange = jest.fn()
  const { getByPlaceholderText } = deepRender(InputCurrency, {
    field: { name: 'test', value: 12345, onChange },
    form: { touched: { name: false }, errors: {} },
    placeholder: 'test',
    currencyId: 'EUR'
  })
  const InputEl = getByPlaceholderText('test')
  fireEvent.change(InputEl, { target: { value: '€112,345.00' } })
  expect(onChange).toBeCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        value: 112345.0
      })
    })
  )
})
