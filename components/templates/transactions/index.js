import styled from 'styled-components'

import { CenteredText } from '../../molecules'
import { useLocalization } from '../../../hooks'

const List = styled.ol`
  display: block;
  flex: 1 1 auto;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  max-height: calc(100% - 100px);
`

const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  :nth-child(even) {
    background-color: ${props => props.theme.shade.A25};
  }
  :hover {
    background-color: ${props => props.theme.primary.A25};
  }
`

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
  align-items: baseline;
  flex-wrap: wrap;
`

const TransactionId = styled.p`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1.2em;
  font-weight: bold;
  margin: 0px;
  flex: 1 1 25%;
`

const getStatusBackgroundColor = props => {
  switch (props.status) {
    case 'bs_initiated':
      return props.theme.primary.A700
    case 'approved':
      return props.theme.primary.A800
    case 'declined':
      return props.theme.shade.A800
    case 'cancelled':
      return props.theme.shade.A700
    case 'refunded':
      return props.theme.violet.A800
    case 'error':
      return props.theme.orange.A800

    default:
      return props.theme.primary.A800
  }
}

const Status = styled.p`
  color: ${props => props.theme.shade.A50};
  background-color: ${getStatusBackgroundColor};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  padding: 8px;
  border-radius: 16px;
  justify-self: flex-start;
  margin: 0px 8px 0px 8px;
  flex: 0 0 10em;
`

const Timestamp = styled.p`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  margin: 0px 2em 0px 1em;
  flex: 0 0 18em;
`

const Reason = styled.p`
  color: ${props => props.theme.shade.A500};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  margin: 0px;
  flex: 1 1 75%;
`

const CustomerId = styled.p`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  font-weight: bold;
  margin: 0px;
  flex: 1 1 50%;
`

const Amount = styled.p`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1.2em;
  font-weight: bold;
  text-align: right;
  font-variant-numeric: tabular-nums;
  margin: 0px;
  flex: 0 0 4em;
`

export default ({ data, isLoading }) => {
  const { getText, formatDate, formatAmount } = useLocalization()

  if (!data || data.length === 0) {
    return isLoading ? (
      <CenteredText>{getText('Loading Data')}</CenteredText>
    ) : (
      <CenteredText>{getText('No Data')}</CenteredText>
    )
  }

  return (
    <List>
      {data.map((row, index) => {
        const timestamp = new Date(row.timestamp)
        const dateString = formatDate(timestamp)
        const amountString = formatAmount(row.currency, row.amount * 15)

        return (
          <Item key={row.transactionId}>
            <ItemRow>
              <TransactionId>#{row.transactionId}</TransactionId>
              <Status status={row.status}>{getText(row.status)}</Status>
              <Timestamp>{dateString}</Timestamp>
            </ItemRow>
            <ItemRow>
              <Reason>{row.reason}</Reason>
              <Amount>{amountString}</Amount>
            </ItemRow>
            {!!row.customerId && (
              <ItemRow>
                <CustomerId>{row.customerId}</CustomerId>
              </ItemRow>
            )}
          </Item>
        )
      })}
    </List>
  )
}
