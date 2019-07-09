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
import { useEffect } from 'react'

export default function AccountForm({ setIsLoading }) {
  const { getText } = useLocalization()
  const {
    isLoading: keysAreLoading,
    data: keys,
    create: createKey,
    isCreating: keysAreCreating,
    remove: removeKey,
    isDeleting: keysAreDeleting
  } = useKeys()
  const { isLoading: pspsAreLoading, data: psps, save: savePsp } = usePsp()
  const { changePassword } = usePassword()
  const { success: toastSuccess, error: toastError } = useToast()
  useEffect(() => {
    setIsLoading(
      pspsAreLoading || keysAreLoading || keysAreCreating || keysAreDeleting
    )
  }, [pspsAreLoading, keysAreLoading, keysAreCreating, keysAreDeleting])

  if (pspsAreLoading || keysAreLoading) return null

  const initialPspValues: PspConfig = psps
    .filter(item => item.type !== PspType.BRAINTREE)
    .reduce(
      (result, item) => {
        if (item.default) {
          result.type = item.type
        }
        if (item.type === PspType.BS_PAYONE) {
          result.bsAccountId = item.accountId
          result.bsPortalId = item.portalId
          result.bsKey = item.key
        } else if (item.type === PspType.ADYEN) {
          result.adyenUsername = item.username
          result.adyenPassword = item.password
        }
        return result
      },
      {
        type: PspType.BS_PAYONE,
        bsAccountId: '',
        bsPortalId: '',
        bsKey: '',
        adyenUsername: '',
        adyenPassword: ''
      }
    )

  const paypalPsp = psps.find(item => item.type === PspType.BRAINTREE)
  const initialPaypalValues: PspConfig = paypalPsp
    ? {
        type: PspType.BRAINTREE,
        paypalPublicKey: paypalPsp.publicKey,
        paypalPrivateKey: paypalPsp.privateKey
      }
    : {
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
          setIsLoading(true)
          changePassword(values.oldPassword, values.newPassword)
            .then(() => {
              actions.setValues(initChangePasswordValues)
              actions.setTouched({})
              toastSuccess(getText('Password changed.'))
            })
            .catch(() => {
              actions.setFieldError(
                'oldPassword',
                getText('Password is Invalid.')
              )
            })
            .finally(() => setIsLoading(false))
        }}
        render={props => <ChangePassword {...props} />}
      />
      <KeysConfiguration
        keys={keys}
        onDelete={keyEntry => removeKey(keyEntry.id)}
        onCreate={(type, name) => createKey(type, name)}
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
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)

          const apiPsp: any = {
            pspId: values.type,
            pspConfig:
              values.type === PspType.BS_PAYONE
                ? {
                    default: true,
                    accountId: values.bsAccountId,
                    portalId: values.bsPortalId,
                    key: values.bsKey
                  }
                : {
                    default: true,
                    username: values.adyenUsername,
                    password: values.adyenPassword
                  }
          }

          savePsp(apiPsp)
            .then(() => {
              toastSuccess(getText('Configuration changed.'))
              actions.resetForm(values)
              actions.setSubmitting(false)
            })
            .catch(() => {
              toastError(getText('Save failed.'))
              actions.setSubmitting(false)
            })
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
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)

          const apiPsp: any = {
            pspId: values.type,
            pspConfig: {
              default: false,
              publicKey: values.paypalPublicKey,
              privateKey: values.paypalPrivateKey
            }
          }

          savePsp(apiPsp)
            .then(() => {
              toastSuccess(getText('Configuration changed.'))
              actions.resetForm(values)
              actions.setSubmitting(false)
            })
            .catch(() => {
              toastError(getText('Save failed.'))
              actions.setSubmitting(false)
            })
        }}
        render={props => <PaypalConfiguration {...props} />}
      />
    </VerticalScrollContainer>
  )
}
