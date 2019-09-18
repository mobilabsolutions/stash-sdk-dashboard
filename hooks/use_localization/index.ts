import { useCallback } from 'react'

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
    getText: useCallback(
      (id: string, args = null) => localizedText(texts, locale, id, args),
      [locale]
    ),
    formatAmount: useCallback(
      (currencyId: string, value: number) =>
        localizedAmount(currencyId, value, locale),
      [locale]
    ),
    formatNumber: useCallback(
      (value: number) => localizedNumber(value, locale),
      [locale]
    ),
    formatDate: useCallback(
      (value: Date | string) => localizedDate(value, locale),
      [locale]
    )
  }
}
