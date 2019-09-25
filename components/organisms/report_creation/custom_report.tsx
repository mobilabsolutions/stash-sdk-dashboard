import React from 'react'
import styled from '../../styled'
import { useState } from 'react'
import moment from 'moment'

import { useLocalization } from '../../../hooks'
import {
  Select,
  InputSearch,
  DatePicker,
  InputFilter,
  InputCurrencyFilter
} from '../../molecules'
import { paymentMethods } from '../../../assets/payment.static'
import { Field, Formik, Form } from 'formik'
import { PrimaryButton } from '../../atoms'
import { TransactionStatus } from '../../../types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .filter-item {
    padding: 4px 0px;
  }
  .more {
    color: ${p => p.theme.primary.A500};
    cursor: pointer;
    text-align: end;
    font-size: 12px;
    padding: 12px 0px;
  }
  .button-conatiner {
    display: flex;
    margin-top: 12px;
    justify-content: flex-end;
    width: 100%;
    button {
      min-width: 217px;
    }
  }
`
const usedPaymentMethods = paymentMethods.filter(p => p.used)

const TextField = ({
  name,
  required = false,
  placeholder,
  autoFocus = false
}) => (
  <Field
    name={name}
    required={required}
    render={({ field, form }) => (
      <InputFilter
        field={field}
        form={form}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
    )}
  />
)

export default function CustomReport({ downloadReport }) {
  const { getText } = useLocalization()
  const allOption = {
    value: 'all',
    label: getText('all')
  }
  const statusOptions = [
    ...Object.entries(TransactionStatus).map(act => ({
      value: act[0],
      label: getText(act[0])
    }))
  ]
  const paymetOptions = [
    allOption,
    ...usedPaymentMethods.map(pay => ({
      value: pay.name,
      label: getText(pay.name)
    }))
  ]
  const [focusedInput, setFocusedInput] = useState(null)
  const [more, showMore] = useState(false)
  return (
    <Formik
      initialValues={{
        range: { startDate: null, endDate: null },
        paymentMethod: null,
        status: null,
        text: '',
        title: '',
        currency: '',
        amount: '',
        customerId: '',
        transactionId: '',
        merchantTransactionId: ''
      }}
      onSubmit={({ title, ...rest }) => {
        const { range, paymentMethod, ...params } = rest
        downloadReport(title, {
          ...params,
          paymentMethod: paymentMethod === 'all' ? null : paymentMethod,
          createdAtEnd: range.endDate
            ? range.endDate
                .clone()
                .hours(0)
                .minutes(0)
                .seconds(0)
                .milliseconds(0)
                .utc()
                .format()
            : null,
          createdAtStart: range.startDate
            ? range.startDate
                .clone()
                .hours(23)
                .minutes(59)
                .seconds(59)
                .milliseconds(999)
                .utc()
                .format()
            : null
        })
      }}
      validate={({ title, ...rest }) => {
        if (!title) {
          return {
            title: getText('Field is required.')
          }
        }
        const { range, ...params } = rest
        const { startDate, endDate } = range
        const atLeastOneFilled =
          Object.values({ ...params, startDate, endDate }).findIndex(
            el => !!el && el != 'all'
          ) !== -1
        if (!atLeastOneFilled)
          return {
            atLeastOneFilled
          }

        return {}
      }}
      render={props => {
        return (
          <Form>
            <Wrapper>
              <div>
                <TextField
                  name="title"
                  placeholder={getText('Report Name')}
                  autoFocus
                />
              </div>
              <div className="filter-item">
                <Field
                  name="range"
                  render={({ field }) => (
                    <DatePicker
                      initialFromDate={null}
                      startDateId="filter_start_date_id"
                      initialToDate={null}
                      endDateId="filter_end_date_id"
                      onDatesChange={({ startDate, endDate }) => {
                        field.onChange({
                          target: {
                            value: { startDate, endDate },
                            name: 'range'
                          }
                        })
                      }}
                      focusedInput={focusedInput}
                      onFocusChange={focusedInput =>
                        setFocusedInput(focusedInput)
                      }
                      noBorder
                      isOutsideRange={value =>
                        value.isAfter(
                          moment()
                            .hours(23)
                            .minutes(59)
                            .seconds(59)
                            .milliseconds(999)
                        )
                      }
                      showClearDates
                      readOnly
                      initialVisibleMonth={() => moment().add(-1, 'months')}
                      startDatePlaceholderText={getText('Start Date')}
                      endDatePlaceholderText={getText('End Date')}
                      hideKeyboardShortcutsPanel
                    />
                  )}
                />
              </div>
              <div className="filter-item">
                <Field
                  name="paymentMethod"
                  render={({ field }) => (
                    <Select
                      options={paymetOptions}
                      value={
                        !!field.value
                          ? { label: getText(field.value), value: field.value }
                          : null
                      }
                      placeholder={getText('Payment Method')}
                      onChange={({ value }) => {
                        field.onChange({
                          target: { value, name: 'paymentMethod' }
                        })
                      }}
                    />
                  )}
                />
              </div>
              <div className="filter-item">
                <Field
                  name="status"
                  render={({ field }) => (
                    <Select
                      options={statusOptions}
                      value={
                        !!field.value
                          ? { label: getText(field.value), value: field.value }
                          : null
                      }
                      placeholder={getText('Status')}
                      onChange={({ value }) => {
                        field.onChange({
                          target: { value, name: 'status' }
                        })
                      }}
                    />
                  )}
                />
              </div>
              <div className="filter-item">
                <Field
                  name="text"
                  render={({ field }) => (
                    <InputSearch
                      field={{
                        onChange: value => {
                          field.onChange({
                            target: {
                              value,
                              name: 'text'
                            }
                          })
                        },
                        name: 'search-text',
                        value: field.value
                      }}
                      initialValue={''}
                      placeholder={getText('Keyword')}
                    />
                  )}
                />
              </div>
              <span className="more" onClick={() => showMore(!more)}>
                {more ? getText('Show less') : getText('Show more')}
              </span>
              {more && (
                <>
                  <div>
                    <TextField
                      name="currency"
                      placeholder={getText('Currency')}
                    />
                  </div>
                  <div>
                    <Field
                      name="amount"
                      render={({ field, form }) => (
                        <InputCurrencyFilter
                          field={field}
                          form={form}
                          placeholder={getText('Amount')}
                          currencyId={'EUR'}
                          notCurrency
                        />
                      )}
                    />
                  </div>
                  <div>
                    <TextField
                      name="customerId"
                      placeholder={getText('Customer Id')}
                    />
                  </div>
                  <div>
                    <TextField
                      name="transactionId"
                      placeholder={getText('Transaction Id')}
                    />
                  </div>
                  <div>
                    <TextField
                      name="merchantTransactionId"
                      placeholder={getText('Merchant Transaction Id')}
                    />
                  </div>
                </>
              )}

              <div className="button-conatiner">
                <PrimaryButton
                  label={getText('Generate Report')}
                  disabled={!props.isValid}
                />
              </div>
            </Wrapper>
          </Form>
        )
      }}
    />
  )
}
