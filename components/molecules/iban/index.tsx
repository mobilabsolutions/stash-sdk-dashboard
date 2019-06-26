import React from 'react'
import NumberFormat from 'react-number-format'

export default function Iban({ value }) {
  return (
    <NumberFormat
      displayType="text"
      format="#### #### #### ##### ##"
      value={value}
    />
  )
}
