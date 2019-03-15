import { forwardRef, useState, useRef } from 'react'

import {
  Input,
  InputFieldWrapper,
  InputWrapper,
  InputIconWrapper,
  InputVisibilityIcon,
  InputErrorMessage
} from '../../atoms'

function IconPasswordInput(
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
  const [visible, setVisible] = useState(false)
  const localRef = useRef(undefined)

  const ref = inputRef || localRef
  const handleClick = () => ref && ref.current && ref.current.focus()
  const hasErrors = touched[name] && errors[name]

  return (
    <InputFieldWrapper onClick={handleClick} className={className}>
      <InputWrapper focused={focused} hasErrors={hasErrors}>
        <InputIconWrapper focused={focused} hasErrors={hasErrors}>
          {icon}
        </InputIconWrapper>
        <Input
          ref={ref}
          name={name}
          value={value}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={event => {
            setFocused(false)
            onBlur(event)
          }}
          onChange={onChange}
          autoFocus={autoFocus}
        />
        <InputVisibilityIcon visible={visible} setVisible={setVisible} />
      </InputWrapper>
      {!!hasErrors && <InputErrorMessage>{errors[name]}</InputErrorMessage>}
    </InputFieldWrapper>
  )
}

export default forwardRef(IconPasswordInput)
