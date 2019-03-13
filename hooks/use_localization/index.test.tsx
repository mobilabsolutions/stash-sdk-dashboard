/* eslint-env jest */

import { useLocalization } from './index'
import { testRender } from '../../test_utils'

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
