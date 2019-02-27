import { Paper } from '../../molecules';
import { Header, Footer } from '../../organisms';
import styled from '../../styled';
const Div = styled.div `
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;
const Main = styled.main `
  height: calc(100vh - 108px);
`;
export default ({ children, activePath }) => {
    return (<Div>
      <Header activePath={activePath}/>
      <Main>
        <Paper>{children}</Paper>
      </Main>
      <Footer />
    </Div>);
};
