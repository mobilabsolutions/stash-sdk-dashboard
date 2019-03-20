import { Formik } from 'formik'

import {
  useLocalization,
  useKeys,
  usePassword,
  usePsp,
  useToast
} from '../../../hooks'
import { PspType, PspConfig } from '../../types'
import { VerticalScrollContainer } from '../../atoms'
import {
  ChangePassword,
  KeysConfiguration,
  PspConfiguration,
  PaypalConfiguration
} from '../../organisms'

export default function AccountForm() {
  const { getText } = useLocalization()
  const keyData = useKeys()
  const pspData = usePsp()
  const { changePassword } = usePassword()
  const { success } = useToast()
  console.log('data', { keyData, pspData })

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

  const initChangePasswordValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordRetype: ''
  }

  return (
    <VerticalScrollContainer>
      <Formik
        initialValues={initChangePasswordValues}
        validate={values => {
          let errors: any = {}

          if (!values.oldPassword)
            errors.oldPassword = getText('Field is required.')
          if (!values.newPassword)
            errors.newPassword = getText('Field is required.')
          if (!values.newPasswordRetype)
            errors.newPasswordRetype = getText('Field is required.')
          else if (values.newPasswordRetype !== values.newPassword)
            errors.newPasswordRetype = getText('Passwords do not match.')

          return errors
        }}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)
          changePassword(values.oldPassword, values.newPassword)
            .then(() => {
              actions.setValues(initChangePasswordValues)
              actions.setTouched({})
              actions.setSubmitting(false)
              success('Hallo')
            })
            .catch(() => {
              actions.setFieldError('password', getText('Password is Invalid.'))
              actions.setSubmitting(false)
            })
        }}
        render={props => <ChangePassword {...props} />}
      />
      <KeysConfiguration
        keys={keyData.data}
        onDelete={keyEntry => console.log(keyEntry)}
        onCreate={(type, name) => console.log(type, name)}
      />
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
