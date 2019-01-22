import styled from 'styled-components'

import { useLocalization } from '../../../hooks'

const Wrapper = styled.ol`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: 20px;
  :nth-child(odd) {
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

const Status = styled.p`
  color: ${props => props.theme.shade.A50};
  background-color: ${props => props.theme.primary.A800};
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

export default ({ data }) => {
  const { formatDate, formatAmount } = useLocalization()

  return (
    <Wrapper>
      {data.map((row, index) => {
        const timestamp = new Date(row.timestamp)
        const dateString = formatDate(timestamp)
        const amountString = formatAmount(row.currency, row.amount * 15)

        return (
          <Item key={row.transactionId}>
            <ItemRow>
              <TransactionId>#{row.transactionId}</TransactionId>
              <Status>{row.status}</Status>
              <Timestamp>{dateString}</Timestamp>
            </ItemRow>
            <ItemRow>
              <Reason>{row.reason}</Reason>
              <Amount>{amountString}</Amount>
            </ItemRow>
          </Item>
        )
      })}
    </Wrapper>
  )
}
