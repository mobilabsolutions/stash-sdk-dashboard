import { testRender } from '../../../test_utils'
import TransactionTimeline from './index'

it('TransactionTimeline Should Render', () =>
  testRender(TransactionTimeline, {
    timeline: [
      {
        action: 'REFUND',
        amount: 3470,
        createdDate: '2019-06-26 14:49:18',
        reason: 'No se',
        status: 'SUCCESS'
      },
      {
        action: 'AUTH',
        amount: 3470,
        createdDate: '2019-06-21 17:18:16',
        reason: 'Test Payment',
        status: 'SUCCESS'
      }
    ],
    currencyId: 'EUR'
  }))

it('TransactionTimeline Should ommit empty reasons', () =>
  testRender(TransactionTimeline, {
    timeline: [
      {
        action: 'REFUND',
        amount: 3470,
        createdDate: '2019-06-26 14:49:18',
        reason: '',
        status: 'SUCCESS'
      },
      {
        action: 'AUTH',
        amount: 3470,
        createdDate: '2019-06-21 17:18:16',
        reason: 'Test Payment',
        status: 'SUCCESS'
      }
    ],
    currencyId: 'EUR'
  }))
