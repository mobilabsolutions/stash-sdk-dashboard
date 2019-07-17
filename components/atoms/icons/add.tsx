import React from 'react'

export default function Add({
  width = 16,
  height = 16,
  fill = '#FFF',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 2 0v6z"
      />
    </svg>
  )
}
