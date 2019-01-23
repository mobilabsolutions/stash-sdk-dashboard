import React from 'react'

export default ({
  width = 20,
  height = 20,
  onClick,
  disable,
  ...properties
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 48 48"
    onClick={disable ? null : onClick}
    className={disable ? 'disable' : 'enable'}
    {...properties}
  >
    <path d="M14.83 30.83L24 21.66l9.17 9.17L36 28 24 16 12 28z" />
  </svg>
)
