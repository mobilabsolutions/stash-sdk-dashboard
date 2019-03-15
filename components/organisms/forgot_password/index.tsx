import { forwardRef } from 'react'
import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { PrimaryButton, H2, H4 } from '../../atoms'
import { Input } from '../../molecules'
import styled from '../../styled'
import AnonymousForm from '../anonymous_form'

const Wrapper = styled.div`
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
`

interface ForgotPasswordProps {
  email: string
}

function ForgotPassword(
  props: FormikProps<ForgotPasswordProps>,
  emailField: any
) {
  const { getText } = useLocalization()
  return (
    <AnonymousForm handleSubmit={props.handleSubmit}>
      <Wrapper>
        <div className="title">
          <H2>{getText('Please enter your email address')}</H2>
          <H4>
            {getText(
              'You will receive in few minutes an email with a link to reset your password.'
            )}
          </H4>
        </div>
        <Field
          name="email"
          render={({ field, form }) => (
            <Input
              ref={emailField}
              field={field}
              form={form}
              placeholder={getText('Email')}
              autoFocus
            />
          )}
        />
        <div className="button">
          <PrimaryButton
            label={getText('Reset Password')}
            isFullSize
            disabled={!props.isValid}
          />
        </div>
      </Wrapper>
    </AnonymousForm>
  )
}

export default forwardRef(ForgotPassword)
