import React, { useState } from 'react'
import { TransactionActionsPopup } from '..'
import styled from '../../styled'
import { FlatButton } from '../../atoms'
import {
  getMappedStatus,
  getActionsByStatus
} from '../../../assets/payment.static'
import { useLocalization } from '../../../hooks'

const ActionContainer = styled.div`
  float: right;
`
const ActBtn = styled(FlatButton)`
  border: none;
  background-color: ${p => p.theme.shade.A25};
  padding: ${p => p.theme.spacing.xsmall} ${p => p.theme.spacing.medium};
  border-radius: 16.5px;
  margin-left: ${p => p.theme.spacing.small};
`

interface ActionControl {
  isLoading: boolean
  error: any
  action: Function
  setError: Function
}
interface ActionProps {
  refund: ActionControl
  reverse: ActionControl
  capture: ActionControl
  action: string
  status: string
  currency: string
  transactionId: string
  amount: number
  initialAmount: number
  usedAmount: number
}
export default function Actions(props: ActionProps) {
  const { getText } = useLocalization()
  const {
    refund,
    capture,
    reverse,
    status,
    action,
    transactionId,
    currency,
    amount,
    initialAmount,
    usedAmount
  } = props
  const _status = getMappedStatus(status, action)
  const actions = getActionsByStatus(_status, usedAmount, initialAmount)
  const clearError = _action => {
    const map = {
      refund: refund.setError,
      capture: capture.setError,
      reverse: reverse.setError
    }
    typeof map[_action] === 'function' && map[_action]()
  }
  const isActionLoading = _action => {
    const map = {
      refund: refund.isLoading,
      capture: capture.isLoading,
      reverse: reverse.isLoading
    }
    return map[_action]
  }
  const isActionError = _action => {
    const map = {
      refund: refund.error,
      capture: capture.error,
      reverse: reverse.error
    }
    return map[_action]
  }
  const [_action, setAction] = useState<{ type: string; amount?: number }>({
    type: null
  })
  const onClose = () => {
    isActionError(action) && clearError(action)
    setAction({ type: null })
  }

  return (
    <>
      <ActionContainer>
        {actions.map((act, i) => (
          <ActBtn
            key={`${i}-${act.type}`}
            label={act.type}
            onClick={() => setAction(act)}
          >
            {getText(act.type)}
          </ActBtn>
        ))}
      </ActionContainer>
      <TransactionActionsPopup
        onClose={onClose}
        isLoading={isActionLoading(_action.type)}
        hasError={isActionError(_action.type)}
        successActionText={getText('Back to Details')}
        onAction={(
          action: string,
          values: { reason: any; refundType: string; refund: any }
        ) => {
          switch (action) {
            case 'reverse':
              return reverse.action({
                transactionId,
                reason: values.reason || ''
              })
            case 'capture':
              return capture.action({
                transactionId
              })
            case 'refund':
              return refund.action({
                transactionId,
                reason: values.reason,
                amount: values.refundType == 'full' ? amount : values.refund,
                currency: currency
              })
            default:
              return ''
          }
        }}
        action={_action.type}
        initialRefund={_action.amount ? _action.amount / 100 : amount}
        show={!!_action.type}
        currencyId={currency}
      />
    </>
  )
}
