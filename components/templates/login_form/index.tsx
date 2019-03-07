import { Formik, Field } from 'formik'

import { useLogin, useLocalization } from '../../../hooks'
import {
  PrimaryButton,
  AccountIcon,
  KeyIcon,
  Illustration,
  Logo
} from '../../atoms'
import { IconInput } from '../../molecules'
import styled from '../../styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`

const ImageWrapper = styled.div`
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
`

const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
`

const LogoWrapper = styled.div`
  padding-top: 40px;
  padding-left: 40px;
  padding-bottom: 120px;
`

const FormWrapper = styled.div`
  justify-self: center;
  align-self: center;
  width: 300px;
  > div {
    padding-bottom: 8px;
  }
  > h1 {
    padding-left: 8px;
    color: ${props => props.theme.shade.A700};
    font-family: ${props => props.theme.fontHeadline};
    font-size: 24px;
    font-stretch: normal;
    font-style: normal;
    font-weight: bold;
    letter-spacing: normal;
    line-height: 1.27;
    margin: 0 0 0.5em 0;
    text-align: left;
  }
  > h2 {
    padding-left: 8px;
    padding-bottom: 30px;
    color: ${props => props.theme.shade.A200};
    font-family: ${props => props.theme.fontHeadline};
    font-size: 16px;
    font-weight: bold;
    letter-spacing: normal;
    line-height: 1.28;
    margin: 0;
  }
`

export default function LoginForm({ username = '', password = '' }) {
  const { login } = useLogin()
  const { getText } = useLocalization()

  return (
    <Formik
      initialValues={{ username, password }}
      onSubmit={(values, actions) => {
        console.log('Submit Login', values, actions)
        login(values.username, values.password)
          .then(() => {
            console.log('Login')
          })
          .catch(error => {
            console.log(error)
          })
      }}
      render={props => (
        <Wrapper>
          <Form onSubmit={props.handleSubmit}>
            <LogoWrapper>
              <Logo />
            </LogoWrapper>
            <FormWrapper>
              <h1>{getText('Welcome')}</h1>
              <h2>{getText('Login to your account')}</h2>
              <div>
                <Field
                  name="username"
                  render={({ field, form }) => (
                    <IconInput
                      field={field}
                      form={form}
                      icon={<AccountIcon />}
                      placeholder={getText('Username')}
                    />
                  )}
                />
              </div>
              <div>
                <Field
                  name="password"
                  render={({ field, form }) => (
                    <IconInput
                      field={field}
                      form={form}
                      icon={<KeyIcon />}
                      type="password"
                      placeholder={getText('Password')}
                    />
                  )}
                />
              </div>
              <PrimaryButton label="Login" isFullSize />
            </FormWrapper>
          </Form>
          <ImageWrapper>
            <Illustration />
          </ImageWrapper>
        </Wrapper>
      )}
    />
  )
}
