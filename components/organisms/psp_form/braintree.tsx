import { nonEmptyValidation, GenericPspForm, Props } from '.'
import React, { useState } from 'react'
import { PSP as Psp } from '../../../types/psp'
import { useLocalization } from '../../../hooks'
import { Formik, Field } from 'formik'
import isEqual from 'react-fast-compare'
import { TabPanel, IconInput } from '../../molecules'
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
    margin-right: 12px;
  }
`

export default function Braintree(p: Props) {
  const { getText } = useLocalization()
  const { psp, onUpdatePsp, onCancel } = p
  const [production, setProduction] = useState(
    !!psp.merchantId || !psp.sandboxMerchantId
  )
  const initialValues = {
    merchantId: psp.merchantId ? psp.merchantId : '',
    publicKey: psp.publicKey ? psp.publicKey : '',
    privateKey: psp.privateKey ? psp.privateKey : '',
    sandboxMerchantId: psp.sandboxMerchantId ? psp.sandboxMerchantId : '',
    sandboxPublicKey: psp.sandboxPublicKey ? psp.sandboxPublicKey : '',
    sandboxPrivateKey: psp.sandboxPrivateKey ? psp.sandboxPrivateKey : ''
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={({
        merchantId,
        publicKey,
        privateKey,
        sandboxMerchantId,
        sandboxPrivateKey,
        sandboxPublicKey
      }) => {
        let submitValues = production
          ? {
              merchantId,
              publicKey,
              privateKey,
              sandboxMerchantId: psp.sandboxMerchantId,
              sandboxPublicKey: psp.sandboxPublicKey,
              sandboxPrivateKey: psp.sandboxPrivateKey
            }
          : {
              merchantId: psp.merchantId,
              publicKey: psp.publicKey,
              privateKey: psp.privateKey,
              sandboxMerchantId,
              sandboxPublicKey,
              sandboxPrivateKey
            }
        onUpdatePsp(psp.type, submitValues as Psp)
      }}
      validate={({
        merchantId,
        publicKey,
        privateKey,
        sandboxMerchantId,
        sandboxPrivateKey,
        sandboxPublicKey
      }) => {
        let validateValues = production
          ? {
              merchantId,
              publicKey,
              privateKey
            }
          : {
              sandboxMerchantId,
              sandboxPublicKey,
              sandboxPrivateKey
            }
        return nonEmptyValidation(getText('Field is required.'))(validateValues)
      }}
      render={props => {
        const isDirty = () => {
          const {
            merchantId,
            publicKey,
            privateKey,
            sandboxMerchantId,
            sandboxPrivateKey,
            sandboxPublicKey
          } = props.initialValues
          if (production) {
            return isEqual(
              { merchantId, publicKey, privateKey },
              {
                merchantId: props.values.merchantId,
                publicKey: props.values.publicKey,
                privateKey: props.values.privateKey
              }
            )
          }
          return isEqual(
            { sandboxMerchantId, sandboxPrivateKey, sandboxPublicKey },
            {
              sandboxMerchantId: props.values.sandboxMerchantId,
              sandboxPrivateKey: props.values.sandboxPrivateKey,
              sandboxPublicKey: props.values.sandboxPublicKey
            }
          )
        }
        return (
          <GenericPspForm
            title={getText('Braintree')}
            handleSubmit={props.handleSubmit}
          >
            <TabPanel
              active={production ? 0 : 1}
              onTabChanged={() => {
                props.validateForm()
              }}
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
                        name="privateKey"
                        render={({ field, form }) => (
                          <>
                            <H4>{getText('Private Key')}</H4>
                            <IconInput
                              field={field}
                              form={form}
                              icon={<KeyIcon />}
                              placeholder={getText('Private Key')}
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
                      <Field
                        name="sandboxPrivateKey"
                        render={({ field, form }) => (
                          <>
                            <H4>{getText('Sandbox Private Key')}</H4>
                            <IconInput
                              field={field}
                              form={form}
                              icon={<KeyIcon />}
                              placeholder={getText('Sandbox Private Key')}
                            />
                          </>
                        )}
                      />
                    </>
                  )
                }
              ]}
            />
            <ButtonContainer>
              {!!onCancel && (
                <SecondaryButton
                  label={getText('Cancel')}
                  onClick={() => onCancel()}
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
