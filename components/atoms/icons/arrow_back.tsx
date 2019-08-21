import React from 'react'

export default function ArrowBack({
  width = 16,
  height = 14,
  fill = '#46545E',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 16 14"
    >
      <path
        fill={fill}
        fillRule="evenodd"
        d="M3.6 6.207h11.385a1 1 0 0 1 0 2H3.743l3.878 3.879A1 1 0 1 1 6.207 13.5L.55 7.843a.997.997 0 0 1 0-1.414L6.207.772a1 1 0 1 1 1.414 1.414l-4.02 4.021z"
      />
    </svg>
  )
}
