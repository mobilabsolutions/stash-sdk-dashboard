import styled from 'components/styled'

const Border = styled.div`
  display: flex;
  padding: 24px;
  background-color: ${props => props.theme.shade.A500};
  height: 100%;
  margin: 0px;
`

const Inner = styled.div`
  flex: 1 1 100%;
  border-radius: 5px;
  background-color: ${props => props.theme.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.24);
  position: relative;
`

export default ({ children }) => (
  <Border>
    <Inner>{children}</Inner>
  </Border>
)
