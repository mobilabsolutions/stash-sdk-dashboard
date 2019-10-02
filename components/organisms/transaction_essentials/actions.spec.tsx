import Actions from './actions'
import { testRender, deepRender } from '../../../test_utils'

const actionMock = {
  isLoading: false,
  error: null,
  action: jest.fn(),
  setError: jest.fn()
}

const currency = 'EUR'
const transactionId = 'uh348274g69ch2i4tyb292-s91'

describe('Actions', () => {
  test('should show refund for authorised', () => {
    testRender(Actions, {
      refund: actionMock,
      reverse: actionMock,
      capture: actionMock,
      action: 'AUTH',
      status: 'SUCCESS',
      currency,
      transactionId,
      amount: 15.2,
      initialAmount: 1520,
      usedAmount: 0
    })
  })

  test('should show refund for partials', () => {
    testRender(Actions, {
      refund: actionMock,
      reverse: actionMock,
      capture: actionMock,
      action: 'REFUND',
      status: 'SUCCESS',
      currency,
      transactionId,
      amount: 3.2,
      initialAmount: 1520,
      usedAmount: 320
    })
  })

  test('should NOT show refund for partials if used amount is the same', () => {
    testRender(Actions, {
      refund: actionMock,
      reverse: actionMock,
      capture: actionMock,
      action: 'REFUND',
      status: 'SUCCESS',
      currency,
      transactionId,
      amount: 3.2,
      initialAmount: 1520,
      usedAmount: 1520
    })
  })

  test('should refund proper amount', async () => {
    const refund = { action: jest.fn() }
    const { getByText, getByPlaceholderText } = deepRender(Actions, {
      refund,
      reverse: actionMock,
      capture: actionMock,
      action: 'REFUND',
      status: 'SUCCESS',
      currency,
      transactionId,
      amount: 3.2,
      initialAmount: 1520,
      usedAmount: 320
    })
    getByText('Refund').click()
    expect(getByPlaceholderText('Refund').getAttribute('value')).toBe('€12.00')
  })
})
