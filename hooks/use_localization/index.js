import texts from '../../assets/texts'
import { useNextContext } from '../use_next_context'
import localizedNumber from './localized_number'
import localizedText from './localized_text'

export const useLocalization = () => {
  const { locale } = useNextContext()

  return {
    locale,
    getText: (id, args) => localizedText(texts, locale, id, args),
    formatNumber: value => localizedNumber(value, locale)
  }
}
