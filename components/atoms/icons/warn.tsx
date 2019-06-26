import React from 'react'

export default function Warn({
  width = 20,
  height = 20,
  fill = '#F7981C',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 20 20"
    >
      <defs>
        <circle id="a" cx="10" cy="10" r="8.75" />
        <path
          id="b"
          d="M9.3 5h1.406v6.875H9.3V5zm.7 10.625a.937.937 0 1 1 0-1.875.937.937 0 0 1 0 1.875z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <use fill={fill} xlinkHref="#a" />
        <use fill="#FFF" xlinkHref="#b" />
      </g>
    </svg>
  )
}
