import React from 'react'
import { DetailView, TextCurrency } from '../../molecules'
import { useLocalization } from '../../../hooks'
import styled from '../../styled'
import { getMappedStatus } from '../../../assets/payment.static'
import moment from 'moment'

interface DetailProps {
  transactionId: string
  amount: number
  currency: string
  action: string
  status: string
  createdDate: string
  description: string
}

const TileTD = styled.td`
  padding: 3px 16px 3px 0px;
  font-weight: bold;
`

export default function TransactionDetail(prop: DetailProps) {
  const { getText, formatDate } = useLocalization()
  const { transactionId, description, createdDate, action, status } = prop
  const _status = getMappedStatus(status, action)
  const timestamp = moment(createdDate, moment.defaultFormatUtc).toDate()
  return (
    <DetailView
      title={getText('Transaction Details')}
      wrapperStyle={{ height: '185px' }}
    >
      <table>
        <tbody>
          <tr>
            <TileTD>{getText('ID')}</TileTD>
            <td>{transactionId}</td>
          </tr>
          <tr>
            <TileTD>{getText('Amount')}</TileTD>
            <td>
              <TextCurrency currencyId={prop.currency} value={prop.amount} />
            </td>
          </tr>
          <tr>
            <TileTD>{getText('Date')}</TileTD>
            <td>{formatDate(timestamp)}</td>
          </tr>
          <tr>
            <TileTD>{getText('Status')}</TileTD>
            <td>{getText(_status)}</td>
          </tr>
          <tr>
            <TileTD>{getText('Description')}</TileTD>
            <td>{description}</td>
          </tr>
        </tbody>
      </table>
    </DetailView>
  )
}
