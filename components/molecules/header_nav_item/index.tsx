import Link from 'next/link'

import styled from '../../styled'

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
    props.isActive ? props.theme.primary.A500 : props.theme.shade.A300};
  font-family: ${props => props.theme.fontHeadline};
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.31;
  letter-spacing: -0.3px;
  text-align: center;
`

export default ({ label, href, isActive }) => (
  <Link href={href}>
    <A href={href}>
      <H1 isActive={isActive}>{label}</H1>
    </A>
  </Link>
)
