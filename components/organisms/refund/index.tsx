import React from 'react'
import { Field, Formik, Form } from 'formik'
import { SecondaryButton, LoadingButton } from '../../atoms'
import { Radio, Input, InputCurrency } from '../../molecules'
import { useLocalization } from '../../../hooks'
import styled from '../../styled'
import PropTypes from 'prop-types'

const Value = styled.span`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1.2em;
  font-weight: bold;
  width: 10em;
  display: flex;
  flex: 0 0 60%;
  > label {
    margin-right: 18px;
  }
`

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 8px;
  padding: 5px;
  margin-bottom: 16px;
`

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

export default function RefundForm({
  onCancel,
  initialRefund,
  isLoading = false,
  onSubmit,
  children,
  currencyId
}) {
  const { getText } = useLocalization()

  return (
    <Formik
      initialValues={{ refund: initialRefund, reason: '', refundType: 'full' }}
      onSubmit={onSubmit}
      isInitialValid
      validate={values => {
        let errors = {}
        if (values.refund > initialRefund)
          Object.assign(errors, {
            refund: getText('Amount limit is %{amount}', {
              amount: initialRefund
            })
          })
        if (new RegExp('/^[a-z0-9]+$/i').test(values.reason))
          Object.assign(errors, { reason: getText('Error') })
        return errors
      }}
      render={({ isValid, values, handleChange }) => (
        <Form>
          <ContentContainer>
            <FormItemContainer>
              <Value>
                <Radio
                  label={getText('Partial')}
                  name="refundType"
                  value={'partial'}
                  selectedOption={values.refundType}
                  onChange={handleChange}
                />
                <Radio
                  label={getText('Full')}
                  name="refundType"
                  value={'full'}
                  selectedOption={values.refundType}
                  onChange={handleChange}
                />
              </Value>
            </FormItemContainer>
            <Field
              name="refund"
              render={({ field, form }) => (
                <InputCurrency
                  field={field}
                  form={form}
                  disabled={values.refundType === 'full'}
                  currencyId={currencyId}
                  title={getText('Refund')}
                  placeholder={getText('Refund')}
                />
              )}
            />
            <Field
              name="reason"
              render={({ field, form }) => (
                <Input
                  field={field}
                  form={form}
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
              label={getText('Refund the Transaction')}
              disabled={!isValid}
            />
          </ButtonContainer>
        </Form>
      )}
    />
  )
}

RefundForm.propTypes = {
  onCancel: PropTypes.func,
  initialRefund: PropTypes.number,
  onSubmit: PropTypes.func,
  currencyId: PropTypes.string
}
