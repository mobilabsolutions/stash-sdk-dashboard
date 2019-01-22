import texts from '../../assets/texts'
import { useNextContext } from '../use_next_context'
import localizedAmount from './localized_amount'
import localizedNumber from './localized_number'
import localizedDate from './localized_date'
import localizedText from './localized_text'

export const useLocalization = () => {
  const { locale } = useNextContext()

  return {
    locale,
    getText: (id, args) => localizedText(texts, locale, id, args),
    formatAmount: (currencyId, value) =>
      localizedAmount(currencyId, value, locale),
    formatNumber: value => localizedNumber(value, locale),
    formatDate: value => localizedDate(value, locale)
  }
}
