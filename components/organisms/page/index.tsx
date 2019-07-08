import { Header, Footer } from '..'
import styled from '../../styled'
import { Loading } from '../../molecules'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

const Main = styled.main`
  height: calc(100vh - 97px);
  background-color: ${props => props.theme.shade.A25};
`

export default function Page({ children, activePath, isLoading = false }) {
  return (
    <Div>
      <Header activePath={activePath} />
      {isLoading && <Loading />}
      <Main>{children}</Main>
      <Footer />
    </Div>
  )
}
