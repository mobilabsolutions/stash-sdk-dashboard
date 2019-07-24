import { theme } from './style'
import { TransactionAction, TransactionStatus } from '../hooks/types'

export const statusToAction = {
  'pre-Authorised': TransactionAction.PREAUTH,
  authorised: TransactionAction.AUTH,
  reversed: TransactionAction.REVERSAL,
  refunded: TransactionAction.REFUND,
  fail: TransactionStatus.FAIL,
  chargeback: TransactionAction.CHARGEBACK,
  chargeback_reversed: TransactionAction['CHARGEBACK_REVERSED'],
  additional: TransactionAction.ADDITIONAL,
  pending: TransactionStatus.PENDING,
  captured: TransactionAction.CAPTURE
}

function reverse(
  param:
    | {
        [s: string]: {}
      }
    | ArrayLike<{}>
) {
  return Object.entries(param).reduce((stack, current) => {
    return { ...stack, [current[1].toString()]: current[0] }
  }, {})
}

export const actionToStatus = reverse(statusToAction)

export const getMappedStatus = (status: string, action: string): string => {
  switch (status) {
    case 'SUCCESS':
      return !!actionToStatus[action] ? actionToStatus[action] : 'fail'
    case 'PENDING':
      return 'pending'
    case 'FAIL':
    default:
      return 'fail'
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'captured':
    case 'pre-Authorised':
    case 'authorised':
    case 'reversed':
    case 'chargeback_reversed':
    case 'chargeback':
    case 'additional':
    case 'refunded':
      return '#00be41'
    case 'fail':
      return theme.red.A400
    case 'pending':
      return '#f7981c'
    default:
      return theme.shade.A50
  }
}

export const getStatusBackgroundColor = (status: string) => {
  switch (status) {
    case 'captured':
    case 'pre-Authorised':
    case 'authorised':
    case 'reversed':
    case 'chargeback_reversed':
    case 'chargeback':
    case 'additional':
    case 'refunded':
      return '#5edb8926'
    case 'fail':
      return '#ff9b9b26'
    case 'pending':
      return '#f7981c26'
    default:
      return theme.shade.A50
  }
}

export const isClient = typeof window === 'object'

export function getActionsByStatus(status: string): Array<{ type: string }> {
  switch (status) {
    case 'authorised':
    case 'captured':
      return [
        {
          type: 'refund'
        }
      ]
    case 'pre-Authorised':
      return [
        {
          type: 'capture'
        },
        {
          type: 'reverse'
        }
      ]
    default:
      return []
  }
}

export const paymentMethods = [
  {
    name: 'CC',
    used: true,
    type: 'CC'
  },
  {
    name: 'PAY_PAL',
    used: true,
    type: 'PM'
  },
  {
    name: 'SEPA',
    used: true,
    type: 'PM'
  },

  {
    name: 'GOOGLE_PAY',
    type: 'PM'
  },
  {
    name: 'APPLE_PAY',
    type: 'PM'
  },
  {
    name: 'KLARNA',
    type: 'PM'
  },
  {
    name: 'VISA',
    type: 'CC'
  },
  {
    name: 'UNIONPAY',
    type: 'CC'
  },
  {
    name: 'MASTERCARD',
    type: 'CC'
  },
  {
    name: 'MAESTRO',
    type: 'CC'
  },
  {
    name: 'JCB',
    type: 'CC'
  },
  {
    name: 'DISCOVER',
    type: 'CC'
  },
  {
    name: 'DINERCLUB',
    type: 'CC'
  },
  {
    name: 'CARTEBLEUE',
    type: 'CC'
  },
  {
    name: 'AMEX',
    type: 'CC'
  },
  {
    name: 'AMERICANEXPRESS',
    type: 'CC'
  },
  {
    name: 'DK',
    type: 'CC'
  },
  {
    name: 'DINERS',
    type: 'CC'
  }
]
