/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../test'
import H1 from './h1'
import H2 from './h2'
import H3 from './h3'
import H4 from './h4'
import H5 from './h5'

const TestH1 = withTestSetup(H1)
const TestH2 = withTestSetup(H2)
const TestH3 = withTestSetup(H3)
const TestH4 = withTestSetup(H4)
const TestH5 = withTestSetup(H5)

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

it('H3 Should Render', () => {
  const component = renderer.create(<TestH3>Heading 3</TestH3>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('H4 Should Render', () => {
  const component = renderer.create(<TestH4>Heading 4</TestH4>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

it('H5 Should Render', () => {
  const component = renderer.create(<TestH5>Heading 5</TestH5>)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
