import 'react-dates/initialize'

import { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import styled from 'styled-components'

import { useLocalization } from '../../../hooks'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  border-bottom: solid 1px ${props => props.theme.shade.A800};
`
const Label = styled.label`
  color: ${props => props.theme.shade.A800};
  font-family: ${props => props.theme.font};
  font-size: 1em;
  font-weight: bold;
`

export default ({
  startDate,
  endDate,
  setRange,
  startPos,
  pageSize,
  totalCount,
  setStartPos
}) => {
  const { getText } = useLocalization()
  const [focusedInput, setFocusedInput] = useState(null)

  return (
    <Wrapper>
      <Label forHml="filter_start_date_id">{getText('Date Range')}</Label>
      <DateRangePicker
        startDate={startDate}
        startDateId="filter_start_date_id"
        endDate={endDate}
        endDateId="filter_end_date_id"
        onDatesChange={({ startDate, endDate }) => setRange(startDate, endDate)}
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
    </Wrapper>
  )
}
