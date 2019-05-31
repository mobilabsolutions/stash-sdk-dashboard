import { deepRender } from '../../../test_utils'
import TransactionActions from '../transaction_actions'
import { fireEvent, getByText } from 'react-testing-library'

it('TransactionActions Should Render actions for "authorised" status', () => {
  const onClick = jest.fn()
  const { baseElement, getByTestId } = deepRender(TransactionActions, {
    status: 'authorised',
    onClick
  })
  fireEvent(
    getByTestId('more-icon'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
  expect(baseElement).toMatchSnapshot()
  fireEvent(
    getByText(baseElement, 'Refund'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
  expect(onClick.mock.calls.length).toBe(1)
})

it('TransactionActions Should Render actions for "pre-Authorised" status', () => {
  const onClick = jest.fn()
  const { baseElement, getByTestId } = deepRender(TransactionActions, {
    status: 'pre-Authorised',
    onClick
  })
  fireEvent(
    getByTestId('more-icon'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
  expect(baseElement).toMatchSnapshot()
})

it('TransactionActions Should Render actions for "captured" status', () => {
  const onClick = jest.fn()
  const { baseElement, getByTestId } = deepRender(TransactionActions, {
    status: 'captured',
    onClick
  })
  fireEvent(
    getByTestId('more-icon'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  )
  expect(baseElement).toMatchSnapshot()
})
