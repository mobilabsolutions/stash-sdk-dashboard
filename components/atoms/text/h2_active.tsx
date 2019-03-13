import styled from '../../styled'

export default styled.h2`
  font-family: ${props => props.theme.fontHeadline};
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.13;
  letter-spacing: normal;
  color: ${props => props.theme.primary.A600};
`
