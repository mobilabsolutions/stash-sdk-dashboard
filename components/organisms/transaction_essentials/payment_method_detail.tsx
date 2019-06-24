import React from 'react'
import {
  PaymentMethod,
  CCConfig,
  PayPalConfig,
  PersonalData,
  SepaConfig
} from '../../../hooks/types'
import { PayPal, Sepa } from '../../atoms'
import styled from '../../styled'
import NumberFormat from 'react-number-format'

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
}) => (
  <PMDetail icon={() => <PayPal width={20} height={20} />}>
    {!!p.personalData.email && p.personalData.email}
    {/* reu@dewfwerg.com */}
  </PMDetail>
)
const CCDetail = (p: { ccConfig?: CCConfig }) => <div></div>
const SepaDetail = (p: { sepaConfig?: SepaConfig }) => (
  <PMDetail icon={() => <Sepa width={20} height={20} />}>
    <NumberFormat
      displayType="text"
      format="#### #### #### ##### ##"
      value={p.sepaConfig.iban}
    />
  </PMDetail>
)

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
