import NumberFormat from 'react-number-format'
import Input from '../input'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'

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

export default function InputCurrency(props) {
  const { formatAmount } = useLocalization()
  const { symbol, symbolAtEnd, decimal, group } = formatAmount(
    props.currencyId,
    props.value
  )
  return (
    <Input {...props}>
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
    </Input>
  )
}
