import { testRender, deepRender } from '../../../test_utils'
// import { shallow, mount } from 'enzyme'
import RefundForm from './index'
import { fireEvent } from 'react-testing-library'

it('RefundForm Should Render', () =>
  testRender(RefundForm, {
    initialRefund: 12345,
    currencyId: 'EUR'
  }))

it('RefundForm Should use loading status', () =>
  testRender(RefundForm, {
    initialRefund: 12345,
    isLoading: true,
    currencyId: 'EUR'
  }))

it('RefundForm Should disable amount initially', () => {
  const { getByPlaceholderText } = deepRender(RefundForm, {
    initialRefund: 12345,
    currencyId: 'EUR'
  })

  const RefundInput = getByPlaceholderText('Refund')
  expect(RefundInput.getAttribute('disabled')).toBeDefined()
})

it('RefundForm Should disable amount only when full refund is picked', () => {
  const { getByPlaceholderText, getByLabelText } = deepRender(RefundForm, {
    initialRefund: 12345,
    currencyId: 'EUR'
  })

  fireEvent(
    getByLabelText('Partial'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )

  const RefundInput = getByPlaceholderText('Refund')
  expect(RefundInput.getAttribute('disabled')).toBeNull()
})

it('RefundForm Should reset amount if full refund is picked', () => {
  const { getByPlaceholderText, getByLabelText } = deepRender(RefundForm, {
    initialRefund: 12345,
    currencyId: 'EUR'
  })

  fireEvent(
    getByLabelText('Partial'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
  const InputEl = getByPlaceholderText('Refund')
  fireEvent.change(InputEl, { target: { value: '€35.00' } })
  expect(InputEl.getAttribute('value')).toBe('€35.00')

  fireEvent(
    getByLabelText('Full'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )

  expect(InputEl.getAttribute('value')).toBe('€12,345.00')
})
