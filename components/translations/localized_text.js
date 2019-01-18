export default (texts, locale, id, args) => {
  if (!locale) {
    console.warn(`Locale is missing for Text: "${id}"`)
    return id
  }

  const textObject = texts[id]
  if (!textObject) {
    console.warn(`Missing Text ID: "${id}"`)
    return id
  }

  let localizedText = textObject[locale]
  if (!localizedText && locale.length === 5) {
    localizedText = textObject[locale.substring(0, 2)]
  }

  let text = localizedText || id
  if (args) {
    for (let key of Object.keys(args)) {
      text = text.split(`%{${key}}`).join(args[key])
    }
  }
  return text
}
