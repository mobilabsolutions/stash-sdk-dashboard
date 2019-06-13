import React from 'react'

export default function ArrowDown({ width = 10, height = 7, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 10 7"
    >
      <path
        fill="#46545E"
        fillRule="nonzero"
        d="M1.16 0L5 3.837 8.82 0 10 1.18 5 6.174 0 1.18z"
      />
    </svg>
  )
}
