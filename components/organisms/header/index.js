import styled from 'styled-components'

import { useLocalization } from '../../../hooks'
import { Logo } from '../../atoms'
import { HeaderNavItem } from '../../molecules'

const Header = styled.header`
  background-color: ${props => props.theme.white};
  height: 84px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  margin-left: 1.5em;
`

export default ({ activePath }) => {
  const { getText } = useLocalization()

  return (
    <Header>
      <Logo />
      <Nav>
        <HeaderNavItem
          label={getText('Transactions')}
          href="/"
          isActive={activePath === '/'}
        />
        <HeaderNavItem
          label={getText('Settings')}
          href="/settings"
          isActive={activePath === '/settings'}
        />
      </Nav>
    </Header>
  )
}
