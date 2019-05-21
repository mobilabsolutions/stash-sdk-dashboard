import { useLocalization } from '../../../hooks'
import { WarnPopup, ActionPopup } from '../../molecules'
import { RefundForm, ReverseForm } from '../../organisms'
import { Warn, LoadingButton, Alert, Check } from '../../atoms'
import styled from '../../styled'
import { useState, useEffect } from 'react'

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

const SuccessContainer = styled.div`
  margin: auto;
  display: flex;
  width: auto;
  flex-direction: column;
  text-align: center;
`

const SmallContainer = styled.span`
  font-size: 12px;
  color: #a3aaaf;
`

const SuccessMessage = ({ children }) => (
  <SuccessContainer>
    <Check style={{ margin: 'auto' }} />
    {children}
  </SuccessContainer>
)

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

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    !isLoading && setSuccess(false)
  }, [isLoading])

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

  const getSuccess = _action => {
    switch (_action) {
      case 'reverse':
        return getText('Reverse Successful.')
      case 'capture':
        return getText('Capture Successful.')
      case 'refund':
        return getText('Refund Successful.')
      default:
        return ''
    }
  }

  if (success) {
    return (
      <WarnPopup
        show={show}
        secondaryBtn={false}
        onClose={onClose}
        onAction={onClose}
        header={getHeader(action)}
        action={getText('Go to Dashboard')}
      >
        <SuccessMessage>
          <span style={{ padding: 14 }}>{getSuccess(action)}</span>
          {action === 'refund' && (
            <SmallContainer>
              {getText(
                'Refund take 5-10 days to appear on a costumer´s statement.'
              )}
            </SmallContainer>
          )}
        </SuccessMessage>
      </WarnPopup>
    )
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

  if (action === 'reverse') {
    return (
      <ActionPopup show={show} onClose={onClose} header={getHeader(action)}>
        {hasError && (
          <ErrorMessage>
            {getText('Reverse unsuccessful. Please try again.')}
          </ErrorMessage>
        )}
        <ReverseForm
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
          {getText('Capture unsuccessful. Please try again.')}
        </ErrorMessage>
      )}
    </WarnPopup>
  )
}
