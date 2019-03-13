import styled from '../../styled'

export default styled.h1`
  font-family: ${props => props.theme.fontHeadline};
  font-size: 30px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${props => props.theme.shade.A700};
`
