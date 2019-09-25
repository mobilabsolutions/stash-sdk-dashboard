import { forwardRef, useState, useRef } from 'react'

import {
  Input,
  InputFieldWrapper,
  InputWrapper,
  H3,
  InputErrorMessage
} from '../../atoms'
import styled from '../../styled'
import { ReactComponentLike } from 'prop-types'

const InputChildren = props => {
  return <Input {...props} />
}

const InputErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const InputCreator = (
  InputWrapperCmp: ReactComponentLike = InputWrapper,
  InputFieldWrapperCmp: ReactComponentLike = InputFieldWrapper,
  InputErrorMessageCmp: ReactComponentLike = InputErrorMessage
) =>
  function TheInput(
    {
      field: { name, value, onChange, onBlur },
      form: { touched, errors },
      placeholder = '',
      className = '',
      title = '',
      containerStyle = {},
      inputStyle = {},
      labelStyle = {},
      children = InputChildren,
      disabled = false,
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
      <InputFieldWrapperCmp
        onClick={handleClick}
        className={className}
        style={containerStyle}
      >
        <div style={labelStyle}>{!!title && <H3>{title}</H3>}</div>
        <InputErrorWrapper>
          <InputWrapperCmp
            style={inputStyle}
            focused={focused}
            hasErrors={hasErrors}
          >
            {children({
              ref,
              name,
              value,
              disabled,
              type: 'text',
              placeholder,
              onFocus: () => setFocused(true),
              onBlur: event => {
                setFocused(false)
                onBlur(event)
              },
              onChange: onChange,
              autoFocus: autoFocus
            })}
          </InputWrapperCmp>
          {!!hasErrors && (
            <InputErrorMessageCmp>{errors[name]}</InputErrorMessageCmp>
          )}
        </InputErrorWrapper>
      </InputFieldWrapperCmp>
    )
  }

export default forwardRef(
  InputCreator(InputWrapper, InputFieldWrapper, InputErrorMessage)
)
