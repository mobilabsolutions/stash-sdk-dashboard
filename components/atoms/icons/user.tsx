import React from 'react'

export default function User({
  width = 16,
  height = 18,
  fill = '#FFF',
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 16 18"
    >
      <g fill={fill} fillRule="evenodd">
        <path d="M8.307 0a3.679 3.679 0 0 1 3.684 3.684 3.679 3.679 0 0 1-3.684 3.684 3.679 3.679 0 0 1-3.684-3.684A3.679 3.679 0 0 1 8.307 0zM8.307 17.438a8.842 8.842 0 0 1-7.368-3.955c.037-2.443 4.912-3.782 7.368-3.782 2.444 0 7.331 1.339 7.368 3.782a8.842 8.842 0 0 1-7.368 3.954z" />
      </g>
    </svg>
  )
}
