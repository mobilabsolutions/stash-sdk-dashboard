import React from 'react'

export default function Visa({ width = 60, height = 40, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
      viewBox="0 0 60 40"
    >
      <g fill="none" fillRule="nonzero">
        <path
          fill="#00589F"
          d="M20.617 29.502l2.975-17h4.718l-2.974 17zM42.465 13.006c-.923-.302-2.359-.704-4.205-.704-4.718 0-8 2.313-8 5.633 0 2.414 2.358 3.822 4.102 4.627 1.846.804 2.462 1.408 2.462 2.112 0 1.107-1.436 1.71-2.872 1.71-1.846 0-2.872-.302-4.41-.905l-.616-.403-.616 3.823c1.129.503 3.18.905 5.232.905 4.923 0 8.205-2.313 8.205-5.834 0-1.911-1.23-3.42-4-4.627-1.641-.805-2.667-1.308-2.667-2.112 0-.705.82-1.51 2.667-1.51 1.539 0 2.667.303 3.488.604l.41.201.82-3.52M54.57 12.604h-3.694c-1.128 0-1.948.301-2.461 1.408l-6.975 15.59h4.923s.82-2.111 1.026-2.514h6.052c.102.604.615 2.515.615 2.515h4.41l-3.897-17zm-5.848 10.863c.41-1.006 1.847-4.728 1.847-4.728s.41-1.005.615-1.609l.308 1.509s.923 4.023 1.128 4.929h-3.898v-.1zM16.617 12.604L12 24.17l-.513-2.313c-.82-2.716-3.59-5.633-6.564-7.142l4.308 14.786h5.026l7.488-17h-5.13"
        />
        <path
          fill="#F9A51A"
          d="M7.693 12.503H.103L0 12.905c5.95 1.409 9.847 4.829 11.488 8.852l-1.64-7.745c-.206-1.107-1.13-1.408-2.155-1.51"
        />
      </g>
    </svg>
  )
}