import Link from 'next/link'
import styled from 'components/styled'

const A = styled.a`
  cursor: pointer;
  margin: 1em;
  text-decoration: none;
`

type Props = {
  isActive: boolean
}

const H1 = styled.h1<Props>`
  color: ${props =>
    props.isActive ? props.theme.primary.A700 : props.theme.shade.A700};
  font-family: ${props => props.theme.fontHeadline};
  font-size: 1.5em;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  letter-spacing: normal;
  line-height: 1.27;
  margin: 0 0 0.5em 0;
  text-align: center;
  ${props =>
    props.isActive && `border-bottom: solid 1px ${props.theme.primary.A700};`}
`

export default ({ label, href, isActive }) => (
  <Link href={href}>
    <A href={href}>
      <H1 isActive={isActive}>{label}</H1>
    </A>
  </Link>
)
