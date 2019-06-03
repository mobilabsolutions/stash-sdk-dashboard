import 'react-dates/initialize'

import { useState, forwardRef } from 'react'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'

import { useLocalization } from '../../../hooks'
import { Select, InputSearch } from '../../molecules'
import styled from '../../styled'
import { statusToAction, paymentMethods } from '../../../assets/utils'
import { FlatButton } from '../../atoms'

const Wrapper = styled.div`
  display: block;
  height: 68px;
  margin: 12px 48px;
  padding: 16px;
  flex: 1 1 auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 ${props => props.theme.shade.A50};
  background-color: #ffffff;
`

const ItemWrapper = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding-right: 8px;
  flex-wrap: wrap;
`
const ClearBtn = styled(FlatButton)`
  margin: auto;
  padding: 8px;
  font-size: 14px;
`

export default forwardRef<HTMLDivElement, any>(
  (
    {
      startDate,
      endDate,
      setRange,
      status,
      setStatus,
      paymentMethod,
      setText,
      text,
      clearFilters,
      setPaymentMethod
    },
    ref
  ) => {
    const { getText } = useLocalization()
    const statusOptions = Object.entries(statusToAction).map(act => ({
      value: act[0],
      label: getText(act[0])
    }))
    const paymetOptions = paymentMethods.map(pay => ({
      value: pay.name,
      label: getText(pay.name)
    }))
    const [focusedInput, setFocusedInput] = useState(null)
    const isFiltered =
      !!startDate || !!endDate || !!paymentMethod || !!status || !!text
    return (
      <Wrapper ref={ref}>
        <ItemWrapper>
          <DateRangePicker
            startDate={startDate}
            startDateId="filter_start_date_id"
            endDate={endDate}
            endDateId="filter_end_date_id"
            onDatesChange={({ startDate, endDate }) =>
              setRange(startDate, endDate)
            }
            focusedInput={focusedInput}
            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
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
        </ItemWrapper>
        <ItemWrapper>
          <Select
            options={paymetOptions}
            value={
              !!paymentMethod
                ? { label: getText(paymentMethod), value: paymentMethod }
                : null
            }
            placeholder={getText('Payment Method')}
            onChange={({ value }) => {
              setPaymentMethod(value)
            }}
          />
        </ItemWrapper>
        <ItemWrapper>
          <Select
            options={statusOptions}
            value={!!status ? { label: getText(status), value: status } : null}
            placeholder={getText('Status')}
            onChange={({ value }) => {
              setStatus(value)
            }}
          />
        </ItemWrapper>
        <ItemWrapper>
          <InputSearch
            field={{ onChange: setText, name: 'search-text' }}
            placeholder={getText('Search Payments…')}
          />
        </ItemWrapper>
        {isFiltered && (
          <ItemWrapper style={{ float: 'right', height: '100%' }}>
            <ClearBtn onClick={clearFilters}>
              {getText('Clear Filters')}
            </ClearBtn>
          </ItemWrapper>
        )}
      </Wrapper>
    )
  }
)
