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

export interface ChangePasswordProps {
  oldPassword?: string
  newPassword?: string
  newPasswordRetype?: string
}

interface PrivateKey {
  id: string
  name: string
}

interface PublicKey {
  id: string
  key: string
}

export interface KeysConfig {
  private: PrivateKey[]
  public: PublicKey[]
}
