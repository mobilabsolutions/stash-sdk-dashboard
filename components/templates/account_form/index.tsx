import { Formik } from 'formik'

import { useLocalization } from '../../../hooks'
import { PspType, PspConfig } from '../../types'
import { VerticalScrollContainer } from '../../atoms'
import { PspConfiguration, PaypalConfiguration } from '../../organisms'

export default function AccountForm() {
  const { getText } = useLocalization()

  const initialPspValues: PspConfig = {
    type: PspType.BS_PAYONE,
    bsAccountId: '',
    bsPortalId: '',
    bsKey: ''
  }

  const initialPaypalValues: PspConfig = {
    type: PspType.BRAINTREE,
    paypalPublicKey: '',
    paypalPrivateKey: ''
  }

  return (
    <VerticalScrollContainer>
      <Formik
        initialValues={initialPspValues}
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
        render={props => <PspConfiguration {...props} />}
      />
      <Formik
        initialValues={initialPaypalValues}
        validate={values => {
          let errors: any = {}

          if (!values.paypalPublicKey)
            errors.paypalPublicKey = getText('Field is required.')
          if (!values.paypalPrivateKey)
            errors.paypalPrivateKey = getText('Field is required.')

          return errors
        }}
        validateOnBlur={false}
        onSubmit={(_, actions) => {
          actions.setSubmitting(true)
          actions.setSubmitting(false)
        }}
        render={props => <PaypalConfiguration {...props} />}
      />
    </VerticalScrollContainer>
  )
}
