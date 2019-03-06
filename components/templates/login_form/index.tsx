import { Formik, Field } from 'formik'

import { AccountIcon, KeyIcon } from '../../atoms'
import { IconInput } from '../../molecules'

export default function LoginForm({ username = '', password = '' }) {
  return (
    <Formik
      initialValues={{ username, password }}
      onSubmit={(values, actions) => {
        console.log('Submit Login', values, actions)
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
        </form>
      )}
    />
  )
}
