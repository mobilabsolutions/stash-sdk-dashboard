import { forwardRef, useState, useRef } from 'react'

import {
  Input,
  InputFieldWrapper,
  InputWrapper,
  InputIconWrapper,
  InputErrorMessage
} from '../../atoms'

function IconInput(
  {
    field: { name, value, onChange, onBlur },
    form: { touched, errors },
    icon,
    placeholder = '',
    className = '',
    autoFocus = false
  },
  inputRef: any
) {
  const [focused, setFocused] = useState(autoFocus)
  const localRef = useRef(undefined)

  const ref = inputRef || localRef

  const handleClick = () => inputRef && inputRef.current.focus()
  const hasErrors = touched[name] && errors[name]

  return (
    <InputFieldWrapper>
      <InputWrapper
        focused={focused}
        hasErrors={hasErrors}
        onClick={handleClick}
        className={className}
      >
        <InputIconWrapper focused={focused} hasErrors={hasErrors}>
          {icon}
        </InputIconWrapper>
        <Input
          ref={ref}
          name={name}
          value={value}
          type="text"
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={event => {
            setFocused(false)
            onBlur(event)
          }}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      </InputWrapper>
      {hasErrors && <InputErrorMessage>{errors[name]}</InputErrorMessage>}
    </InputFieldWrapper>
  )
}

export default forwardRef(IconInput)
