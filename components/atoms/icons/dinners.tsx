import React from 'react'

export default function Dinners({ width = 22, height = 18, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 22 18"
    >
      <defs>
        <linearGradient
          id="a-dinners"
          x1="70.752%"
          x2="32.476%"
          y1="81.094%"
          y2="18.906%"
        >
          <stop offset="0%" stopColor="#009BE0" />
          <stop offset="100%" stopColor="#006BA8" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="url(#a-dinners)"
          d="M12.765 17.183c4.718.023 9.025-3.83 9.025-8.517 0-5.125-4.307-8.668-9.025-8.666h-4.06C3.93-.002 0 3.542 0 8.666c0 4.688 3.93 8.54 8.705 8.517h4.06z"
        />
        <path
          fill="#F4F6F7"
          d="M8.721.716C4.358.717.823 4.238.822 8.582c.001 4.344 3.536 7.864 7.9 7.865 4.363-.001 7.9-3.521 7.9-7.865S13.085.717 8.722.716zM3.714 8.582A4.994 4.994 0 0 1 6.93 3.93v9.305a4.992 4.992 0 0 1-3.215-4.652zm6.8 4.654V3.929a4.992 4.992 0 0 1 3.216 4.653 4.993 4.993 0 0 1-3.217 4.654z"
        />
      </g>
    </svg>
  )
}
