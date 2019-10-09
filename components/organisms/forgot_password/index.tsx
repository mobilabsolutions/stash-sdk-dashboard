import { forwardRef } from 'react'
import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { PrimaryButton, H2, IllustrationPassword } from '../../atoms'
import { Input } from '../../molecules'
import styled from '../../styled'
import AnonymousForm from '../anonymous_form'

const Wrapper = styled.div`
  justify-self: center;
  align-self: center;
  width: 370px;
  > .title {
    padding-bottom: ${p => p.theme.spacing.large};
    h2 {
      color: ${p => p.theme.primary.A500};
      padding-left: ${p => p.theme.spacing.xsmall};
    }
    span {
      color: ${p => p.theme.shade.A200};
      font-size: 14px;
    }
  }
  > .button {
    display: flex;
    margin-top: ${p => p.theme.spacing.medium};
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
    <AnonymousForm
      handleSubmit={props.handleSubmit}
      illustrationStyle={{ backgroundColor: '#ffffff' }}
      illustration={<IllustrationPassword />}
    >
      <Wrapper>
        <div className="title">
          <H2>{getText('Please enter your email address')}</H2>
          <span>
            {getText(
              'You will receive in few minutes an email with a link to reset your password.'
            )}
          </span>
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
        <Field
          name="merchantId"
          render={({ field, form }) => (
            <Input
              ref={emailField}
              field={field}
              form={form}
              placeholder={getText('Merchant Id')}
            />
          )}
        />
        <div className="button">
          <PrimaryButton
            label={getText('Send me an email')}
            disabled={!props.isValid}
          />
        </div>
      </Wrapper>
    </AnonymousForm>
  )
}

export default forwardRef(ForgotPassword)
