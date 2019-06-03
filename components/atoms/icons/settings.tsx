import React from 'react'

export default function Settings({ width = 24, height = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 24 24"
    >
      <path
        fill="#46545E"
        fillRule="evenodd"
        d="M6.102 17.005a2.751 2.751 0 1 1 .178 1.955A1 1 0 0 1 6 19H3a1 1 0 0 1 0-2h3c.034 0 .069.002.102.005zm5-6A2.751 2.751 0 0 1 16.396 11H21h-4.604a2.752 2.752 0 0 1-5.116 1.96A1 1 0 0 1 11 13H3a1 1 0 0 1 0-2h8c.034 0 .069.002.102.005zm-5-6A2.751 2.751 0 1 1 6.28 6.96 1 1 0 0 1 6 7H3a1 1 0 1 1 0-2h3c.034 0 .069.002.102.005zM8 11H3h5zm13 6h-5 5zm0 2h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2zm0-14h-5 5zm0 2h-5a1 1 0 0 1 0-2h5a1 1 0 0 1 0 2zm0 6h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2zM6 5H1h5zm0 12H1h5zM8.75 7a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm5 6a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5zm-5 6a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5z"
      />
    </svg>
  )
}
