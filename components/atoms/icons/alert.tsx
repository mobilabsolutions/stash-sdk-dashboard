import React from 'react'

export default function Alert({ width = 24, height = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 24 24"
    >
      <defs>
        <circle id="alert-c" cx="12" cy="12" r="12" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="alert-mask" fill="#fff">
          <use xlinkHref="#alert-c" />
        </mask>
        <use fill="#FF9B9B" xlinkHref="#alert-c" />
        <g fill="#FFF" mask="url(#alert-mask)">
          <path d="M13.999 18.922L14 19a2 2 0 1 1-3.999-.078c-3.72-.31-6-1.548-5.998-3.804a4.03 4.03 0 0 1 1.236-2.61c.402-.38.649-.94.67-1.508V9.6C5.91 5.975 8.614 3 12 3s6.09 2.975 6.09 6.6v1.38c.027.598.273 1.152.67 1.525.713.67 1.154 1.607 1.24 2.695 0 2.186-2.28 3.414-6.001 3.722zm2.093-7.885L16.09 11V9.6C16.09 7.04 14.237 5 12 5S7.91 7.04 7.91 9.6l-.002 1.437c-.04 1.121-.507 2.18-1.3 2.928-.346.324-.569.798-.608 1.235 0 .949 2.126 1.8 6 1.8s6-.851 6.003-1.718a2.036 2.036 0 0 0-.614-1.32c-.79-.745-1.256-1.804-1.297-2.925z" />
        </g>
      </g>
    </svg>
  )
}
