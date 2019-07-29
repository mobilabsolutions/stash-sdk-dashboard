import styled from '../../styled'

const year = new Date().getFullYear()

const HtmlFooter = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: ${props => props.theme.shade.A25};
`

const Span = styled.span`
  font-family: ${props => props.theme.fontHeadline};
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${props => props.theme.shade.A200};
  margin-right: ${p => p.theme.spacing.medium};
  margin-bottom: ${p => p.theme.spacing.xsmall};
  display: block;
`

export default function Footer() {
  return (
    <HtmlFooter>
      <Span>© MobiLab Solutions GmbH, {year}</Span>
    </HtmlFooter>
  )
}
