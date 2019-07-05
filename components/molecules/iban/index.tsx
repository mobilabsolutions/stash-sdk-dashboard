import React from 'react'

function formatIBAN(value: string) {
  const formated = value
    .split('')
    .map((char, i) => (i % 4 == 0 ? ` ${char}` : char))
    .join('')
  return formated
}

export default function Iban({ value }) {
  return <span>{formatIBAN(value)}</span>
}
