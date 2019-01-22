import 'react-dates/initialize'

import { useState } from 'react'
import { DateRangePicker } from 'react-dates'
import moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div``

export default ({ startDate, endDate, setRange }) => {
  const [focusedInput, setFocusedInput] = useState(null)

  return (
    <Wrapper>
      <DateRangePicker
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={({ startDate, endDate }) => setRange(startDate, endDate)}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        showClearDates
        noBorder
        isOutsideRange={value => value.isAfter(moment())}
        initialVisibleMonth={() => moment().add(-1, 'months')}
      />
    </Wrapper>
  )
}
