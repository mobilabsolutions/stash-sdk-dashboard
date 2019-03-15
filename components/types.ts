export enum PspType {
  BsPayOne = 'BS_PAYONE',
  BrainTree = 'BRAINTREE'
}

export interface PspConfig {
  type: PspType
}
