import { useState } from 'react'

import styled from 'components/styled'

import { useLocalization } from '../../../hooks'
import { PrimaryButton, SecondaryButton, WarnButton } from '../../atoms'
import { Popup } from '../../molecules'

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentContainer = styled.div`
  padding: 32px;
`

const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0 12px 0;
`

const Label = styled.label`
  color: ${props => props.theme.shade.A600};
  font-family: ${props => props.theme.font};
  font-size: 1.2em;
  width: 10em;
  flex: 0 0 35%;
`

const Value = styled.span`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1.2em;
  font-weight: bold;
  width: 10em;
  flex: 0 0 60%;
`

const ButtonContainer = styled.div`
  background-color: ${props => props.theme.shade.A25};
  display: flex;
  flex-direction: row;
  padding: 12px 24px 12px 24px;
  align-items: center;
  justify-content: flex-end;
  border-radius: 5px;
  > button {
    margin-left: 12px;
  }
`

export default ({ detail, onClose, onRefund, isRefunding }) => {
  const { getText, formatDate, formatAmount } = useLocalization()
  const [inRefund, setInRefund] = useState(false)

  const getContent = () => {
    if (inRefund) {
      return (
        <PopupContainer>
          <ContentContainer>
            <Value>
              {getText(
                'Do you really want to Refund %{amount} for the Transaction %{id}?',
                {
                  id: detail.transactionId,
                  amount: formatAmount(detail.currency, detail.amount)
                }
              )}
            </Value>
          </ContentContainer>
          <ButtonContainer>
            <SecondaryButton
              label={getText('Cancel')}
              onClick={() => {
                setInRefund(false)
                onClose()
              }}
            />
            <WarnButton
              label={getText('Refund')}
              onClick={() => {
                onRefund(detail.transactionId).then(() => onClose())
              }}
              disabled={isRefunding}
            />
          </ButtonContainer>
        </PopupContainer>
      )
    }

    return (
      <PopupContainer>
        <ContentContainer>
          <ValueContainer>
            <Label>{getText('ID')}</Label>
            <Value>{detail.transactionId}</Value>
          </ValueContainer>
          <ValueContainer>
            <Label>{getText('Status')}</Label>
            <Value>{detail.status}</Value>
          </ValueContainer>
          <ValueContainer>
            <Label>{getText('Text')}</Label>
            <Value>{detail.reason}</Value>
          </ValueContainer>
          <ValueContainer>
            <Label>{getText('CustomerID')}</Label>
            <Value>{detail.customerId}</Value>
          </ValueContainer>
          <ValueContainer>
            <Label>{getText('Timestamp')}</Label>
            <Value>{formatDate(detail.timestamp)}</Value>
          </ValueContainer>
          <ValueContainer>
            <Label>{getText('Amount')}</Label>
            <Value>{formatAmount(detail.currency, detail.amount)}</Value>
          </ValueContainer>
        </ContentContainer>
        <ButtonContainer>
          {detail.status === 'approved' && (
            <SecondaryButton
              label={getText('Refund')}
              onClick={() => setInRefund(true)}
            />
          )}
          <PrimaryButton label={getText('Close')} onClick={onClose} />
        </ButtonContainer>
      </PopupContainer>
    )
  }

  return (
    <Popup show={!!detail} onClose={onClose}>
      {!!detail && getContent()}
    </Popup>
  )
}
