import styled from 'styled-components'

const Border = styled.div`
  display: flex;
  padding: 24px;
  background-color: ${props => props.theme.shade.A500};
  height: 100%;
`

const Inner = styled.div`
  flex: 1 1 100%;
  border-radius: 5px;
  background-color: ${props => props.theme.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.24);
`

export default ({ children }) => (
  <Border>
    <Inner>{children}</Inner>
  </Border>
)
