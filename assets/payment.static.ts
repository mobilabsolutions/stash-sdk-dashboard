export const statusToAction = {
  'pre-Authorised': 'PREAUTH',
  authorised: 'AUTH',
  reversed: 'REVERSAL',
  refunded: 'REFUND',
  fail: 'FAIL',
  captured: 'CAPTURE'
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

export const paymentMethods = [
  {
    name: 'SEPA',
    type: 'PM'
  },
  {
    name: 'PAY_PAL',
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
