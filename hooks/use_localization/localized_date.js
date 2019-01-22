var formatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
}

const dateFormats = {}

export default (value, locale) => {
  if (!locale) {
    console.warn(`Locale is missing for number: "${value}"`)
    return String(value)
  }

  if (!dateFormats.hasOwnProperty(locale)) {
    dateFormats[locale] = new Intl.DateTimeFormat(locale, formatOptions)
  }

  return dateFormats[locale].format(value)
}
