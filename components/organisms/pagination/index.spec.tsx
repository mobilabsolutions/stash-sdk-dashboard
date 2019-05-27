import { testRender } from '../../../test_utils'
// import { shallow, mount } from 'enzyme'
import Pagination from './index'

it('Pagination Should Render', () =>
  testRender(Pagination, {
    page: 0,
    pageSize: 100,
    pages: 10,
    ofText: 'of',
    pageSizeOptions: [50, 20, 100],
    rowsSelectorText: 'rows per page',
    totalCount: 1000
  }))

it('Pagination Should Render final page properly', () =>
  testRender(Pagination, {
    page: 9,
    pageSize: 100,
    pages: 10,
    ofText: 'of',
    pageSizeOptions: [50, 20, 100],
    rowsSelectorText: 'rows per page',
    totalCount: 970
  }))
