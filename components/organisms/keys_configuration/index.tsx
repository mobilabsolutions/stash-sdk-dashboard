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
  PrivateKeyWrapper,
  PublicKeyWrapper,
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

  const publicKeys = keys.filter(item => item.type === 'PUBLIC')
  const privateKeys = keys.filter(item => item.type === 'PRIVATE')

  return (
    <PageForm title={getText('Keys')}>
      <div>
        <H3>{getText('Public Keys')}</H3>
        <KeysWrapper>
          {publicKeys.length === 0 ? (
            <Body>{getText('there is no public key generated yet')}</Body>
          ) : (
            publicKeys.map(keyEntity => (
              <PublicKeyWrapper key={keyEntity.id}>
                <KeyIcon />
                <Body>{keyEntity.key}</Body>
                <CopyIcon
                  onClick={() => {
                    copyToClipboard(keyEntity.key)
                    toastSuccess(getText('Key Copied'))
                  }}
                />
                <DeleteIcon onClick={() => setDeleteKey(keyEntity)} />
              </PublicKeyWrapper>
            ))
          )}
        </KeysWrapper>
        <PrimaryButton
          type="button"
          label={getText('Create a new Public Key')}
          onClick={() => onCreate('PUBLIC')}
        />
      </div>
      <div style={{ marginTop: '32px' }}>
        <H3>{getText('Private Keys')}</H3>
        <KeysWrapper>
          {privateKeys.length === 0 ? (
            <Body>{getText('there is no private key generated yet')}</Body>
          ) : (
            privateKeys.map(keyEntity => (
              <PrivateKeyWrapper key={keyEntity.id}>
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
              </PrivateKeyWrapper>
            ))
          )}
        </KeysWrapper>
        <PrimaryButton
          type="button"
          label={getText('Create a new Private Key')}
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
            onCreate('PRIVATE', values.name)
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
