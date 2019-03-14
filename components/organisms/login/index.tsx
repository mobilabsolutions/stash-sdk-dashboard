import { forwardRef } from 'react'
import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import {
  PrimaryButton,
  Link,
  AccountIcon,
  KeyIcon,
  Illustration,
  Logo,
  H2,
  H4
} from '../../atoms'
import { IconInput, IconPasswordInput } from '../../molecules'
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

const FormWrapper = styled.div`
  justify-self: center;
  align-self: center;
  width: 300px;
  > .title {
    padding-left: 8px;
  }
  > .button {
    display: flex;
    margin-top: 24px;
  }
  > .link {
    margin-top: 16px;
    display: flex;
    justify-content: center;
  }
`

interface LoginFormProps {
  email: string
  password: string
}

function LoginForm(props: FormikProps<LoginFormProps>, passwordField: any) {
  const { getText } = useLocalization()
  return (
    <Wrapper>
      <Form onSubmit={props.handleSubmit}>
        <div className="logo">
          <Logo />
        </div>
        <FormWrapper>
          <div className="title">
            <H2>{getText('Welcome')}</H2>
            <H4>{getText('Login to your account')}</H4>
          </div>
          <Field
            name="email"
            render={({ field, form }) => (
              <IconInput
                field={field}
                form={form}
                icon={<AccountIcon />}
                placeholder={getText('Email')}
                autoFocus
              />
            )}
          />
          <Field
            name="password"
            render={({ field, form }) => (
              <IconPasswordInput
                ref={passwordField}
                field={field}
                form={form}
                icon={<KeyIcon />}
                placeholder={getText('Password')}
              />
            )}
          />
          <div className="button">
            <PrimaryButton label="Login" isFullSize disabled={!props.isValid} />
          </div>
          <div className="link">
            <Link href="/forgot-password" label={getText('Forgot password?')} />
          </div>
        </FormWrapper>
      </Form>
      <div className="illustration">
        <Illustration />
      </div>
    </Wrapper>
  )
}

export default forwardRef(LoginForm)
