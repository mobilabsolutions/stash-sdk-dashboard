import React from 'react'
import {
  PaymentMethod,
  CCConfig,
  PayPalConfig,
  PersonalData,
  SepaConfig
} from '../../../hooks/types'
import { PayPal, Sepa } from '../../atoms'
import { PaymentMethod as PM } from '../../organisms'
import styled from '../../styled'
import { Iban, CreditCardMask } from '../../molecules'

interface PMProps {
  paymentMethod: PaymentMethod
  ccConfig?: CCConfig
  payPalConfig?: PayPalConfig
  personalData: PersonalData
  sepaConfig?: SepaConfig
}

const FLeftText = styled.span`
  float: left;
  padding-left: 8px;
`
const FLeftIcon = styled.div`
  border: 1px solid ${p => p.theme.shade.A50};
  float: left;
  width: 30px;
  height: 20px;
  margin: auto;
  text-align: center;
`

const PMDetail = ({ children, icon }) => (
  <div>
    <FLeftIcon>{icon()}</FLeftIcon>
    <FLeftText>{children}</FLeftText>
  </div>
)

const PayPalDetail = (p: {
  payPalConfig?: PayPalConfig
  personalData?: PersonalData
}) => {
  const { email = '' } = p.personalData || {}
  return (
    <PMDetail icon={() => <PayPal width={20} height={20} />}>
      {!!email && email}
      {/* reu@dewfwerg.com */}
    </PMDetail>
  )
}

const CCDATA = styled.span`
  padding-right: 16px;
`
const CCDetail = (p: { ccConfig?: CCConfig }) => {
  const { ccType = '', ccMask = '', ccExpiry = '' } = p.ccConfig || {}
  return (
    <PMDetail
      icon={() => (
        <PM width={20} height={20} paymentMethod={ccType} title={ccType} />
      )}
    >
      {!!ccMask || !!ccExpiry ? (
        <>
          <CreditCardMask>{ccMask}</CreditCardMask>
          <CCDATA>{ccExpiry}</CCDATA>
        </>
      ) : (
        <span>No data provided</span>
      )}
    </PMDetail>
  )
}
const SepaDetail = (p: { sepaConfig?: SepaConfig }) => {
  const { iban = '' } = p.sepaConfig
  return (
    <PMDetail icon={() => <Sepa width={20} height={20} />}>
      <Iban value={iban} />
    </PMDetail>
  )
}

export default function PaymentMethodDetail(props: PMProps) {
  const { paymentMethod } = props
  switch (paymentMethod) {
    case PaymentMethod.PAY_PAL:
      return (
        <PayPalDetail
          personalData={props.personalData}
          payPalConfig={props.payPalConfig}
        />
      )
    case PaymentMethod.CC:
      return <CCDetail ccConfig={props.ccConfig} />
    case PaymentMethod.SEPA:
      return <SepaDetail sepaConfig={props.sepaConfig} />
  }
  return <div>Unknown Payment Method</div>
}
