/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import Link from './index'

const TestLink = withTestSetup(Link)

it('Link Should Render', () => {
  const component = renderer.create(
    <TestLink label="Login" href="https://google.com" />
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
