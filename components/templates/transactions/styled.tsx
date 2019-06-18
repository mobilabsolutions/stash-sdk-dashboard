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
  font-size: 1.2em;
  font-weight: bold;
  margin: 0px;
  flex: 1 1 25%;
`

const getStatusColor = props => {
  switch (props.status) {
    case 'captured':
    case 'pre-Authorised':
    case 'authorised':
      return '#00be41'
    case 'fail':
      return props.theme.red.A400
    case 'reversed':
    case 'refunded':
      return '#f7981c'
    default:
      return props.theme.primary.A800
  }
}

const getStatusBackgroundColor = ({ status, theme }) => {
  switch (status) {
    case 'captured':
    case 'pre-Authorised':
    case 'authorised':
      return '#5edb8926'
    case 'fail':
      return '#ff9b9b26'
    case 'reversed':
    case 'refunded':
      return '#f7981c26'
    default:
      return theme.primary.A800
  }
}

type StatusProps = {
  status: string
}

export const Status = styled.span<StatusProps>`
  color: ${getStatusColor};
  background-color: ${getStatusBackgroundColor};
  font-size: 14px;
  text-transform: capitalize;
  text-align: center;
  padding: 8px;
  margin: auto;
  border-radius: 18px;
  justify-self: flex-start;
  max-width: 130px;
  flex: 0 0 10em;
`

export const Timestamp = styled.p`
  color: ${props => props.theme.shade.A700};
  font-size: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: auto;
  flex: 0 0 18em;
`

export const Reason = styled.p`
  color: ${props => props.theme.shade.A500};
  font-size: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  line-height: 19px; /* fallback */
  max-height: 38px; /* fallback */
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  white-space: initial;
  margin: 0px;
`

export const CustomerId = styled.p`
  color: ${props => props.theme.shade.A700};
  font-size: 1em;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0px;
  flex: 1 1 50%;
`

export const Amount = styled.p`
  color: ${props => props.theme.shade.A800};
  font-weight: bold;
  font-size: 16px;
  line-height: 1.38;
  font-variant-numeric: tabular-nums;
  margin: 0px;
  flex: 0 0 4em;
`
