import 'react-dates/initialize'

import { useState, forwardRef } from 'react'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'

import { useLocalization } from '../../../hooks'
import { Input, Radio } from '../../molecules'
import styled from '../../styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px ${props => props.theme.shade.A800};
  padding: 24px 24px 12px 24px;
  flex: 1 1 auto;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 12px;
  flex-wrap: wrap;
`
const Label = styled.label`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  font-weight: bold;
  width: 10em;
`

const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 8px;
`

const OptionWrapper = styled.div`
  margin: 8px 24px 0 0px;
`

const statusOptions = [
  'all',
  'bs_initiated',
  'approved',
  'declined',
  'refunded',
  'rejected',
  'cancelled'
]

export default forwardRef<HTMLDivElement, any>(
  (
    { startDate, endDate, setRange, status, setStatus, reason, setReason },
    ref
  ) => {
    const { getText } = useLocalization()
    const [focusedInput, setFocusedInput] = useState(null)
    return (
      <Wrapper ref={ref}>
        <ItemWrapper>
          <Label>{getText('Date Range')}</Label>
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
            showClearDates
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
            initialVisibleMonth={() => moment().add(-1, 'months')}
            startDatePlaceholderText={getText('Start Date')}
            endDatePlaceholderText={getText('End Date')}
            hideKeyboardShortcutsPanel
          />
        </ItemWrapper>
        <ItemWrapper>
          <Label>{getText('Status')}</Label>
          <OptionList>
            {statusOptions.map(option => (
              <OptionWrapper key={option}>
                <Radio
                  label={getText(option)}
                  name="status"
                  value={option}
                  selectedOption={status}
                  onChange={setStatus}
                />
              </OptionWrapper>
            ))}
          </OptionList>
        </ItemWrapper>
        <ItemWrapper>
          <Label>{getText('Text')}</Label>
          <Input
            id="filter_reason"
            name="reason"
            value={reason}
            onChanged={setReason}
          />
        </ItemWrapper>
      </Wrapper>
    )
  }
)
