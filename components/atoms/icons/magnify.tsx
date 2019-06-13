import React from 'react'

export default function Magnify({ width = 15, height = 15, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 15 15"
    >
      <path
        fill="#A3AAAF"
        fillRule="nonzero"
        d="M5.44 9.18c.68 0 1.307-.17 1.88-.51A3.774 3.774 0 0 0 8.68 7.3c.333-.573.5-1.2.5-1.88 0-.68-.167-1.307-.5-1.88a3.697 3.697 0 0 0-1.36-1.36c-.573-.333-1.2-.5-1.88-.5-.68 0-1.307.167-1.88.5a3.774 3.774 0 0 0-1.37 1.36c-.34.573-.51 1.2-.51 1.88 0 .68.17 1.307.51 1.88.34.573.797 1.03 1.37 1.37.573.34 1.2.51 1.88.51zm5 0l4.14 4.14-1.26 1.26-4.14-4.16v-.66l-.24-.22a4.946 4.946 0 0 1-1.61.95c-.607.22-1.237.33-1.89.33-.987 0-1.897-.24-2.73-.72A5.34 5.34 0 0 1 .74 8.16 5.315 5.315 0 0 1 0 5.42c0-.987.243-1.897.73-2.73A5.346 5.346 0 0 1 2.71.72 5.374 5.374 0 0 1 5.44 0c.987 0 1.9.247 2.74.74a5.286 5.286 0 0 1 1.93 1.96c.473.827.71 1.733.71 2.72 0 .667-.11 1.303-.33 1.91a4.946 4.946 0 0 1-.95 1.61l.22.24h.68z"
      />
    </svg>
  )
}
