/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import Logo from './logo'
import AccountIcon from './account'
import KeyIcon from './key'
import CopyIcon from './copy'
import DownIcon from './down'
import UpIcon from './up'

const TestLogo = withTestSetup(Logo)
const TestAccountIcon = withTestSetup(AccountIcon)
const TestKeyIcon = withTestSetup(KeyIcon)
const TestCopyIcon = withTestSetup(CopyIcon)
const TestDownIcon = withTestSetup(DownIcon)
const TestUpIcon = withTestSetup(UpIcon)

it('Logo Should Render', () => {
  const component = renderer.create(<TestLogo />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('AccountIcon Should Render', () => {
  const component = renderer.create(<TestAccountIcon />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('KeyIcon Should Render', () => {
  const component = renderer.create(<TestKeyIcon />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('CopyIcon Should Render', () => {
  const component = renderer.create(<TestCopyIcon />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('UpIconIcon Should Render', () => {
  const component = renderer.create(<TestUpIcon />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('DownIcon Should Render', () => {
  const component = renderer.create(<TestDownIcon />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
