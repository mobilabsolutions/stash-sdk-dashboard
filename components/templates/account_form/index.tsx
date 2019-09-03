import { Formik } from 'formik'

import {
  useLocalization,
  useKeys,
  usePassword,
  usePsp,
  useToast
} from '../../../hooks'
import { VerticalScrollContainer } from '../../atoms'
import {
  ChangePassword,
  KeysConfiguration,
  PspConfiguration,
  CustomizeLogo
} from '../../organisms'
import { useEffect } from 'react'
import styled from '../../styled'

const CustomScrollContainer = styled(VerticalScrollContainer)`
  max-width: 920px;
  margin-right: auto;
  margin-left: auto;
`

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
  const {
    isLoading: pspsAreLoading,
    data: psps,
    save: savePsp,
    update: updatePsp,
    remove: deletePsp
  } = usePsp()
  const { changePassword } = usePassword()
  const { success: toastSuccess } = useToast()
  useEffect(() => {
    setIsLoading(
      pspsAreLoading || keysAreLoading || keysAreCreating || keysAreDeleting
    )
  }, [pspsAreLoading, keysAreLoading, keysAreCreating, keysAreDeleting])

  if (pspsAreLoading && keysAreLoading) return null

  const initChangePasswordValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordRetype: ''
  }

  const withLoading = (pr: (...p: any[]) => Promise<{ result: any }>) => (
    ...p: any[]
  ) => {
    setIsLoading(true)
    return new Promise<{ result: any; statusCode: number }>(
      (resolve, reject) => {
        pr(...p)
          .then((result: any) => {
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    )
  }

  return (
    <CustomScrollContainer>
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
      <CustomizeLogo />
      <KeysConfiguration
        keys={keys}
        onDelete={keyEntry => removeKey(keyEntry.id)}
        onCreate={(type, name) => createKey(type, name)}
      />
      <PspConfiguration
        pspList={psps}
        onCreatePsp={withLoading(savePsp)}
        onUpdatePsp={withLoading(updatePsp)}
        onDeletePsp={withLoading(deletePsp)}
      />
    </CustomScrollContainer>
  )
}
