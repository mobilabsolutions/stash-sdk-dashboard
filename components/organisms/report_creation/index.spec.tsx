import ReportCreation from './index'
import { testRender, deepRender } from '../../../test_utils'

jest.mock('moment', () => {
  //Mock moment to alway get the same date, should be improved
  function mm() {
    const date = {
      hour: 10,
      day: 15
    }
    return {
      chageTime: () => {},
      hour: () => date.hour,
      format: () => '20190916',
      day: () => date.day
    }
  }
  mm.defineLocale = jest.fn()
  mm.locale = jest.fn()
  return mm
})

describe('Report creation', () => {
  test('should list default reports', () => {
    testRender(ReportCreation, {
      show: true,
      onClose: jest.fn()
    })
  })
  test('should trigger dowload', () => {
    const downloadReport = jest.fn()
    const { getByText } = deepRender(ReportCreation, {
      show: true,
      downloadReport,
      onClose: jest.fn()
    })
    getByText('Transactions Monthly Overview').click()
    expect(downloadReport).toHaveBeenCalledWith(
      'Transactions Monthly Overview_20190916',
      'default',
      { reportType: 'OVERVIEW' }
    )
    getByText('Chargebacks').click()
    expect(downloadReport).toHaveBeenCalledWith(
      'Chargebacks_20190916',
      'default',
      { reportType: 'CHARGEBACK' }
    )
    getByText('Refunds Monthly Overview').click()
    expect(downloadReport).toHaveBeenCalledWith(
      'Refunds Monthly Overview_20190916',
      'default',
      { reportType: 'REFUND' }
    )
  })
})
