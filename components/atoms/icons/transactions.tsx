import React from 'react'

export default function Transactions({
  width = 32,
  height = 32,
  fill = '#EDEEF5',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 32 32"
    >
      <g fill="none" fillRule="evenodd">
        <circle cx="16" cy="16" r="16" fill={fill} />
        <path
          fill="#4F5995"
          fillRule="nonzero"
          d="M18.82 16.64l-3.32-3.32L18.82 10v2.5h5.82v1.64h-5.82v2.5zm-5 .86V15l3.32 3.32-3.32 3.32v-2.5H8V17.5h5.82z"
        />
      </g>
    </svg>
  )
}
