/* eslint-env jest */

import { testRender } from '../../../test_utils'

import AccountIcon from './account'
import CopyIcon from './copy'
import DownIcon from './down'
import Illustration from './illustration'
import KeyIcon from './key'
import Logo from './logo'
import UpIcon from './up'
import VisibilityIcon from './visibility'
import InvisibilityIcon from './invisibility'

it('Logo Should Render', () => testRender(Logo))
it('Illustration Should Render', () => testRender(Illustration))
it('AccountIcon Should Render', () => testRender(AccountIcon))
it('KeyIcon Should Render', () => testRender(KeyIcon))
it('CopyIcon Should Render', () => testRender(CopyIcon))
it('DownIcon Should Render', () => testRender(DownIcon))
it('UpIcon Should Render', () => testRender(UpIcon))
it('VisibilityIcon Should Render', () => testRender(VisibilityIcon))
it('InvisibilityIcon Should Render', () => testRender(InvisibilityIcon))
