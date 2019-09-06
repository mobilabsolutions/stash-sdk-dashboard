import { H2 } from '../../atoms'
import styled from '../../styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${p => p.theme.spacing.xxlarge};
  margin-left: ${p => p.theme.spacing.xxlarge};
  margin-right: ${p => p.theme.spacing.xxlarge};
  margin-bottom: 0;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 ${props => props.theme.shade.A50};
  padding: ${p => p.theme.spacing.small};
`

export const PageTitleSection = ({ title, children }) => {
  return (
    <Wrapper>
      <H2>{title}</H2>
      {children}
    </Wrapper>
  )
}

export default function PageForm({ title, handleSubmit = null, children }) {
  return (
    <Wrapper>
      <H2>{title}</H2>
      <Form onSubmit={handleSubmit}>{children}</Form>
    </Wrapper>
  )
}
