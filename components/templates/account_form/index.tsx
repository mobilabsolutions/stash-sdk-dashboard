import { Formik } from 'formik'

// import { useLocalization } from '../../../hooks'
import { PspConfiguration } from '../../organisms'

export default function LoginForm() {
  //  const { getText } = useLocalization()

  return (
    <Formik
      initialValues={{}}
      validate={_ => {
        let errors: any = {}

        return errors
      }}
      validateOnBlur={false}
      onSubmit={(_, actions) => {
        actions.setSubmitting(true)
        actions.setSubmitting(false)
      }}
      render={props => <PspConfiguration {...props} />}
    />
  )
}
