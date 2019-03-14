import Link from 'next/link'

import { H4, ActiveH4 } from '../../atoms'
import styled from '../../styled'

const A = styled.a`
  cursor: pointer;
  margin: 1em;
  text-decoration: none;
`

export default ({ label, href, isActive }) => {
  return (
    <Link href={href}>
      <A href={href}>
        {isActive ? <ActiveH4>{label}</ActiveH4> : <H4>{label}</H4>}
      </A>
    </Link>
  )
}
