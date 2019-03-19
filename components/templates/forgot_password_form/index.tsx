import { useState } from 'react'
import { Formik } from 'formik'

import { useLocalization } from '../../../hooks'
import { ForgotPassword, ForgotPasswordConfirmed } from '../../organisms'

export default function ForgotPasswordForm({ email = '' }) {
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

        return errors
      }}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true)
        console.log(values)
        setSend(true)
        actions.setSubmitting(false)
      }}
      render={props => <ForgotPassword {...props} />}
    />
  )
}
