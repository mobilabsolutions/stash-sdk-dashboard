const formatOptions = { useGrouping: false, maximumFractionDigits: 3 }
const numberFormats = {}

export default function localizedNumber(value: number, locale: string) {
  if (!locale) {
    console.warn(`Locale is missing for number: "${value}"`)
    return String(value)
  }

  if (!numberFormats.hasOwnProperty(locale)) {
    numberFormats[locale] = new Intl.NumberFormat(locale, formatOptions)
  }

  return numberFormats[locale].format(value)
}
