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
          defaultValue={value}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
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
      )}
    </Input>
  )
}
