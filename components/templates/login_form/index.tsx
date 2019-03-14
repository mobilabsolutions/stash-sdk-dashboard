import { useRef } from 'react'
import { Formik } from 'formik'
import Router from 'next/router'

import { useApi, useLocalization } from '../../../hooks'
import { Login } from '../../organisms'

export default function LoginForm({ email = '', password = '' }) {
  const { login } = useApi()
  const { getText } = useLocalization()
  const passwordField = useRef(undefined)

  return (
    <Formik
      initialValues={{ email, password }}
      validate={values => {
        let errors: any = {}

        if (!values.email) errors.email = getText('Field is required.')
        if (!values.password) errors.password = getText('Field is required.')

        return errors
      }}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true)
        login(values.email, values.password)
          .then(() => {
            actions.setSubmitting(false)
            Router.push('/')
          })
          .catch(() => {
            actions.setSubmitting(false)
            passwordField.current && passwordField.current.focus()

            actions.setFieldError(
              'password',
              getText('Login failed. Email or Password is Invalid.')
            )
          })
      }}
      render={props => <Login {...props} />}
    />
  )
}
