import styled from '../../styled'

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

const Status = styled.span<StatusProps>`
  color: ${getStatusColor};
  background-color: ${getStatusBackgroundColor};
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize;
  text-align: center;
  padding: 4px 8px;
  margin: auto;
  border-radius: 18px;
  justify-self: flex-start;
  max-width: 130px;
  flex: 0 0 10em;
`

export default Status
