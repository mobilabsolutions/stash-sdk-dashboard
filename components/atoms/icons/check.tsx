import React from 'react'

export default function CarteBleue({ width = 40, height = 40, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 40 40"
    >
      <g fill="none" fillRule="evenodd">
        <circle cx="20" cy="20" r="20" fill="#3EBD93" />
        <path
          stroke="#FFF"
          strokeLinecap="round"
          strokeWidth="2"
          d="M11.667 21.481l5.128 5.186L28.333 15"
        />
      </g>
    </svg>
  )
}
