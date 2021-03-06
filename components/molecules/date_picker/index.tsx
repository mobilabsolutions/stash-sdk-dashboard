import React, { useState, useEffect } from 'react'
import 'react-dates/initialize'
import { DateRangePicker } from 'react-dates'
import { useLocalization } from '../../../hooks'

export default function DatePicker({
  initialFromDate,
  initialToDate,
  onDatesChange,
  onFocusChange,
  focusedInput,
  ...props
}) {
  const [range, _setRange] = useState({
    fromDate: initialFromDate,
    toDate: initialToDate
  })
  const { getText } = useLocalization()

  const onClear = () => {
    onDatesChange({ startDate: null, endDate: null })
  }

  useEffect(() => {
    //External clear
    if (!initialFromDate && !initialToDate) {
      _setRange({
        fromDate: initialFromDate,
        toDate: initialToDate
      })
    }
  }, [initialFromDate, initialToDate])

  return (
    <DateRangePicker
      {...props}
      startDate={range.fromDate}
      endDate={range.toDate}
      startDatePlaceholderText={getText('From')}
      endDatePlaceholderText={getText('To')}
      onFocusChange={onFocusChange}
      focusedInput={focusedInput}
      startDateId="startDateId"
      endDateId="endDateId"
      onDatesChange={({ startDate, endDate }) => {
        _setRange({ fromDate: startDate, toDate: endDate })
        //When clear cross is pressed
        if (!startDate && !endDate) {
          onClear()
        }
      }}
      onClose={p => {
        onDatesChange(p)
      }}
    />
  )
}
