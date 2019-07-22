import { PspType } from 'components/types'

export interface CCConfig {
  ccExpiry: string
  ccHolderName: string
  ccMask: string
  ccType: string
}

export interface PayPalConfig {
  billingAgreementId: number
  deviceData: {
    correlation_id: number
  }
  nonce: string
}

export interface PersonalData {
  city: string
  country: string
  customerIP: string
  customerReference: string
  email: string
  firstName: string
  lastName: string
  street: string
  zip: number
}
export interface SepaConfig {
  bic: string
  iban: string
}
export enum PaymentMethod {
  SEPA = 'SEPA',
  PAY_PAL = 'PAY_PAL',
  CC = 'CC',
  GOOGLE_PAY = 'GOOGLE_PAY',
  APPLE_PAY = 'APPLE_PAY'
}
export interface Extra {
  ccConfig?: CCConfig
  payPalConfig?: PayPalConfig
  payload: string
  paymentMethod: PaymentMethod
  personalData: PersonalData
  sepaConfig?: SepaConfig
}
export enum TransactionAction {
  AUTH = 'AUTH',
  PREAUTH = 'PREAUTH',
  REVERSAL = 'REVERSAL',
  REFUND = 'REFUND',
  ADDITIONAL = 'ADDITIONAL',
  CHARGEBACK = 'CHARGEBACK',
  'CHARGEBACK-REVERSAL' = 'CHARGEBACK-REVERSAL',
  CAPTURE = 'CAPTURE'
}

export enum TransactionStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAIL = 'FAIL'
}

export interface PspConfig {
  accountId: string
  country: string
  currency: string
  default: true
  key: string
  locale: string
  merchantId: string
  portalId: string
  privateKey: string
  publicKey: string
  sandboxMerchantId: string
  sandboxPrivateKey: string
  sandboxPublicKey: string
  type: PspType
  urlPrefix: string
}

export interface TimeAction {
  action: TransactionAction
  amount: number
  createdDate: string
  reason: string
  status: TransactionStatus
}

export interface TransactionDetails {
  action: TransactionAction
  aliasId: string
  amount: number
  createdDate: string
  currencyId: string
  merchantCustomerId: string
  merchantId: string
  merchantTransactionId: string
  paymentInfo: {
    extra: Extra
    pspConfig: PspConfig
  }
  paymentMethod: PaymentMethod
  pspTestMode: true
  reason: string
  status: TransactionStatus
  timelineInfo: Array<TimeAction>
  transactionId: string
}
