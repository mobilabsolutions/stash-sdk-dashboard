import styled from '../../styled'

type ListProps = {
  filterHeight: number
}

export const List = styled.ol<ListProps>`
  display: block;
  flex: 0 0 auto;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  max-height: calc(100% - 4px - ${props => props.filterHeight || 0}px);
`

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 20px;
  :nth-child(even) {
    background-color: ${props => props.theme.shade.A25};
  }
  :hover {
    background-color: ${props => props.theme.primary.A25};
  }
`

export const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px;
  align-items: baseline;
  flex-wrap: wrap;
`

export const TransactionId = styled.p`
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
      return props.theme.red.A800

    default:
      return props.theme.primary.A800
  }
}

type StatusProps = {
  status: string
}

export const Status = styled.p<StatusProps>`
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

export const Timestamp = styled.p`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  margin: 0px 2em 0px 1em;
  flex: 0 0 18em;
`

export const Reason = styled.p`
  color: ${props => props.theme.shade.A500};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  margin: 0px;
  flex: 1 1 75%;
`

export const CustomerId = styled.p`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  font-weight: bold;
  margin: 0px;
  flex: 1 1 50%;
`

export const Amount = styled.p`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1.2em;
  font-weight: bold;
  text-align: right;
  font-variant-numeric: tabular-nums;
  margin: 0px;
  flex: 0 0 4em;
`
