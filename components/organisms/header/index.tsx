import styled from '../../styled'

import { useLocalization } from '../../../hooks'
import { Logo } from '../../atoms'
import HeaderNavItem from './nav_item'

const HtmlHeader = styled.header`
  background-color: ${props => props.theme.white};
  height: 73px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LogoContainer = styled.div`
  padding-left: 32px;
  padding-right: 32px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
`

export default function Header({ activePath }) {
  const { getText } = useLocalization()

  return (
    <HtmlHeader>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <Nav>
        <HeaderNavItem
          label={getText('Home')}
          href="/"
          isActive={activePath === '/'}
        />
        <HeaderNavItem
          label={getText('Transactions')}
          href="/transactions"
          isActive={activePath === '/transactions'}
        />
        <HeaderNavItem
          label={getText('Reports')}
          href="/reports"
          isActive={activePath === '/reports'}
        />
        <HeaderNavItem
          label={getText('Account')}
          href="/account"
          isActive={activePath === '/account'}
        />
      </Nav>
    </HtmlHeader>
  )
}
