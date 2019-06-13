import React from 'react'

export default function ArrowUp({ width = 10, height = 7, ...props }) {
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
        d="M8.84 6.175L5 2.338 1.18 6.175 0 4.996 5 0l5 4.996z"
      />
    </svg>
  )
}
