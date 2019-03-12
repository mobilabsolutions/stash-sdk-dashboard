const merchants = [
  {
    id: 'mobilab',
    name: 'MobiLab Solutions GmbH',
    defaultCurrencyId: 'EUR',
    createdAt: '2019-03-12T14:26:02.754Z',
    lastModifiedAt: '2019-03-12T14:26:02.754Z',
    psp: [
      {
        type: 'BSPAYONE',
        accountId: '42949',
        portalId: '2030968',
        key: '1234567890',
        createdAt: '2019-03-12T14:26:02.754Z',
        lastModifiedAt: '2019-03-12T14:26:02.754Z'
      },
      {
        type: 'BRAINTREE',
        publicKey: '42949',
        privateKey: '2030968',
        createdAt: '2019-03-12T14:26:02.754Z',
        lastModifiedAt: '2019-03-12T14:26:02.754Z'
      }
    ],
    keys: [
      {
        id: 1,
        key: '1234567890',
        keyType: 'PUBLIC',
        name: 'mobile SDK',
        createdAt: '2019-03-12T14:26:02.754Z'
      },
      {
        id: 2,
        key: '0987654321',
        keyType: 'PRIVATE',
        name: 'my Backend',
        createdAt: '2019-03-12T14:26:02.754Z'
      },
      {
        id: 3,
        key: '0987654321',
        keyType: 'PRIVATE',
        name: 'other Backend',
        createdAt: '2019-03-12T14:26:02.754Z'
      }
    ]
  }
]

export async function getMerchantById(merchantId: string) {
  const merchant = merchants.find(item => item.id === merchantId)
  if (!merchant) return null

  const result = { ...merchant }
  delete result.psp
  delete result.keys
  return result
}

export async function updateMerchant(merchantId: string, updateData: object) {
  const merchant = merchants.find(item => item.id === merchantId)
  if (!merchant) return false

  Object.keys(updateData).forEach(key => {
    if (updateData[key]) merchant[key] = updateData[key]
  })
  return true
}

export async function getMerchantKeys(merchantId: string) {
  const merchant = merchants.find(item => item.id === merchantId)
  if (!merchant) return null

  return merchant.keys
}
