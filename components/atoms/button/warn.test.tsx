/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import WarnButton from './warn'

const TestButton = withTestSetup(WarnButton)

it('WarnButton Should Render', () => {
  const component = renderer.create(<TestButton label="Login" />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('Disabled WarnButton Should Render', () => {
  const component = renderer.create(<TestButton label="Disabled" disabled />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
