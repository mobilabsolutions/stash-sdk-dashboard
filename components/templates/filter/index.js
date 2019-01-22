import 'react-dates/initialize'

import { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import styled from 'styled-components'

import { useLocalization } from '../../../hooks'

const Wrapper = styled.div``

export default ({ startDate, endDate, setRange }) => {
  const { getText } = useLocalization()
  const [focusedInput, setFocusedInput] = useState(null)

  return (
    <Wrapper>
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
