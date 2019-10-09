import { Formik } from 'formik'

import { useLocalization, useApi } from '../../../hooks'
import { ForgotPassword, ForgotPasswordConfirmed } from '../../organisms'
import { useState } from 'react'

export default function ResetPasswordForm({ email = '', merchantId = '' }) {
  const { getText } = useLocalization()
  const [sent, setSent] = useState(false)

  const { resetPassword } = useApi()

  if (sent) {
    return <ForgotPasswordConfirmed />
  }

  return (
    <Formik
      initialValues={{ email, merchantId }}
      validate={values => {
        let errors: any = {}

        if (!values.email) errors.email = getText('Field is required.')
        if (!values.merchantId)
          errors.merchantId = getText('Field is required.')
        if (
          values.email.indexOf('@') === -1 ||
          values.email.indexOf('.') === -1
        )
          errors.email = getText('Email not valid.')

        return errors
      }}
      validateOnBlur={false}
      onSubmit={({ email, merchantId }, actions) => {
        actions.setSubmitting(true)
        resetPassword(email, merchantId)
          .then(() => {
            setSent(true)
          })
          .catch(() => {
            actions.setErrors({
              merchantId: getText('Merchant Id is not correct.')
            })
          })
          .finally(() => {
            actions.setSubmitting(false)
          })
      }}
      render={props => <ForgotPassword {...props} />}
    />
  )
}
