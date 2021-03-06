import styled from '../../styled'
import { forwardRef, useRef, useState, ChangeEvent, useEffect } from 'react'
import { useDebounce } from '../../../hooks'
import { Magnify } from '../../../components/atoms'
import InputWrapperProps from '../../../components/atoms/input/interfaces'

const HtmlInput = styled.input`
  border: none;
  color: ${props => props.theme.shade.A700};
  display: block;
  font-size: 14px;
  margin-left: ${p => p.theme.spacing.small};
  margin-right: ${p => p.theme.spacing.small};
  box-shadow: none;
  width: 100%;
  background-color: ${props => props.theme.shade.A25};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${props => props.theme.shade.A200};
  }
  ::selection {
    background-color: ${props => props.theme.primary.A100};
  }
`

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  min-height: 38px;
  border: solid 1px
    ${props =>
      props.focused ? props.theme.primary.A500 : props.theme.shade.A50};
  background-color: ${props => props.theme.shade.A25};
  :hover {
    border-color: ${props =>
      props.focused ? props.theme.primary.A500 : props.theme.shade.A200};
  }
`

function TheInput(
  {
    field: { name, onChange, value },
    placeholder = 'Insert text',
    title = '',
    initialValue = '',
    withDeabounce = true,
    disabled = false,
    autoFocus = false
  },
  inputRef: any
) {
  const localRef = useRef(undefined)
  const [focused, setFocused] = useState(autoFocus)

  const ref = inputRef || localRef

  const [_value, setValue] = useState(initialValue)

  const debouncedSearchTerm = useDebounce(_value, withDeabounce ? 500 : 0)
  useEffect(() => {
    debouncedSearchTerm !== value && onChange(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    value !== _value && setValue(value)
  }, [value])

  function _onChange(ev: ChangeEvent<HTMLInputElement>) {
    setValue(ev.target.value)
  }

  return (
    <InputWrapper focused={focused} hasErrors={false}>
      <Magnify
        style={{ margin: 'auto', paddingLeft: '8px' }}
        height={24}
        width={24}
      />
      <HtmlInput
        ref={ref}
        name={name}
        value={_value}
        disabled={disabled}
        title={title}
        type="text"
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
        }}
        onChange={_onChange}
        autoFocus={autoFocus}
      />
    </InputWrapper>
  )
}

export default forwardRef(TheInput)
