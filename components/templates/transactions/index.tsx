import { useState } from 'react'

import { CenteredText } from '../../molecules'
import { useLocalization } from '../../../hooks'

import Popup from './popup'
import {
  List,
  Item,
  ItemRow,
  TransactionId,
  Status,
  Timestamp,
  Reason,
  CustomerId,
  Amount
} from './styled'

export default ({ data, isLoading, isRefunding, refund, filterHeight }) => {
  const { getText, formatDate, formatAmount } = useLocalization()
  const [detail, setDetail] = useState(null)

  if (!data || data.length === 0) {
    return isLoading ? (
      <CenteredText>{getText('Loading Data')}</CenteredText>
    ) : (
      <CenteredText>{getText('No Data')}</CenteredText>
    )
  }

  return (
    <List filterHeight={filterHeight}>
      {data.map(row => {
        return (
          <Item key={row.transactionId} onClick={() => setDetail(row)}>
            <ItemRow>
              <TransactionId>#{row.transactionId}</TransactionId>
              <Status status={row.status}>{getText(row.status)}</Status>
              <Timestamp>{formatDate(row.timestamp)}</Timestamp>
            </ItemRow>
            <ItemRow>
              <Reason>{row.reason}</Reason>
              <Amount>{formatAmount(row.currency, row.amount)}</Amount>
            </ItemRow>
            {!!row.customerId && (
              <ItemRow>
                <CustomerId>{row.customerId}</CustomerId>
              </ItemRow>
            )}
          </Item>
        )
      })}
      <Popup
        detail={detail}
        onClose={() => setDetail(null)}
        isRefunding={isRefunding}
        onRefund={refund}
      />
    </List>
  )
}
