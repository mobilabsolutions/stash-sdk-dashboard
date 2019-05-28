export const statusToAction = {
  'pre-Authorised': 'PREAUTH',
  authorised: 'AUTH',
  reversed: 'REVERSAL',
  refunded: 'REFUND',
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

export const actionTOAtatus = reverse(statusToAction)
