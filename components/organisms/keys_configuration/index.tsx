import { useState } from 'react'
import { Formik, Field } from 'formik'

import {
  H3,
  KeyIcon,
  CopyIcon,
  DeleteIcon,
  Body,
  PrimaryButton,
  WarnButton,
  SecondaryButton
} from '../../atoms'
import { Popup, Input } from '../../molecules'
import { useLocalization, useToast } from '../../../hooks'
import PageForm from '../page_form'
import copyToClipboard from './copy_to_clipboard'
import {
  SecretKeyWrapper,
  PublishableKeyWrapper,
  PopupWrapper,
  KeysWrapper
} from './styled'

interface KeyEntity {
  id: number
  type: string
  name: string
  key?: string
}

interface KeysConfigurationProps {
  keys: KeyEntity[]
  onDelete: (key: KeyEntity) => void
  onCreate: (type: string, name?: string) => void
}

export default function KeysConfiguration({
  keys,
  onDelete,
  onCreate
}: KeysConfigurationProps) {
  const [deleteKey, setDeleteKey] = useState(undefined)
  const [isCreating, setIsCreating] = useState(false)
  const { getText } = useLocalization()
  const { success: toastSuccess } = useToast()

  const publishableKeys = keys.filter(item => item.type === 'PUBLISHABLE')
  const secretKeys = keys.filter(item => item.type === 'SECRET')

  return (
    <PageForm title={getText('Keys')}>
      <div>
        <H3>{getText('Publishable Keys')}</H3>
        <KeysWrapper>
          {publishableKeys.length === 0 ? (
            <Body>{getText('there is no publishable key generated yet')}</Body>
          ) : (
            publishableKeys.map(keyEntity => (
              <PublishableKeyWrapper key={keyEntity.id}>
                <KeyIcon />
                <Body>{keyEntity.key}</Body>
                <CopyIcon
                  onClick={() => {
                    copyToClipboard(keyEntity.key)
                    toastSuccess(getText('Key Copied'))
                  }}
                />
                <DeleteIcon onClick={() => setDeleteKey(keyEntity)} />
              </PublishableKeyWrapper>
            ))
          )}
        </KeysWrapper>
        <PrimaryButton
          type="button"
          label={getText('Create a new publishable Key')}
          onClick={() => onCreate('PUBLISHABLE')}
        />
      </div>
      <div style={{ marginTop: '32px' }}>
        <H3>{getText('Secret Keys')}</H3>
        <KeysWrapper>
          {secretKeys.length === 0 ? (
            <Body>{getText('there is no secret key generated yet')}</Body>
          ) : (
            secretKeys.map(keyEntity => (
              <SecretKeyWrapper key={keyEntity.id}>
                <KeyIcon />
                <div className="wrapper">
                  <div className="name">
                    <Body>{keyEntity.name}</Body>
                    <DeleteIcon onClick={() => setDeleteKey(keyEntity)} />
                  </div>
                  {keyEntity.key && (
                    <div className="key">
                      <Body>{keyEntity.key}</Body>
                      <CopyIcon
                        onClick={() => copyToClipboard(keyEntity.key)}
                      />
                    </div>
                  )}
                </div>
                {keyEntity.key && (
                  <Body className="instruction">
                    {getText(
                      'Copy this key now because it cannot be recovered in the future.'
                    )}
                  </Body>
                )}
              </SecretKeyWrapper>
            ))
          )}
        </KeysWrapper>
        <PrimaryButton
          type="button"
          label={getText('Create a new secret Key')}
          onClick={() => setIsCreating(true)}
        />
      </div>
      <Popup show={!!deleteKey} onClose={() => setDeleteKey(undefined)}>
        <PopupWrapper>
          <H3>
            {getText('Are you sure you want to remove the key %{key}?', {
              key: deleteKey ? deleteKey.key || deleteKey.name : ''
            })}
          </H3>
          <div className="buttons extra-padding">
            <SecondaryButton
              label={getText('Cancel')}
              onClick={() => setDeleteKey(undefined)}
            />
            <WarnButton
              label={getText('Delete')}
              type="button"
              onClick={() => {
                onDelete(deleteKey)
                setDeleteKey(undefined)
              }}
            />
          </div>
        </PopupWrapper>
      </Popup>
      <Popup show={isCreating} onClose={() => setIsCreating(false)}>
        <Formik
          initialValues={{ name: '' }}
          validate={values => {
            let errors: any = {}

            if (!values.name) errors.name = getText('Field is required.')

            return errors
          }}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            onCreate('SECRET', values.name)
            actions.resetForm({ name: '' })
            actions.setSubmitting(false)
            setIsCreating(false)
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <PopupWrapper>
                <Field
                  name="name"
                  render={({ field, form }) => (
                    <>
                      <H3>{getText('Name')}</H3>
                      <Input
                        field={field}
                        form={form}
                        placeholder={getText('Name')}
                      />
                    </>
                  )}
                />
                <div className="buttons">
                  <SecondaryButton
                    label={getText('Cancel')}
                    onClick={() => setIsCreating(false)}
                  />
                  <PrimaryButton
                    label={getText('Create')}
                    disabled={!props.isValid}
                  />
                </div>
              </PopupWrapper>
            </form>
          )}
        />
      </Popup>
    </PageForm>
  )
}
