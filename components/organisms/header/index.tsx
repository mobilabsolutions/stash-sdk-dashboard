import Router from 'next/router'

import styled from '../../styled'

import { useLocalization, useApi } from '../../../hooks'
import { Logo, LogoutIcon } from '../../atoms'
import HeaderNavItem from './nav_item'

const HtmlHeader = styled.header`
  background-color: ${props => props.theme.white};
  height: 73px;
  display: flex;
  flex-direction: row;
  align-items: center;
  > .icons {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 36px;
  }
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
  const { logout } = useApi()

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
      <div className="icons">
        <LogoutIcon
          onClick={() => {
            logout()
            Router.push('/login')
          }}
        />
      </div>
    </HtmlHeader>
  )
}
