/* eslint-env jest */

import { testRender } from '../../../test_utils'
import PrimaryButton from './primary'
import SecondaryButton from './secondary'
import WarnButton from './warn'

it('PrimaryButton Should Render', () =>
  testRender(PrimaryButton, { lable: 'Login' }))

it('Disabled PrimaryButton Should Render', () =>
  testRender(PrimaryButton, { lable: 'Disabled', disabled: true }))

it('Full size PrimaryButton Should Render', () =>
  testRender(PrimaryButton, { lable: 'Disabled', isFullSize: true }))

it('SecondaryButton Should Render', () =>
  testRender(SecondaryButton, { lable: 'Cancel' }))

it('Disabled PrimaryButton Should Render', () =>
  testRender(SecondaryButton, { lable: 'Cancel', disabled: true }))

it('WarnButton Should Render', () =>
  testRender(WarnButton, { lable: 'Cancel' }))

it('Disabled WarnButton Should Render', () =>
  testRender(WarnButton, { lable: 'Cancel', disabled: true }))
