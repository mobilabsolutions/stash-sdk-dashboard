import 'react-dates/initialize'

import { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import styled from 'styled-components'

import { useLocalization } from '../../../hooks'
import { Radio } from '../../molecules'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px ${props => props.theme.shade.A800};
  padding: 24px 24px 12px 24px;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 12px;
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
`

const OptionWrapper = styled.div`
  margin: 8px 24px 0 0;
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

export default ({ startDate, endDate, setRange, status, setStatus }) => {
  const { getText } = useLocalization()
  const [focusedInput, setFocusedInput] = useState(null)

  return (
    <Wrapper>
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
          isOutsideRange={value => value.isAfter(moment())}
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
    </Wrapper>
  )
}
