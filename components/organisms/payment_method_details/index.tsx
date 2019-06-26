import React from 'react'
import {
  CCConfig,
  PayPalConfig,
  PaymentMethod,
  PersonalData,
  SepaConfig
} from '../../../hooks/types'
import { useLocalization } from '../../../hooks'
import { DetailView, Iban } from '../../molecules'
import styled from '../../styled'

interface PMProps {
  ccConfig?: CCConfig
  payPalConfig?: PayPalConfig
  paymentMethod: PaymentMethod
  personalData: PersonalData
  sepaConfig?: SepaConfig
  aliasId: string
}

function getAdrress(
  street?: string,
  zip?: number,
  city?: string,
  country?: string
) {
  return `${street ? `${street}, ` : ''}${zip ? `${zip}, ` : ''}${
    city ? `${city}, ` : ''
  }${country ? `${country}, ` : ''}`
}

const TileTD = styled.td`
  padding: 3px 16px 3px 0px;
  font-weight: bold;
`

const getDetailItems = (
  pm: PaymentMethod,
  personalData: PersonalData = {
    city: '',
    country: '',
    customerIP: '',
    customerReference: '',
    email: '',
    firstName: '',
    lastName: '',
    street: '',
    zip: null
  },
  sepaConfig: SepaConfig = { iban: null, bic: null },
  ccConfig: CCConfig = {
    ccExpiry: null,
    ccHolderName: null,
    ccMask: null,
    ccType: null
  },
  aliasId
): Array<{ title: string; render?: Function | any }> => {
  const address = getAdrress(
    personalData.street,
    personalData.zip,
    personalData.city,
    personalData.country
  )
  const DeatailMap = {
    [PaymentMethod.PAY_PAL]: [
      {
        title: 'E-mail',
        render: personalData.email
      },
      {
        title: 'Billing Address',
        render: address ? address : 'No address'
      }
    ],
    [PaymentMethod.SEPA]: [
      {
        title: 'Name',
        render: `${personalData.firstName} ${personalData.lastName}`
      },
      {
        title: 'IBAN',
        render: () => <Iban value={sepaConfig.iban} />
      }
    ],
    [PaymentMethod.CC]: [
      {
        title: 'Name',
        render: ccConfig.ccHolderName
      },
      {
        title: 'Number',
        render: ccConfig.ccMask
      },
      {
        title: 'Alias',
        render: aliasId
      },
      {
        title: 'Expires',
        render: ccConfig.ccExpiry
      },
      {
        title: 'Billing Address',
        render: address ? address : 'No address'
      }
    ]
  }
  return DeatailMap[pm]
}

export default function PaymentMethodDetails(props: PMProps) {
  const { getText } = useLocalization()
  const items = getDetailItems(
    props.paymentMethod,
    props.personalData,
    props.sepaConfig,
    props.ccConfig,
    props.aliasId
  )
  return (
    <DetailView
      title={getText('Payment Method')}
      wrapperStyle={{ height: '100%' }}
    >
      <table>
        <tbody>
          {items
            .filter(it => !!it.render)
            .map(it => (
              <tr key={it.title}>
                <TileTD>{getText(it.title)}</TileTD>
                <td>
                  {typeof it.render === 'function' ? it.render() : it.render}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {}
    </DetailView>
  )
}
