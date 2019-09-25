import React, { forwardRef } from 'react'
import { InputCreator } from '../input'
import { InputWrapper } from '../../atoms'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import NumberFormat from 'react-number-format'

const CustomImputWrapper = styled(InputWrapper)`
  margin-bottom: 0px;
  border: solid 1px
    ${props =>
      props.focused ? props.theme.primary.A500 : props.theme.shade.A50};
  background-color: ${props => props.theme.shade.A25};
  :hover {
    border-color: ${props =>
      props.focused ? props.theme.primary.A500 : props.theme.shade.A200};
  }
`

const CustomInput = forwardRef(InputCreator(CustomImputWrapper))

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

export default function InputFilter(props) {
  const { formatAmount } = useLocalization()
  const { symbol, symbolAtEnd, decimal, group } = formatAmount(
    props.currencyId,
    props.value
  )
  return (
    <CustomInput {...props}>
      {({
        name,
        placeholder,
        disabled,
        value,
        onFocus,
        onBlur,
        onChange,
        autoFocus
      }) => (
        <NumberFormat
          customInput={HtmlInput}
          name={name}
          value={value}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          thousandSeparator={group}
          decimalSeparator={decimal}
          decimalScale={2}
          fixedDecimalScale
          onChange={ev => {
            const value = (ev.target.value || '0')
              .replace(new RegExp(symbol, 'g'), '')
              .replace(new RegExp(group, 'g'), '')
              .replace(decimal, '.')
            onChange({ target: { value: Number(value), name } })
          }}
          suffix={symbolAtEnd && !props.notCurrency ? symbol : ''}
          prefix={!symbolAtEnd && !props.notCurrency ? symbol : ''}
          autoFocus={autoFocus}
        />
      )}
    </CustomInput>
  )
}
