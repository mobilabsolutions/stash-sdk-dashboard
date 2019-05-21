import { testRender } from '../../../test_utils'
// import { shallow, mount } from 'enzyme'
import CaptureForm from './index'

it('CaptureForm Should Render', () => testRender(CaptureForm, {}))

it('CaptureForm Should use loading status', () =>
  testRender(CaptureForm, {
    isLoading: true
  }))
