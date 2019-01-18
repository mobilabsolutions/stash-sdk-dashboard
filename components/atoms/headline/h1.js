import styled from 'styled-components'

const H1 = styled.h1`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.fontHeadline}
  font-size: 2em;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  letter-spacing: normal;
  line-height: 1.27;
  margin: 0 0 0.5em 0;
  text-align: center;
`
H1.displayName = 'H1'

export default H1
