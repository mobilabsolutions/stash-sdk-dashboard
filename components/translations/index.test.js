/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { Localization } from './index'
import { withTestSetup } from '../test'

const PaymentDashboard = () => (
  <Localization>
    {({ getText }) => <span>{getText('Payment Dashboard')}</span>}
  </Localization>
)

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

const Number = () => (
  <Localization>
    {({ formatNumber }) => <span>{formatNumber(123.45)}</span>}
  </Localization>
)

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
