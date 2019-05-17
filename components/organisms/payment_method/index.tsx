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
  UnionPay
} from '../../atoms'

function getCreditCard(ccType: string) {
  switch (ccType) {
    case 'VISA':
      return Visa
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
    case 'MASTERDCARD':
      return MasterCard
    case 'UNIONPAY':
      return UnionPay
    case 'VISA':
      return Visa
    default:
      return CreditCard
  }
}

function getIcon(paymentMethod: string, ccType: string) {
  switch (paymentMethod) {
    case 'CC':
      return getCreditCard(ccType)
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
    default:
      return CreditCard
  }
}

interface Props {
  paymentMethod:
    | 'CC'
    | 'SEPA'
    | 'PAY_PAL'
    | 'GOOGLE_PAY'
    | 'APPLE_PAY'
    | 'KLARNA'
  ccType: string // VISA + 15 more
}

export default function PaymentMethod(props: Props) {
  const Icon = getIcon(props.paymentMethod, props.ccType)
  return (
    <div>
      <Icon width={40} height={30} />
    </div>
  )
}
