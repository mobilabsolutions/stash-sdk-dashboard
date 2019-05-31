import React from 'react'
import { Button } from './primary'
import Loading from '../icons/loading'
import styled from '../../styled'

interface ButtonProps {
  label: string
  isFullSize?: boolean
  isLoading?: boolean
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  onClick?: (event) => void
}

const ExtendedButton = styled(Button)<ButtonProps>`
  min-width: 150px;
  :disabled {
    background-color: ${props =>
      props.isLoading ? props.theme.primary.A600 : props.theme.shade.A200};
  }
`

export default function LoadingButton({
  isFullSize = false,
  type = 'submit',
  label = '',
  isLoading = false,
  disabled = false,
  onClick
}: ButtonProps) {
  return (
    <ExtendedButton
      isFullSize={isFullSize}
      type={type}
      disabled={isLoading || disabled}
      isLoading={isLoading}
      label={label}
      onClick={
        !disabled && onClick
          ? e => {
              e.stopPropagation()
              onClick(e)
            }
          : null
      }
    >
      {!isLoading ? <span>{label}</span> : <Loading />}
    </ExtendedButton>
  )
}
