import styled from 'styled-components'

export default styled.button`
  font-weight: bold;
  border: none;
  color: ${props => props.theme.primary};
  padding: 0.5em;
  cursor: pointer;
  background: none;
`
