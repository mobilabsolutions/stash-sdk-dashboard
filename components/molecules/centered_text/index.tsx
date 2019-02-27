import styled from 'components/styled'

const Outer = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`

const Text = styled.p`
  color: ${props => props.theme.shade.A300};
  font-family: ${props => props.theme.font};
  font-size: 2em;
  font-weight: bold;
  margin: 0;
`

export default ({ children }) => (
  <Outer>
    <Text>{children}</Text>
  </Outer>
)
