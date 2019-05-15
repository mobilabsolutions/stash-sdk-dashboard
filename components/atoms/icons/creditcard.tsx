import React from 'react'

export default function CreditCard({ width = 60, height = 40, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 60 40"
    >
      <g fill="none" fillRule="evenodd" stroke="#46545E">
        <rect width="58" height="38" x="1" y="1" strokeWidth="2" rx="4.8" />
        <path strokeLinecap="square" strokeWidth="4" d="M2 13h56" />
        <path strokeLinecap="square" strokeWidth="2" d="M6 33h15" />
      </g>
    </svg>
  )
}
