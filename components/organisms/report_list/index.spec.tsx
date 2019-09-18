import ReportList from './index'
import { testRender, deepRender } from '../../../test_utils'

describe('Report list', () => {
  test('should show empty list', () => {
    testRender(ReportList, {
      reportList: []
    })
  })
  test('should display list of reports', () => {
    testRender(ReportList, {
      reportList: [
        {
          filterName: 'First report 10-12-2020'
        },
        {
          filterName: 'Second report 10-12-2020'
        },
        {
          filterName: 'Chargebacks report May'
        },
        {
          filterName: 'My default report'
        }
      ]
    })
  })
  test('should trigger download', () => {
    const downloadReport = jest.fn()
    const { getAllByText } = deepRender(ReportList, {
      reportList: [
        {
          filterName: 'First report 10-12-2020'
        },
        {
          filterName: 'Second report 10-12-2020'
        },
        {
          filterName: 'Chargebacks report May'
        }
      ],
      downloadReport
    })
    getAllByText('Download CSV')[1].click()
    expect(downloadReport).toBeCalledWith('Second report 10-12-2020')
  })
  test('should trigger deletion', () => {
    const deleteReport = jest.fn()
    const { getAllByText } = deepRender(ReportList, {
      reportList: [
        {
          filterName: 'First report 10-12-2020'
        },
        {
          filterName: 'Second report 10-12-2020'
        },
        {
          filterName: 'Chargebacks report May'
        }
      ],
      deleteReport
    })
    getAllByText('Delete Report')[1].click()
    expect(deleteReport).toBeCalledWith('Second report 10-12-2020')
  })
})
