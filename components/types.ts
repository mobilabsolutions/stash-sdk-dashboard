export enum PspType {
  BS_PAYONE = 'BS_PAYONE',
  BRAINTREE = 'BRAINTREE'
}

export interface PspConfig {
  type: PspType
}
