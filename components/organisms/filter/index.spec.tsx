import { testRender, deepRender } from '../../../test_utils'
import Filter from './index'
import moment from 'moment'
import { fireEvent } from 'react-testing-library'

describe('Filter Selects', () => {
  test('should not use "" value', () => {
    testRender(Filter, {
      startDate: null,
      endDate: null,
      status: '',
      paymentMethod: '',
      setText: jest.fn(),
      text: ''
    })
  })

  test('should use "all" value', () => {
    testRender(Filter, {
      startDate: null,
      endDate: null,
      status: 'all',
      paymentMethod: 'all',
      setText: jest.fn(),
      text: ''
    })
  })
})

describe('Clear filter btn', () => {
  test('should not be displayed if nothing is filtered', () => {
    const { queryByText } = deepRender(Filter, {
      startDate: null,
      endDate: null,
      status: '',
      paymentMethod: '',
      setText: jest.fn(),
      text: ''
    })
    expect(queryByText('Clear Filters')).toBeNull()
  })
  test('should be displayed if we filter by "All" in Selects', () => {
    const { queryByText } = deepRender(Filter, {
      startDate: null,
      endDate: null,
      status: 'all',
      paymentMethod: 'all',
      setText: jest.fn(),
      text: ''
    })
    expect(queryByText('Clear Filters')).toBeDefined()
  })
  test('should be displayed if we filter by text', () => {
    const { queryByText } = deepRender(Filter, {
      startDate: null,
      endDate: null,
      status: '',
      paymentMethod: '',
      setText: jest.fn(),
      text: 'master card'
    })
    expect(queryByText('Clear Filters')).toBeDefined()
  })
  test('should be displayed if we filter dates', () => {
    const { queryByText } = deepRender(Filter, {
      startDate: moment(),
      endDate: moment(),
      status: '',
      paymentMethod: '',
      setText: jest.fn(),
      text: ''
    })
    expect(queryByText('Clear Filters')).toBeDefined()
  })
  test('should fire "clearFilters"', () => {
    const clearFilters = jest.fn()
    const { queryByText } = deepRender(Filter, {
      startDate: moment(),
      endDate: moment(),
      status: '',
      paymentMethod: '',
      setText: jest.fn(),
      clearFilters,
      text: 'master card'
    })
    fireEvent(
      queryByText('Clear Filters'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    )
    expect(clearFilters).toBeCalled()
  })
})
