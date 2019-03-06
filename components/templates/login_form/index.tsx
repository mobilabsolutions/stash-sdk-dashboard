import { Formik, Field } from 'formik'

import { useLogin } from '../../../hooks'
import { PrimaryButton, AccountIcon, KeyIcon } from '../../atoms'
import { IconInput } from '../../molecules'

export default function LoginForm({ username = '', password = '' }) {
  const { login } = useLogin()

  return (
    <Formik
      initialValues={{ username, password }}
      onSubmit={(values, actions) => {
        console.log('Submit Login', values, actions)
        login(values.username, values.password)
          .then(() => {
            console.log('Login')
          })
          .catch(error => {
            console.log(error)
          })
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <Field
            name="username"
            render={({ field, form }) => (
              <IconInput field={field} form={form} icon={<AccountIcon />} />
            )}
          />
          <Field
            name="password"
            render={({ field, form }) => (
              <IconInput
                field={field}
                form={form}
                icon={<KeyIcon />}
                type="password"
              />
            )}
          />
          <PrimaryButton label="Login" />
        </form>
      )}
    />
  )
}
