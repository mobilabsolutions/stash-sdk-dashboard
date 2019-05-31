import React from 'react'

export default function Loading({ width = 24, height = 24 }) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.9375s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(22.5 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.875s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(45 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.8125s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(67.5 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.75s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(90 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.6875s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(112.5 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.625s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(135 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.5625s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(157.5 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.4375s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(202.5 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.375s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(225 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.3125s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(247.5 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.25s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(270 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.1875s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(292.5 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.125s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(315 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="-0.0625s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <g transform="rotate(337.5 50 50)">
        <rect x="47" y="18" rx="2" ry="2" width="6" height="14" fill="#ffffff">
          <animate
            attributeName="opacity"
            values="1;0"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  )
}
