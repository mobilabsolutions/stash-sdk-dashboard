import { forwardRef } from 'react'
import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { PrimaryButton, Link, AccountIcon, KeyIcon, H2, H4 } from '../../atoms'
import { IconInput, IconPasswordInput } from '../../molecules'
import styled from '../../styled'
import AnonymousForm from '../anonymous_form'

const Wrapper = styled.div`
  justify-self: center;
  align-self: center;
  width: 300px;
  > .title {
    padding-left: ${p => p.theme.spacing.xsmall};
  }
  > .button {
    display: flex;
    margin-top: ${p => p.theme.spacing.medium};
  }
  > .link {
    margin-top: ${p => p.theme.spacing.small};
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
    <AnonymousForm handleSubmit={props.handleSubmit}>
      <Wrapper>
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
          <PrimaryButton
            label={getText('Login')}
            isFullSize
            disabled={!props.isValid}
          />
        </div>
        <div className="link">
          <Link href="/forgot-password" label={getText('Forgot password?')} />
        </div>
      </Wrapper>
    </AnonymousForm>
  )
}

export default forwardRef(LoginForm)
