/* eslint-env jest */

import { testRender } from '../../../test_utils'
import Link from './index'

it('Link Should Render', () =>
  testRender(Link, { lable: 'Login', href: 'https://google.com' }))
