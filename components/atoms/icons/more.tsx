import React from 'react'

export default function More({
  width = 24,
  height = 16,
  fill = '#a3aaaf',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <path
        fill={fill}
        d="M255.8 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM102 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38zM410 218c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38z"
      />
    </svg>
  )
}
