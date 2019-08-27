export interface RefundOverview {
  amount: number
  day: string
}

export interface PaymentMethodOverview {
  day: string
  paymentMethodData: {
    amount: number
    paymentMethod:
      | 'CC'
      | 'SEPA'
      | 'PAY_PAL'
      | 'GOOGLE_PAY'
      | 'APPLE_PAY'
      | 'KLARNA'
  }[]
}
