import styled from 'styled-components'

const H4 = styled.h4`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.fontHeadline}
  font-size: 1em;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  letter-spacing: normal;
  line-height: 1.3;
  margin: 0 0 0.2em 0;
  text-align: center;
`
H4.displayName = 'H4'

export default H4
