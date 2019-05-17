import React from 'react'
import {
  PayPal,
  Sepa,
  CreditCard,
  Visa,
  AmericanExpress,
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
    case 'APPLE_PAY':
    case 'KLARNA':
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
      <Icon width={30} height={20} />
    </div>
  )
}
