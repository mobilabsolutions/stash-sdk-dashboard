import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import {
  PrimaryButton,
  H2,
  H4,
  IllustrationPassword,
  KeyIcon
} from '../../atoms'
import { IconPasswordInput } from '../../molecules'
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

interface ResetPasswordProps {
  newPassword: string
  newPasswordRetype: string
}

export default function ResetPassword(props: FormikProps<ResetPasswordProps>) {
  const { getText } = useLocalization()
  return (
    <AnonymousForm
      handleSubmit={props.handleSubmit}
      illustration={<IllustrationPassword />}
    >
      <Wrapper>
        <div className="title">
          <H2>{getText('Reset your Password')}</H2>
          <H4>{getText('Please enter your new Password.')}</H4>
        </div>
        <Field
          name="newPassword"
          render={({ field, form }) => (
            <IconPasswordInput
              field={field}
              form={form}
              icon={<KeyIcon />}
              placeholder={getText('New Password')}
            />
          )}
        />
        <Field
          name="newPasswordRetype"
          render={({ field, form }) => (
            <IconPasswordInput
              field={field}
              form={form}
              icon={<KeyIcon />}
              placeholder={getText('Confirm new Password')}
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
