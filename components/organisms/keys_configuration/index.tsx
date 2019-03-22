import { useState } from 'react'
import { Formik, Field } from 'formik'

import styled from '../../styled'
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

const KeysWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`

const PublicKeyWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  > span {
    margin-left: 24px;
    margin-right: 24px;
    display: block;
    min-width: 265px;
  }
  > svg:not(:first-child) {
    cursor: pointer;
  }
  > svg:last-child {
    margin-left: 24px;
  }
`

const PopupWrapper = styled.div`
  padding: 16px;
  > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  > .extra-padding {
    padding-top: 32px;
  }
  > .buttons > button {
    margin-left: 16px;
  }
  > h3 {
    display: block;
    max-width: 350px;
  }
`

const PrivateKeyWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  .name,
  .key {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .name > span,
  .key > span {
    margin-left: 24px;
    margin-right: 24px;
    display: block;
    min-width: 265px;
  }
  .name > svg,
  .key > svg {
    cursor: pointer;
    margin-left: 24px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
  }
  .instruction {
    display: block;
    margin-left: 24px;
  }
`

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
                  type="button"
                  disabled={!props.isValid}
                  onClick={() => props.submitForm()}
                />
              </div>
            </PopupWrapper>
          )}
        />
      </Popup>
    </PageForm>
  )
}
