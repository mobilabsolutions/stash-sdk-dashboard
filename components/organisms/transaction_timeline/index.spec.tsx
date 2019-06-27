import { testRender } from '../../../test_utils'
import TransactionTimeline from './index'

it('CaptureForm Should Render', () =>
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
    ]
  }))

it('CaptureForm Should Render warn if last was a pre-auth', () =>
  testRender(TransactionTimeline, {
    timeline: [
      {
        action: 'PREAUTH',
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
        status: 'FAIL'
      }
    ]
  }))

it('CaptureForm Should NOT Render warn if last was not a pre-auth', () =>
  testRender(TransactionTimeline, {
    timeline: [
      {
        action: 'REVERSAL',
        amount: 3470,
        createdDate: '2019-06-26 14:50:18',
        reason: 'No se',
        status: 'SUCCESS'
      },
      {
        action: 'PREAUTH',
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
        status: 'FAIL'
      }
    ]
  }))
