import styled from '../../styled'

const year = new Date().getFullYear()

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${props => props.theme.shade.A25};
`

const Span = styled.span`
  color: ${props => props.theme.shade.A500};
  font-family: ${props => props.theme.fontHeadline};
  font-size: 0.8em;
  line-height: 1.29;
  margin-right: 24px;
  margin-bottom: 8px;
  display: block;
`

export default () => {
  return (
    <Footer>
      <Span>© MobiLab Solutions GmbH, {year}</Span>
    </Footer>
  )
}
