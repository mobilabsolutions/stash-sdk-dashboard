/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import SecondaryButton from './secondary'

const TestButton = withTestSetup(SecondaryButton)

it('SecondaryButton Should Render', () => {
  const component = renderer.create(<TestButton label="Login" />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('Disabled SecondaryButton Should Render', () => {
  const component = renderer.create(<TestButton label="Disabled" disabled />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
