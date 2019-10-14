import ReportCreation from './index'
import { testRender, deepRender } from '../../../test_utils'
import { fireEvent, wait } from 'react-testing-library'

jest.mock('moment', () => {
  const moment = require.requireActual('moment')
  const mocked = () => moment('20190916')
  mocked.defineLocale = jest.fn()
  mocked.locale = jest.fn()
  mocked.isMoment = jest.fn()
  mocked.localeData = () => ({
    longDateFormat: jest.fn()
  })
  return mocked
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
    getByText('Monthly Transactions Overview').click()
    expect(downloadReport).toHaveBeenCalledWith(
      'Monthly Transactions Overview_20190916',
      'default',
      { reportType: 'OVERVIEW' }
    )
    getByText('Chargebacks Overview').click()
    expect(downloadReport).toHaveBeenCalledWith(
      'Chargebacks Overview_20190916',
      'default',
      { reportType: 'CHARGEBACK' }
    )
    getByText('Monthly Refunds Overview').click()
    expect(downloadReport).toHaveBeenCalledWith(
      'Monthly Refunds Overview_20190916',
      'default',
      { reportType: 'REFUND' }
    )
  })
})

describe('Custom reports creation', () => {
  test('should show filters for custom report', () => {
    const downloadReport = jest.fn()
    const { getByText, baseElement } = deepRender(ReportCreation, {
      show: true,
      downloadReport,
      onClose: jest.fn()
    })
    getByText('Set up your own report').click()
    expect(baseElement.firstChild).toMatchSnapshot()
  })

  test('should expand filters for custom reports', () => {
    const downloadReport = jest.fn()
    const { getByText, baseElement } = deepRender(ReportCreation, {
      show: true,
      downloadReport,
      onClose: jest.fn()
    })
    getByText('Set up your own report').click()
    getByText('Show more').click()
    getByText('Show less')
    expect(baseElement.firstChild).toMatchSnapshot()
  })

  test('should disable if not Title and one filter', async () => {
    const downloadReport = jest.fn()
    const { getByText, getByPlaceholderText } = deepRender(ReportCreation, {
      show: true,
      downloadReport,
      onClose: jest.fn()
    })
    getByText('Set up your own report').click()
    const GenerateBtn = getByText('Generate Report').parentElement

    expect(GenerateBtn.getAttribute('disabled')).toBeDefined()
    fireEvent.change(getByPlaceholderText('Report Name'), {
      target: { value: 'New Report' }
    })
    expect(GenerateBtn.getAttribute('disabled')).toBeDefined()
    fireEvent.change(getByPlaceholderText('Keyword'), {
      target: { value: 'new key word' }
    })
    await wait()
    expect(GenerateBtn.getAttribute('disabled')).toBe('')
  })

  // Skip until we update react and testing-library https://github.com/testing-library/react-testing-library/issues/281
  // it('should trigger download', async () => {
  //   jest.useFakeTimers()
  //   const downloadReport = jest.fn()
  //   const { getByText, getByPlaceholderText, baseElement } = deepRender(
  //     ReportCreation,
  //     {
  //       show: true,
  //       downloadReport,
  //       onClose: jest.fn()
  //     }
  //   )

  //   getByText('Set up your own report').click()

  //   fireEvent.change(getByPlaceholderText('Report Name'), {
  //     target: { value: 'New Report' }
  //   })
  //   //Open select menu typing on input
  //   fireEvent.change(
  //     queryByAttribute('id', baseElement, 'react-select-8-input'),
  //     {
  //       target: { value: 'a' }
  //     }
  //   )

  //   //Click first option
  //   fireEvent.click(
  //     queryByAttribute('id', baseElement, 'react-select-8-option-1')
  //   )
  //   getByText('Generate Report').parentElement.click()

  //   await wait()

  //   expect(downloadReport).toHaveBeenCalledWith('New Report', 'custom', {
  //     action: null,
  //     amount: '',
  //     createdAtEnd: null,
  //     createdAtStart: null,
  //     currency: '',
  //     customerId: '',
  //     merchantTransactionId: '',
  //     paymentMethod: 'CC',
  //     status: null,
  //     text: '',
  //     transactionId: ''
  //   })
  // })
})
