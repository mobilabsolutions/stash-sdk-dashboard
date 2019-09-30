import { Formik } from 'formik'

import {
  useLocalization,
  useKeys,
  usePassword,
  usePsp,
  useToast
} from '../../../hooks'
import {
  ChangePassword,
  KeysConfiguration,
  PspConfiguration,
  CustomizeLogo
} from '../../organisms'
import { useEffect, useState } from 'react'
import styled from '../../styled'
import { MenuLayout } from '../../molecules'
import { User, KeyIcon1, Configuration } from '../../atoms'

const MenuItem = styled.span<{ active: boolean }>`
  opacity: ${p => (p.active ? 1 : 0.7)};
  color: #ffffff;
  margin-left: 40px;
  display: block;
  :hover {
    opacity: 1;
    svg {
      background-color: ${p => p.theme.primary.A500};
      border: 8px solid ${p => p.theme.primary.A500};
    }
  }
  svg {
    background-color: ${p => (p.active ? p.theme.primary.A500 : 'transparent')};
    border: 8px solid ${p => (p.active ? p.theme.primary.A500 : 'transparent')};
    border-radius: 50%;
    position: absolute;
    margin-left: -48px;
    margin-top: -8px;
  }
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
  const [active, setActive] = useState(0)
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
    <MenuLayout
      menu={[
        {
          title: active => (
            <MenuItem active={active}>
              <User width={34} height={34} />
              {getText('Profile')}
            </MenuItem>
          ),
          render: () => (
            <>
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
                    errors.newPasswordRetype = getText(
                      'Passwords do not match.'
                    )

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
            </>
          )
        },
        {
          title: active => (
            <MenuItem active={active}>
              <KeyIcon1 width={36} height={36} />
              {getText('Keys')}
            </MenuItem>
          ),
          render: () => (
            <KeysConfiguration
              keys={keys}
              onDelete={keyEntry => removeKey(keyEntry.id)}
              onCreate={(type, name) => createKey(type, name)}
            />
          )
        },
        {
          title: active => (
            <MenuItem active={active}>
              <Configuration width={37} height={37} />
              {getText('PSP Configuration')}
            </MenuItem>
          ),
          render: () => (
            <PspConfiguration
              pspList={psps}
              onCreatePsp={withLoading(savePsp)}
              onUpdatePsp={withLoading(updatePsp)}
              onDeletePsp={withLoading(deletePsp)}
            />
          )
        }
      ]}
      active={active}
      setActive={setActive}
    />
  )
}
