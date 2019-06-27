const numberFormats = {}

// Source: https://github.com/tc39/proposal-intl-formatToParts/blob/master/locale-data/json/en-US.json
// TODO: Add support for more locales [de]
const currencies = {
  AUD: 'A$',
  BRL: 'R$',
  CAD: 'CA$',
  CNY: 'CN¥',
  EUR: '€',
  GBP: '£',
  HKD: 'HK$',
  ILS: '₪',
  INR: '₹',
  JPY: '¥',
  KRW: '₩',
  MXN: 'MX$',
  NZD: 'NZ$',
  TWD: 'NT$',
  USD: '$',
  VND: '₫',
  XAF: 'FCFA',
  XCD: 'EC$',
  XOF: 'CFA',
  XPF: 'CFPF'
}

function resolveSymbol(formateAmount: string): string {
  return isNaN(parseInt(formateAmount[0]))
    ? formateAmount[0]
    : formateAmount[formateAmount.length - 1]
}

export default function localizedAmount(
  currencyId: string,
  value: number,
  locale: string
): {
  value: string
  symbol?: string
  group?: string
  decimal?: string
  symbolAtEnd?: boolean
} {
  if (!locale) {
    console.warn(`Locale is missing for number: "${value}"`)
    return { value: String(value) }
  }

  if (!currencyId) {
    console.warn(`CurrencyId is missing for number: "${value}"`)
    return { value: String(value) }
  }

  const key = `${locale}-${currencyId}`

  if (!numberFormats.hasOwnProperty(key)) {
    const formatOptions = {
      useGrouping: true,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      minimumIntegerDigits: 1,
      style: 'currency',
      currency: currencyId,
      currencyDisplay: 'symbol'
    }
    numberFormats[key] = new Intl.NumberFormat(locale, formatOptions)
    const formated = numberFormats[key].format(1000)
    numberFormats[key].symbol = currencies[currencyId]
      ? currencies[currencyId]
      : resolveSymbol(formated)
    numberFormats[key].symbolAtEnd = !isNaN(parseInt(formated[0]))
    const numberOnly = formated.replace(numberFormats[key].symbol, '').trim()
    numberFormats[key].group = numberOnly[1]
    numberFormats[key].decimal = numberOnly[numberOnly.length - 3]
  }

  return {
    value: numberFormats[key].format(value),
    symbol: numberFormats[key].symbol,
    group: numberFormats[key].group,
    symbolAtEnd: numberFormats[key].symbolAtEnd,
    decimal: numberFormats[key].decimal
  }
}
