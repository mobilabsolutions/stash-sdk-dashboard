import React from 'react'
import { DetailView, Status } from '../../molecules'
import { useLocalization } from '../../../hooks'
import styled from '../../styled'
import { H1 } from '../../atoms'
import { getMappedStatus } from '../../../assets/payment.static'
import moment from 'moment'
import { Extra } from '../../../hooks/types'
import PaymentMethodDetail from './payment_method_detail'
import NumberFormat from 'react-number-format'
import Actions from './actions'

const Wrapper = styled.div`
  display: block;
  width: 100%;
`
const PartWrapper = styled.div`
  display: block;
  float: left;
  position: relative;
  width: 50%;
`
interface ActionControl {
  isLoading: boolean
  error: any
  action: Function
  setError: Function
}
interface EssentilasProps {
  amount: number
  currency: string
  status: string
  action: string
  transactionId: string
  date: string | Date | number
  extra: Extra
  refund: ActionControl
  reverse: ActionControl
  capture: ActionControl
}

const Amount = styled(H1)`
  margin: 0;
  padding-right: 16px;
  font-family: inherit;
  float: left;
`
const CustomStatus = styled(Status)`
  font-weight: bold;
  position: absolute;
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
  const {
    amount,
    currency,
    action,
    status,
    date,
    extra,
    refund,
    capture,
    reverse,
    transactionId
  } = props
  const _status = getMappedStatus(status, action)
  const _date = moment(date, moment.defaultFormatUtc).format('MMM D, h:mm A')
  const customer = extra.personalData
  const fullName = !!customer
    ? `${!!customer.firstName ? customer.firstName : ''} ${
        !!customer.lastName ? customer.lastName : ''
      }`.trim()
    : ''

  return (
    <DetailView
      title={getText('Transaction')}
      wrapperStyle={{ height: '160px' }}
    >
      <Wrapper>
        <PartWrapper>
          <NumberFormat
            displayType="text"
            renderText={val => (
              <>
                <Amount>{val}</Amount>
                <Amount style={{ fontWeight: 'normal' }}>{currency}</Amount>
              </>
            )}
            value={amount}
            decimalScale={2}
            fixedDecimalScale
          ></NumberFormat>
          <CustomStatus status={_status}>{getText(_status)}</CustomStatus>
        </PartWrapper>
        <PartWrapper>
          <Actions
            action={action}
            status={status}
            refund={refund}
            capture={capture}
            reverse={reverse}
            transactionId={transactionId}
            currency={currency}
            amount={amount}
          />
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
