import React from 'react'
import {
  PayPal,
  Sepa,
  CreditCard,
  Visa,
  AmericanExpress,
  Klarna,
  ApplePay,
  GooglePay,
  Amex,
  CarteBleue,
  DinerClub,
  Discover,
  JCB,
  Maestro,
  MasterCard,
  Dinners,
  DK,
  UnionPay
} from '../../atoms'

function getCreditCard(ccType: string) {
  switch (ccType) {
    case 'VISA':
      return Visa
    case 'DK':
      return DK
    case 'DINERS':
      return Dinners
    case 'AMERICANEXPRESS':
      return AmericanExpress
    case 'AMEX':
      return Amex
    case 'CARTEBLEUE':
      return CarteBleue
    case 'DINERCLUB':
      return DinerClub
    case 'DISCOVER':
      return Discover
    case 'JCB':
      return JCB
    case 'MAESTRO':
      return Maestro
    case 'MASTER_CARD':
      return MasterCard
    case 'UNIONPAY':
      return UnionPay
    case 'VISA':
      return Visa
    default:
      return CreditCard
  }
}

function getIcon(paymentMethod: string) {
  switch (paymentMethod) {
    case 'SEPA':
      return Sepa
    case 'PAY_PAL':
      return PayPal
    case 'GOOGLE_PAY':
      return GooglePay
    case 'APPLE_PAY':
      return ApplePay
    case 'KLARNA':
      return Klarna
    case 'CC':
    default:
      return getCreditCard(paymentMethod)
  }
}

interface Props {
  paymentMethod: string
  title: string
}

export default function PaymentMethod(props: Props) {
  const Icon = getIcon(props.paymentMethod)
  return (
    <div title={props.title}>
      <Icon width={40} height={30} />
    </div>
  )
}
