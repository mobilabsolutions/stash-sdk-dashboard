import React from 'react'
import { DetailView, Status } from '../../molecules'
import { useLocalization } from '../../../hooks'
import styled from '../../styled'
import { H1, FlatButton } from '../../atoms'
import {
  getMappedStatus,
  getActionsByStatus
} from '../../../assets/payment.static'
import moment from 'moment'
import { Extra } from '../../../hooks/types'
import PaymentMethodDetail from './payment_method_detail'

const Wrapper = styled.div`
  display: block;
  width: 100%;
`
const PartWrapper = styled.div`
  display: block;
  float: left;
  width: 50%;
`
const ActionContainer = styled.div`
  float: right;
`
interface EssentilasProps {
  amount: number
  currency: string
  status: string
  action: string
  date: string | Date | number
  extra: Extra
}

const Amount = styled(H1)`
  margin: 0;
  padding-right: 16px;
  float: left;
`
const CustomStatus = styled(Status)`
  font-weight: bold;
  position: absolute;
`

const ActBtn = styled(FlatButton)`
  border: none;
  background-color: ${p => p.theme.shade.A25};
  padding: 7px 27px;
  border-radius: 16.5px;
  margin-left: 16px;
`
const ItemWrapper = styled.div`
  display: block;
  float: left;
  padding-right: 24px;
`
const DetailList = styled.div`
  display: block;
  width: 100%;
  padding-top: 24px;
  float: left;
`

const DetailItemTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  padding-bottom: 8px;
  display: block;
`

const DetailItem = ({ name = '', children }) => (
  <ItemWrapper>
    <DetailItemTitle>{name}</DetailItemTitle>
    {children}
  </ItemWrapper>
)

export default function TransactionEssentials(props: EssentilasProps) {
  const { getText } = useLocalization()
  const { amount, currency, action, status, date, extra } = props
  const _status = getMappedStatus(status, action)
  const actions = getActionsByStatus(_status)
  const _date = moment(date, moment.defaultFormatUtc).format('MMM D, h:mm A')
  const customer = extra.personalData
  const fullName = !!customer
    ? `${!!customer.firstName ? customer.firstName : ''} ${
        !!customer.lastName ? customer.lastName : ''
      }`.trim()
    : ''

  return (
    <DetailView title={getText('Details')} wrapperStyle={{ height: '160px' }}>
      <Wrapper>
        <PartWrapper>
          <Amount>
            {amount} {currency}
          </Amount>
          <CustomStatus status={_status}>{getText(_status)}</CustomStatus>
        </PartWrapper>
        <PartWrapper>
          <ActionContainer>
            {actions.map((act, i) => (
              <ActBtn key={`${i}-${act.type}`} label={act.type}>
                {getText(act.type)}
              </ActBtn>
            ))}
          </ActionContainer>
        </PartWrapper>
        <DetailList>
          <DetailItem name={getText('Date')}>
            <span>{_date}</span>
          </DetailItem>
          {!!fullName && (
            <DetailItem name={getText('Customer')}>
              <span>{fullName}</span>
            </DetailItem>
          )}

          <DetailItem name={getText('Payment Method')}>
            <PaymentMethodDetail
              paymentMethod={extra.paymentMethod}
              ccConfig={extra.ccConfig}
              payPalConfig={extra.payPalConfig}
              sepaConfig={extra.sepaConfig}
              personalData={extra.personalData}
            />
          </DetailItem>
        </DetailList>
      </Wrapper>
    </DetailView>
  )
}
