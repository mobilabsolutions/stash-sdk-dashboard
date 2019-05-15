/* eslint-env jest */

import { useLocalization } from './index'
import { testRender } from '../../test_utils'
import localizedAmount from './localized_amount'

const PaymentDashboard = () => {
  const { getText } = useLocalization()

  return <span>{getText('Payment Dashboard')}</span>
}

it('Should "getText" in "en"', () => testRender(PaymentDashboard))
it('Should "getText" in "de"', () =>
  testRender(PaymentDashboard, null, { locale: 'de' }))

const Number = () => {
  const { formatNumber } = useLocalization()

  return <span>{formatNumber(123.45)}</span>
}

it('Should "formatNumber" in "en"', () => testRender(Number))
it('Should "formatNumber" in "de"', () =>
  testRender(Number, null, { locale: 'de' }))

const Amount = () => {
  const { formatAmount } = useLocalization()

  return <span>{formatAmount('EUR', 12345).value}</span>
}
it('Should "formatAmount" in "en"', () => testRender(Amount))
it('Should "formatAmount" in "de"', () =>
  testRender(Amount, null, { locale: 'de' }))

it('"localizedAmount" should return all properties for a currency', () => {
  expect(localizedAmount('EUR', 12345, 'de')).toMatchSnapshot()
  expect(localizedAmount('EUR', 12345, 'en')).toMatchSnapshot()
})
