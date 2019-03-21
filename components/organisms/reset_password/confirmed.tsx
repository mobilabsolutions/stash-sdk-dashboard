import { IllustrationPassword, Logo, H2, Link } from '../../atoms'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  > .illustration {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    padding-top: calc(200px);
    height: 100%;
    background-color: ${props => props.theme.shade.A25};
    @media (max-width: 700px) {
      display: none;
    }
  }
`
const LeftWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  > .logo {
    padding-top: 40px;
    padding-left: 40px;
    padding-bottom: 120px;
  }
  > .link {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
  justify-self: center;
  align-self: center;
  width: 300px;
`

const ContentWrapper = styled.div`
  justify-self: center;
  align-self: center;
  width: 300px;
`

export default function ForgotPasswordConfirmed() {
  const { getText } = useLocalization()
  return (
    <Wrapper>
      <LeftWrapper>
        <div className="logo">
          <Logo />
        </div>
        <ContentWrapper>
          <H2>{getText('Password wurde geändert')}</H2>
        </ContentWrapper>
        <div className="link">
          <Link href="/login" label={getText('Login')} />
        </div>
      </LeftWrapper>
      <div className="illustration">
        <IllustrationPassword />
      </div>
    </Wrapper>
  )
}