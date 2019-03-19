import { useState } from 'react'
import { Formik } from 'formik'

import { useLocalization } from '../../../hooks'
import { ResetPassword, ResetPasswordConfirmed } from '../../organisms'

export default function ForgotPasswordForm({
  token,
  newPassword = '',
  newPasswordRetype = ''
}) {
  const { getText } = useLocalization()
  const [send, setSend] = useState(false)

  if (send) {
    return <ResetPasswordConfirmed />
  }

  return (
    <Formik
      initialValues={{ newPassword, newPasswordRetype }}
      validate={values => {
        let errors: any = {}

        if (!values.newPassword)
          errors.newPassword = getText('Field is required.')
        if (!values.newPasswordRetype)
          errors.newPasswordRetype = getText('Field is required.')
        else if (values.newPasswordRetype !== values.newPassword)
          errors.newPasswordRetype = getText('Passwords do not match.')

        return errors
      }}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true)
        console.log(values, token)
        setSend(true)
        actions.setSubmitting(false)
      }}
      render={props => <ResetPassword {...props} />}
    />
  )
}
