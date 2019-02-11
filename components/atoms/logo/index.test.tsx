/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import Logo from './index'

const TestLogo = withTestSetup(Logo)

it('Logo Should Render', () => {
  const component = renderer.create(<TestLogo />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
