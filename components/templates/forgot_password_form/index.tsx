import { useState } from 'react'
import { Formik } from 'formik'

import { useLocalization } from '../../../hooks'
import { ForgotPassword, ForgotPasswordConfirmed } from '../../organisms'

export default function ResetPasswordForm({ email = '' }) {
  const { getText } = useLocalization()
  const [send, setSend] = useState(false)

  if (send) {
    return <ForgotPasswordConfirmed />
  }

  return (
    <Formik
      initialValues={{ email }}
      validate={values => {
        let errors: any = {}

        if (!values.email) errors.email = getText('Field is required.')
        if (
          values.email.indexOf('@') === -1 ||
          values.email.indexOf('.') === -1
        )
          errors.email = getText('Email not valid.')

        return errors
      }}
      validateOnBlur={false}
      onSubmit={(_, actions) => {
        actions.setSubmitting(true)
        setSend(true)
        actions.setSubmitting(false)
      }}
      render={props => <ForgotPassword {...props} />}
    />
  )
}
