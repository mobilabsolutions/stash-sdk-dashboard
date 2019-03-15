import { Formik } from 'formik'

import { PspType } from '../../types'
import { VerticalScrollContainer } from '../../atoms'
import { PspConfiguration } from '../../organisms'

export default function LoginForm() {
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
      render={props => (
        <VerticalScrollContainer>
          <PspConfiguration {...props} />
        </VerticalScrollContainer>
      )}
    />
  )
}
