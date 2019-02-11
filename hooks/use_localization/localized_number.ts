const formatOptions = { useGrouping: false, maximumFractionDigits: 3 }
const numberFormats = {}

export default (value, locale) => {
  if (!locale) {
    console.warn(`Locale is missing for number: "${value}"`)
    return String(value)
  }

  if (!numberFormats.hasOwnProperty(locale)) {
    numberFormats[locale] = new Intl.NumberFormat(locale, formatOptions)
  }

  return numberFormats[locale].format(value)
}
