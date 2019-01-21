import styled from 'styled-components'

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${props => props.theme.shade.A50};
`

const Span = styled.span`
  color: ${props => props.theme.shade.A700};
  font-family: ${props => props.theme.fontHeadline}
  font-size: 0.8em;
  line-height: 1.29;
  margin-right: 24px;
  margin-bottom: 8px;
  display: block;
`

export default () => {
  return (
    <Footer>
      <Span>© Mobilabsolutions GmbH 2019</Span>
    </Footer>
  )
}
