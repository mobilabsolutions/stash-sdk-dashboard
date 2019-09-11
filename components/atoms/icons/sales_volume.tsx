import React from 'react'

export default function SalesVolume({
  width = 32,
  height = 34,
  fill = '#EFF5FE',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 32 34"
    >
      <g fill="none" fillRule="evenodd">
        <ellipse cx="16" cy="16.552" fill="#EFF5FE" rx="16" ry="16.552" />
        <path
          fill="#609DF6"
          fillRule="nonzero"
          d="M20.058 12.25h4.75V17l-1.824-1.824-4.959 4.978L14.871 17l-4.75 4.75L9 20.629l5.871-5.852 3.154 3.154 3.857-3.857z"
        />
      </g>
    </svg>
  )
}
