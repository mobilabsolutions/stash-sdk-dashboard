import { Illustration, Logo } from '../../atoms'
import styled from '../../styled'

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
const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  > .logo {
    padding-top: 40px;
    padding-left: 40px;
    padding-bottom: 120px;
  }
`

export default function AnonymousForm({ handleSubmit, children }) {
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <div className="logo">
          <Logo />
        </div>
        {children}
      </Form>
      <div className="illustration">
        <Illustration />
      </div>
    </Wrapper>
  )
}
