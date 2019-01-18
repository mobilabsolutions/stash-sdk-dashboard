import styled from 'styled-components'

const H2 = styled.h2`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.fontHeadline}
  font-size: 1.5em;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  letter-spacing: normal;
  line-height: 1.28;
  margin: 0;
`
H2.displayName = 'H2'

export default H2
