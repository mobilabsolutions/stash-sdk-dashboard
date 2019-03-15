import { Formik } from 'formik'

// import { useLocalization } from '../../../hooks'
import { PspType } from '../../types'
import { PspConfiguration } from '../../organisms'

export default function LoginForm() {
  //  const { getText } = useLocalization()

  return (
    <Formik
      initialValues={{ type: PspType.BS_PAYONE }}
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
