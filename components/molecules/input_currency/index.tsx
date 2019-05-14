import { forwardRef, useState, useRef } from 'react'
import NumberFormat from 'react-number-format'
import {
  InputFieldWrapper,
  InputWrapper,
  H3,
  InputErrorMessage
} from '../../atoms'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'

const HtmlInput = styled.input`
  border: none;
  color: ${props => props.theme.shade.A700};
  display: block;
  font-family: ${props => props.theme.font};
  font-size: 14px;
  margin-left: 16px;
  margin-right: 16px;
  box-shadow: none;
  width: 100%;
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

function TheInput(
  {
    field: { name, value, onChange, onBlur },
    form: { touched, errors },
    placeholder = '',
    title = '',
    className = '',
    disabled = false,
    autoFocus = false,
    currencyId
  },
  inputRef: any
) {
  const [focused, setFocused] = useState(autoFocus)
  const localRef = useRef(undefined)
  const { formatAmount } = useLocalization()
  const { symbol, symbolAtEnd, decimal, group } = formatAmount(
    currencyId,
    value
  )

  const ref = inputRef || localRef

  const handleClick = () => inputRef && inputRef.current.focus()
  const hasErrors = touched[name] && errors[name]

  return (
    <InputFieldWrapper onClick={handleClick} className={className}>
      {!!title && <H3>{title}</H3>}
      <InputWrapper focused={focused} hasErrors={hasErrors}>
        <NumberFormat
          ref={ref}
          customInput={p => <HtmlInput {...p} />}
          name={name}
          defaultValue={value}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={event => {
            setFocused(false)
            onBlur(event)
          }}
          thousandSeparator={group}
          decimalSeparator={decimal}
          decimalScale={2}
          fixedDecimalScale
          onValueChange={valueObj =>
            onChange({ target: { value: valueObj.value, name } })
          }
          suffix={symbolAtEnd ? symbol : ''}
          prefix={!symbolAtEnd ? symbol : ''}
          autoFocus={autoFocus}
        />
      </InputWrapper>
      {!!hasErrors && <InputErrorMessage>{errors[name]}</InputErrorMessage>}
    </InputFieldWrapper>
  )
}

export default forwardRef(TheInput)
