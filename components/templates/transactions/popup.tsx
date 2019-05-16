import { useLocalization } from '../../../hooks'
import { WarnPopup, ActionPopup } from '../../molecules'
import { RefundForm } from '../../organisms'
import { Warn } from '../../atoms'

export default ({
  onClose,
  action,
  show,
  currencyId,
  initialRefund,
  onAction
}) => {
  const { getText } = useLocalization()

  const getHeader = _action => {
    switch (_action) {
      case 'reverse':
        return getText('Are you sure you want to reverse the transaction?')
      case 'capture':
        return getText('Are you sure you want to capture this transaction?')
      case 'refund':
        return getText('Refund Payment')
      default:
        return ''
    }
  }

  if (action === 'refund') {
    return (
      <ActionPopup show={show} onClose={onClose} header={getHeader(action)}>
        <RefundForm
          onCancel={onClose}
          currencyId={currencyId}
          initialRefund={initialRefund}
          onSubmit={values => {
            onAction(action, values)
          }}
        >
          <div style={{ display: 'flex' }}>
            <Warn />
            <span style={{ padding: '0px 5px' }}>
              {getText(
                'Refund take 5-10 days to appear on a costumer´s statement.'
              )}
            </span>
          </div>
        </RefundForm>
      </ActionPopup>
    )
  }

  return (
    <WarnPopup
      show={show}
      onClose={onClose}
      onAction={() => {
        onAction(action)
      }}
      header={getHeader(action)}
      action={getText(action)}
    >
      {null}
    </WarnPopup>
  )
}
