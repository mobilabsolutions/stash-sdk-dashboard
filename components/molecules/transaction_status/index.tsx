import styled from '../../styled'
import {
  getStatusColor,
  getStatusBackgroundColor
} from '../../../assets/payment.static'

type StatusProps = {
  status: string
}

const Status = styled.span<StatusProps>`
  color: ${props => getStatusColor(props.status)};
  background-color: ${props => getStatusBackgroundColor(props.status)};
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
