/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import PrimaryButton from './primary'

const TestButton = withTestSetup(PrimaryButton)

it('PrimaryButton Should Render', () => {
  const component = renderer.create(<TestButton label="Login" />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('Disabled PrimaryButton Should Render', () => {
  const component = renderer.create(<TestButton label="Disabled" disabled />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
