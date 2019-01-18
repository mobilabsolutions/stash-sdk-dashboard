/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { useLocalization } from './index'
import { withTestSetup } from '../../test_utils'

const PaymentDashboard = () => {
  const { getText } = useLocalization()

  return <span>{getText('Payment Dashboard')}</span>
}

it('Should "getText" in "en"', () => {
  const TestComponent = withTestSetup(PaymentDashboard)

  const component = renderer.create(<TestComponent />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('Should "getText" in "de"', () => {
  const TestComponent = withTestSetup(PaymentDashboard, 'de')

  const component = renderer.create(<TestComponent />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

const Number = () => {
  const { formatNumber } = useLocalization()

  return <span>{formatNumber(123.45)}</span>
}

it('Should "formatNumber" in "en"', () => {
  const TestComponent = withTestSetup(Number)

  const component = renderer.create(<TestComponent />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('Should "formatNumber" in "de"', () => {
  const TestComponent = withTestSetup(Number, 'de')

  const component = renderer.create(<TestComponent />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
