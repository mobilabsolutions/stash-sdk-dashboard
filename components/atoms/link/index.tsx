import Link from 'next/link'

import styled from '../../styled'

const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  > span {
    color: ${props => props.theme.shade.A200};
    font-family: ${props => props.theme.font};
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.29;
    letter-spacing: normal;
    :hover {
      text-decoration: underline;
    }
  }
`

export default function HyperLink({ label, href }) {
  return (
    <Link href={href}>
      <A href={href}>
        <span>{label}</span>
      </A>
    </Link>
  )
}
