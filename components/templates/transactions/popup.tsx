import { useLocalization } from '../../../hooks'
import { WarnPopup, ActionPopup } from '../../molecules'
import { RefundForm, CaptureForm } from '../../organisms'
import { Warn, LoadingButton, Alert } from '../../atoms'
import styled from '../../styled'

const ErrorContainer = styled.div`
  display: flex;
  padding: 8px 24px;
  background-color: ${props => props.theme.red.A50};
`
const ErrorMessage = ({ children }) => {
  return (
    <ErrorContainer>
      <Alert />
      <span style={{ padding: '0px 24px' }}>{children}</span>
    </ErrorContainer>
  )
}

export default ({
  onClose,
  action,
  isLoading,
  hasError,
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
        {hasError && (
          <ErrorMessage>
            {getText('Refund unsuccessful. Please try again.')}
          </ErrorMessage>
        )}
        <RefundForm
          onCancel={onClose}
          currencyId={currencyId}
          initialRefund={initialRefund}
          isLoading={isLoading}
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

  if (action === 'capture') {
    return (
      <ActionPopup show={show} onClose={onClose} header={getHeader(action)}>
        {hasError && (
          <ErrorMessage>
            {getText('Capture unsuccessful. Please try again.')}
          </ErrorMessage>
        )}
        <CaptureForm
          onCancel={onClose}
          isLoading={isLoading}
          onSubmit={values => {
            onAction(action, values)
          }}
        />
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
      PrimaryButtonEl={({ label, onClick }) => {
        return (
          <LoadingButton
            label={label}
            onClick={onClick}
            isLoading={isLoading}
          />
        )
      }}
    >
      {hasError && (
        <ErrorMessage>
          {getText('Reverse unsuccessful. Please try again.')}
        </ErrorMessage>
      )}
    </WarnPopup>
  )
}
