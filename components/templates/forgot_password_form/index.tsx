import { useRef } from 'react'
import { Formik } from 'formik'

import { useLocalization } from '../../../hooks'
import { ForgotPassword } from '../../organisms'

export default function LoginForm({ email = '' }) {
  const { getText } = useLocalization()
  const emailField = useRef(undefined)

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
        actions.setSubmitting(false)
      }}
      render={props => <ForgotPassword {...props} ref={emailField} />}
    />
  )
}
