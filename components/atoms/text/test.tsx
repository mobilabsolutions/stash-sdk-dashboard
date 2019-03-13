/* eslint-env jest */

import { testRender } from '../../../test_utils'

import Title from './title'

import H1 from './h1'
import H2 from './h2'
import H3 from './h3'
import H4 from './h4'

import ActiveH1 from './h1_active'
import ActiveH2 from './h2_active'
import ActiveH3 from './h3_active'
import ActiveH4 from './h4_active'

import Body from './body'
import LargeBody from './body_large'
import PlusBody from './body_plus'
import SmallBody from './body_small'

import Warning from './warning'

it('Title Should render', () => testRender(Title))

it('H1 Should render', () => testRender(H1))
it('H2 Should render', () => testRender(H2))
it('H3 Should render', () => testRender(H3))
it('H4 Should render', () => testRender(H4))

it('ActiveH1 Should render', () => testRender(ActiveH1))
it('ActiveH2 Should render', () => testRender(ActiveH2))
it('ActiveH3 Should render', () => testRender(ActiveH3))
it('ActiveH4 Should render', () => testRender(ActiveH4))

it('Body Should render', () => testRender(Body))
it('LargeBody Should render', () => testRender(LargeBody))
it('PlusBody Should render', () => testRender(PlusBody))
it('SmallBody Should render', () => testRender(SmallBody))

it('Warning Should render', () => testRender(Warning))
