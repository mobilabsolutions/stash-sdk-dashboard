import styled from 'styled-components'

const H3 = styled.h3`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.fontHeadline}
  font-size: 1.25em;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  letter-spacing: normal;
  line-height: 1.35;
  margin: 0 0 0.3em 0;
  text-align: center;
`
H3.displayName = 'H3'

export default H3
