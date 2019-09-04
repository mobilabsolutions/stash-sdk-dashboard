import { nonEmptyValidation, GenericPspForm, Props } from '.'
import React, { useState } from 'react'
import isEqual from 'react-fast-compare'
import { PSP as Psp } from '../../../types/psp'
import { useLocalization } from '../../../hooks'
import { Formik, Field } from 'formik'
import { TabPanel, IconInput, Input } from '../../molecules'
import {
  H3,
  AccountIcon,
  KeyIcon,
  SecondaryButton,
  PrimaryButton
} from '../../atoms'
import styled from '../../styled'

const H4 = styled(H3)`
  font-size: 14px;
  margin-top: 0px;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  button {
    margin-right: ${p => p.theme.spacing.small};
  }
`

export default function Adyen(p: Props) {
  const { getText } = useLocalization()
  const { psp, onUpdatePsp, onCancel, onDeletePsp } = p
  const [production, setProduction] = useState(
    !!psp.merchantId || !psp.sandboxMerchantId
  )

  const initialValues = {
    merchantId: psp.merchantId ? psp.merchantId : '',
    publicKey: psp.publicKey ? psp.publicKey : '',
    country: psp.country ? psp.country : '',
    locale: psp.locale ? psp.locale : '',
    urlPrefix: psp.urlPrefix ? psp.urlPrefix : '',
    currency: psp.currency ? psp.currency : '',
    sandboxMerchantId: psp.sandboxMerchantId ? psp.sandboxMerchantId : '',
    sandboxPublicKey: psp.sandboxPublicKey ? psp.sandboxPublicKey : '',
    clientEncryptionKey: psp.clientEncryptionKey || ''
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={({
        merchantId,
        publicKey,
        urlPrefix,
        sandboxMerchantId,
        sandboxPublicKey,
        clientEncryptionKey,
        ...rest
      }) => {
        let validateValues = production
          ? {
              merchantId,
              publicKey,
              urlPrefix,
              clientEncryptionKey,
              ...rest
            }
          : {
              sandboxMerchantId,
              sandboxPublicKey,
              ...rest
            }
        return nonEmptyValidation(getText('Field is required.'))(validateValues)
      }}
      onSubmit={({
        merchantId,
        publicKey,
        urlPrefix,
        sandboxMerchantId,
        sandboxPublicKey,
        clientEncryptionKey,
        ...rest
      }) => {
        let submitValues = production
          ? {
              merchantId,
              publicKey,
              urlPrefix,
              clientEncryptionKey,
              sandboxMerchantId: psp.sandboxMerchantId,
              sandboxPublicKey: psp.sandboxPublicKey,
              ...rest
            }
          : {
              merchantId: psp.merchantId,
              publicKey: psp.publicKey,
              urlPrefix: psp.urlPrefix,
              sandboxMerchantId,
              sandboxPublicKey,
              ...rest
            }
        onUpdatePsp(psp.type, submitValues as Psp)
      }}
      render={props => {
        const isDirty = () => {
          const {
            merchantId,
            publicKey,
            urlPrefix,
            sandboxMerchantId,
            sandboxPublicKey,
            clientEncryptionKey,
            ...rest
          } = props.initialValues
          const constantValues = {
            currency: props.values.currency,
            country: props.values.country,
            locale: props.values.locale
          }
          if (production) {
            return isEqual(
              {
                merchantId,
                publicKey,
                urlPrefix,
                clientEncryptionKey,
                ...rest
              },
              {
                merchantId: props.values.merchantId,
                publicKey: props.values.publicKey,
                urlPrefix: props.values.urlPrefix,
                clientEncryptionKey: props.values.clientEncryptionKey,
                ...constantValues
              }
            )
          }
          return isEqual(
            { sandboxMerchantId, sandboxPublicKey, ...rest },
            {
              sandboxMerchantId: props.values.sandboxMerchantId,
              sandboxPublicKey: props.values.sandboxPublicKey,
              ...constantValues
            }
          )
        }
        return (
          <GenericPspForm
            title={getText('Adyen')}
            handleSubmit={props.handleSubmit}
          >
            <TabPanel
              active={production ? 0 : 1}
              setActive={(tab: number) => {
                setProduction(tab == 0)
              }}
              tabs={[
                {
                  title: getText('Production'),
                  render: () => (
                    <>
                      <Field
                        name="merchantId"
                        render={({ field, form }) => (
                          <>
                            <H4>{getText('Merchant ID')}</H4>
                            <IconInput
                              field={field}
                              form={form}
                              icon={<AccountIcon />}
                              placeholder={getText('Merchant ID')}
                            />
                          </>
                        )}
                      />
                      <Field
                        name="publicKey"
                        render={({ field, form }) => (
                          <>
                            <H4>{getText('Public Key')}</H4>
                            <IconInput
                              field={field}
                              form={form}
                              icon={<KeyIcon />}
                              placeholder={getText('Public Key')}
                            />
                          </>
                        )}
                      />
                      <Field
                        name="urlPrefix"
                        render={({ field, form }) => (
                          <>
                            <H4>{getText('Production URL Prefix')}</H4>
                            <Input
                              field={field}
                              form={form}
                              placeholder={getText('Production URL Prefix')}
                            />
                          </>
                        )}
                      />
                      <Field
                        name="clientEncryptionKey"
                        render={({ field, form }) => (
                          <>
                            <H4>{getText('Client Encryption Key')}</H4>
                            <Input
                              field={field}
                              form={form}
                              placeholder={getText('Client Encryption Key')}
                            />
                          </>
                        )}
                      />
                    </>
                  )
                },
                {
                  title: getText('Sandbox'),
                  render: () => (
                    <>
                      <Field
                        name="sandboxMerchantId"
                        render={({ field, form }) => (
                          <>
                            <H4>{getText('Sandbox Merchant ID')}</H4>
                            <IconInput
                              field={field}
                              form={form}
                              icon={<AccountIcon />}
                              placeholder={getText('Sandbox Merchant ID')}
                            />
                          </>
                        )}
                      />
                      <Field
                        name="sandboxPublicKey"
                        render={({ field, form }) => (
                          <>
                            <H4>{getText('Sandbox Public Key')}</H4>
                            <IconInput
                              field={field}
                              form={form}
                              icon={<KeyIcon />}
                              placeholder={getText('Sandbox Public Key')}
                            />
                          </>
                        )}
                      />
                    </>
                  )
                }
              ]}
            />
            <Field
              name="country"
              render={({ field, form }) => (
                <>
                  <H4>{getText('Country')}</H4>
                  <Input
                    field={field}
                    form={form}
                    placeholder={getText('Country')}
                  />
                </>
              )}
            />
            <Field
              name="locale"
              render={({ field, form }) => (
                <>
                  <H4>{getText('Locale')}</H4>
                  <Input
                    field={field}
                    form={form}
                    placeholder={getText('Locale')}
                  />
                </>
              )}
            />
            <Field
              name="currency"
              render={({ field, form }) => (
                <>
                  <H4>{getText('Currency')}</H4>
                  <Input
                    field={field}
                    form={form}
                    placeholder={getText('Currency')}
                  />
                </>
              )}
            />
            <ButtonContainer>
              {!!onCancel && (
                <SecondaryButton
                  label={getText('Cancel')}
                  onClick={() => onCancel()}
                  disabled={p.isUpdate}
                />
              )}
              {!!onDeletePsp && (
                <SecondaryButton
                  label={getText('Delete')}
                  onClick={() => onDeletePsp(psp.type)}
                  disabled={p.isUpdate}
                />
              )}

              <PrimaryButton
                label={getText('Save')}
                disabled={!props.isValid || isDirty() || p.isUpdate}
              />
            </ButtonContainer>
          </GenericPspForm>
        )
      }}
    />
  )
}
