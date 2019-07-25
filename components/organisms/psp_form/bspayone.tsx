import { nonEmptyValidation, GenericPspForm, Props } from '.'
import React from 'react'
import { PSP as Psp } from '../../../types/psp'
import { useLocalization } from '../../../hooks'
import { Formik, Field } from 'formik'
import { IconInput } from '../../molecules'
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

export default function BSPayone(p: Props) {
  const { getText } = useLocalization()
  const { psp, onUpdatePsp, onCancel } = p
  const initialValues = {
    merchantId: psp.merchantId ? psp.merchantId : '',
    portalId: psp.portalId ? psp.portalId : '',
    key: psp.key ? psp.key : '',
    accountId: psp.accountId ? psp.accountId : ''
  }
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={values => {
        onUpdatePsp(psp.type, values as Psp)
      }}
      validate={nonEmptyValidation(getText('Field is required.'))}
      render={props => (
        <GenericPspForm
          title={getText('BS Payone')}
          handleSubmit={props.handleSubmit}
        >
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
            name="portalId"
            render={({ field, form }) => (
              <>
                <H4>{getText('Portal ID')}</H4>
                <IconInput
                  field={field}
                  form={form}
                  icon={<AccountIcon />}
                  placeholder={getText('Portal ID')}
                />
              </>
            )}
          />
          <Field
            name="key"
            render={({ field, form }) => (
              <>
                <H4>{getText('Key')}</H4>
                <IconInput
                  field={field}
                  form={form}
                  icon={<KeyIcon />}
                  placeholder={getText('Key')}
                />
              </>
            )}
          />
          <Field
            name="accountId"
            render={({ field, form }) => (
              <>
                <H4>{getText('Account ID')}</H4>
                <IconInput
                  field={field}
                  form={form}
                  icon={<AccountIcon />}
                  placeholder={getText('Account ID')}
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

            <PrimaryButton
              label={getText('Save')}
              disabled={!props.isValid || !props.dirty || p.isUpdate}
            />
          </ButtonContainer>
        </GenericPspForm>
      )}
    />
  )
}
