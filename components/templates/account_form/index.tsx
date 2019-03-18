import { Formik } from 'formik'

import { useLocalization } from '../../../hooks'
import { PspType, PspConfig } from '../../types'
import { VerticalScrollContainer } from '../../atoms'
import { PspConfiguration } from '../../organisms'

export default function AccountForm() {
  const { getText } = useLocalization()

  const initialValues: PspConfig = { type: PspType.BS_PAYONE }

  return (
    <Formik
      initialValues={initialValues}
      validate={values => {
        let errors: any = {}

        if (!values.type) errors.type = getText('Field is required.')
        if (values.type === PspType.BS_PAYONE) {
          if (!values.bsAccountId)
            errors.bsAccountId = getText('Field is required.')
          if (!values.bsPortalId)
            errors.bsPortalId = getText('Field is required.')
          if (!values.bsKey) errors.bsKey = getText('Field is required.')
        }

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
