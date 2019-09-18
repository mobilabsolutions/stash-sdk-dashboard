import { GlobalWithFetchMock } from 'jest-fetch-mock'
const moment = require('moment-timezone')

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock
customGlobal.fetch = require('jest-fetch-mock')
customGlobal.fetchMock = customGlobal.fetch

jest.doMock('moment', () => {
  moment.tz.setDefault('Europe/Berlin') // Fixed timezone for testing
  return moment
})
