import styled from 'styled-components'

const H5 = styled.h5`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.fontHeadline}
  font-size: 0.8em;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  letter-spacing: normal;
  line-height: 1.29;
  margin: 0 0 0.1em 0;
`
H5.displayName = 'H5'

export default H5
