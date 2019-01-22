const numberFormats = {}

export default (currencyId, value, locale) => {
  if (!locale) {
    console.warn(`Locale is missing for number: "${value}"`)
    return String(value)
  }

  if (!currencyId) {
    console.warn(`CurrencyId is missing for number: "${value}"`)
    return String(value)
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
  }

  return numberFormats[key].format(value)
}
