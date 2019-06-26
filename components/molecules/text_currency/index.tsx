import NumberFormat from 'react-number-format'
import { useLocalization } from '../../../hooks'

export default function InputCurrency({ value, currencyId }) {
  const { formatAmount } = useLocalization()
  const { symbol, symbolAtEnd, decimal, group } = formatAmount(
    currencyId,
    value
  )
  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator={group}
      decimalSeparator={decimal}
      decimalScale={2}
      fixedDecimalScale
      suffix={symbolAtEnd ? ` ${symbol}` : ''}
      prefix={!symbolAtEnd ? `${symbol} ` : ''}
    />
  )
}
