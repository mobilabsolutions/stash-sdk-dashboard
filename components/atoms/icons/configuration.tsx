import React from 'react'

export default function User({
  width = 21,
  height = 15,
  stroke = '#FFF',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 21 15"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M1.053 1.614h11.659M19.462 1.614h-2.455M1.053 7.75h2.454M7.189 7.75h12.273M1.053 13.886h12.272M17.007 13.886h2.455" />
      </g>
      >
    </svg>
  )
}
