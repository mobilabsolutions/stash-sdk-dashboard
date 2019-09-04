export enum PspType {
  BS_PAYONE = 'BS_PAYONE',
  ADYEN = 'ADYEN',
  BRAINTREE = 'BRAINTREE'
}

export interface PSP {
  accountId?: number
  country?: string
  currency?: string
  default?: boolean
  key?: number
  locale?: string
  merchantId?: number
  portalId?: number
  privateKey?: string
  publicKey?: string
  sandboxMerchantId?: number
  sandboxPrivateKey?: string
  sandboxPublicKey?: string
  type: PspType
  urlPrefix?: string
  clientEncryptionKey?: string
}
