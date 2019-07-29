import { forwardRef, FocusEventHandler, ChangeEventHandler } from 'react'
import styled from '../../styled'

const HtmlInput = styled.input`
  border: none;
  color: ${props => props.theme.shade.A700};
  display: block;
  font-family: ${props => props.theme.font};
  font-size: 14px;
  margin-left: ${p => p.theme.spacing.small};
  margin-right: ${p => p.theme.spacing.small};
  box-shadow: none;
  width: 100%;
  :disabled {
    color: ${props => props.theme.shade.A300};
  }
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${props => props.theme.shade.A100};
  }
  ::selection {
    background-color: ${props => props.theme.primary.A100};
  }
`

type InputProps = {
  name: string
  value: string
  type: string
  placeholder: string
  onChange: ChangeEventHandler
  onBlur: FocusEventHandler
  onFocus: FocusEventHandler
  autoFocus: boolean
}

function Input(
  {
    name,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    onBlur = null,
    onFocus = null,
    autoFocus = false
  }: InputProps,
  inputRef: any
) {
  return (
    <HtmlInput
      ref={inputRef}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      autoFocus={autoFocus}
    />
  )
}

export default forwardRef(Input)
