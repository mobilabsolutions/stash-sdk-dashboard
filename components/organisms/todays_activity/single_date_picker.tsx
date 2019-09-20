import React, { useState } from 'react'
import { SingleDatePicker } from 'react-dates'
import moment from 'moment'
import styled from '../../styled'

const Wrapper = styled.div`
  .SingleDatePickerInput_calendarIcon {
    padding: 0px;
    transform: translateY(-6px);
  }
  .DateInput {
    width: 0px;
  }
  .DateInput_input {
    display: none;
  }
  .SingleDatePicker_picker {
    transform: translate(-100px, -24px);
  }
  .DateInput_fang {
    transform: translate(-76px, -35px);
  }
  .CalendarMonth_caption {
    color: #f27969;
  }
  .CalendarDay__default {
    border: none;
    color: ${p => p.theme.shade.A700};
    background: #fff;
  }
  .CalendarDay__selected,
  .CalendarDay__selected:active,
  .CalendarDay__selected:hover {
    background: ${p => p.theme.red.A50};
    border: none;
    color: #f27969;
  }
  .DayPicker_weekHeader {
    border-top: 1px solid #f3f3f3;
    border-bottom: 1px solid #f3f3f3;
  }
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    background: #fff;
    color: #a3aaaf;
  }
  .DayPicker_weekHeader {
    transform: translateY(-5px);
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }
`

export default function SingleDate({
  date,
  onDateChange,
  renderInput,
  ...rest
}) {
  const [focused, setFocused] = useState(false)
  return (
    <Wrapper>
      <SingleDatePicker
        numberOfMonths={1}
        date={date}
        onDateChange={(...args) => {
          setFocused(false)
          onDateChange(...args)
        }}
        id="s-d-p"
        onFocusChange={({ focused }) => {
          setFocused(focused)
        }}
        focused={focused}
        readOnly
        customInputIcon={renderInput()}
        noBorder
        hideKeyboardShortcutsPanel
        keepOpenOnDateSelect
        isOutsideRange={(value: moment.Moment) =>
          value.isAfter(
            moment()
              .add(-1, 'day')
              .hours(23)
              .minutes(59)
              .seconds(59)
              .milliseconds(0)
          )
        }
        {...rest}
      />
    </Wrapper>
  )
}
