/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import H1 from './h1'
import H2 from './h2'

const TestH1 = withTestSetup(H1)
const TestH2 = withTestSetup(H2)

it('H1 Should Render', () => {
  const component = renderer.create(<TestH1>Heading 1</TestH1>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('H2 Should Render', () => {
  const component = renderer.create(<TestH2>Heading 2</TestH2>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
