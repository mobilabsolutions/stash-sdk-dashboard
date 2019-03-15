import { Formik } from 'formik'

import { PspType } from '../../types'
import { PspConfiguration } from '../../organisms'
import styled from '../../styled'

const ScrollContainer = styled.div`
  overflow-x: auto;
  height: 100%;
`

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
        <ScrollContainer>
          <PspConfiguration {...props} />
        </ScrollContainer>
      )}
    />
  )
}
