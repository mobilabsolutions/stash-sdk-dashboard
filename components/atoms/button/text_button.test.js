/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import { withTestSetup } from '../../../test_utils'
import TextButton from './text_button'

const TestTextButton = withTestSetup(TextButton)

it('TextButton Should Render', () => {
  const component = renderer.create(
    <TestTextButton>Sample Text</TestTextButton>
  )
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
