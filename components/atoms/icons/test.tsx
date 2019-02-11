/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import DownIcon from './down'
import UpIcon from './up'

const TestDownIcon = withTestSetup(DownIcon)
const TestUpIcon = withTestSetup(UpIcon)

it('Down Icon Should Render', () => {
  const component = renderer.create(<TestDownIcon />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('UpIcon Should Render', () => {
  const component = renderer.create(<TestUpIcon />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
