import React, { useState, useEffect } from 'react'
import { DateRangePicker } from 'react-dates'

export default function DatePicker({
  initialFromDate,
  initialToDate,
  onDatesChange,
  ...props
}) {
  const [range, _setRange] = useState({
    fromDate: initialFromDate,
    toDate: initialToDate
  })

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
