export enum PspType {
  BS_PAYONE = 'BS_PAYONE',
  ADYEN = 'ADYEN',
  BRAINTREE = 'BRAINTREE'
}

export interface PspConfig {
  type: PspType
  bsAccountId?: string
  bsPortalId?: string
  bsKey?: string
  paypalPublicKey?: string
  paypalPrivateKey?: string
}
