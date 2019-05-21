import React from 'react'
import { Field, Formik, Form } from 'formik'
import { SecondaryButton, LoadingButton } from '../../atoms'
import { Input } from '../../molecules'
import { useLocalization } from '../../../hooks'
import styled from '../../styled'

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 24px 12px 24px;
  align-items: center;
  justify-content: flex-end;
  border-radius: 5px;
  > button {
    margin-left: 12px;
  }
`
const ContentContainer = styled.div`
  padding: 32px;
`

export default function ReverseForm({
  onCancel,
  isLoading = false,
  onSubmit,
  children = null
}) {
  const { getText } = useLocalization()

  return (
    <Formik
      initialValues={{ reason: '' }}
      onSubmit={onSubmit}
      isInitialValid
      validate={values => {
        let errors = {}
        if (new RegExp('/^[a-z0-9]+$/i').test(values.reason))
          Object.assign(errors, { reason: getText('Error') })
        return errors
      }}
      render={({ isValid }) => (
        <Form>
          <ContentContainer>
            <Field
              name="reason"
              render={({ field, form }) => (
                <Input
                  field={field}
                  form={form}
                  containerStyle={{ flexDirection: 'row' }}
                  inputStyle={{ marginLeft: '16px', width: '100%' }}
                  labelStyle={{ minWidth: 100 }}
                  title={getText('Description')}
                  placeholder={getText('Description')}
                />
              )}
            />
            {children}
          </ContentContainer>
          <ButtonContainer>
            <SecondaryButton
              label={getText('Cancel')}
              onClick={onCancel}
              disabled={isLoading}
            />
            <LoadingButton
              isLoading={isLoading}
              label={getText('Reverse the Transaction')}
              disabled={!isValid}
            />
          </ButtonContainer>
        </Form>
      )}
    />
  )
}
