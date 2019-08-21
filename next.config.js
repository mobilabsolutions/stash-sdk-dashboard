const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')

module.exports = withTypescript({
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60, // 1h
    pagesBufferLength: 10
  },
  publicRuntimeConfig: {
    API_UPSTREAM: (process.env.API_UPSTREAM || '').replace(
      'payment-sdk-backend',
      ''
    )
  },
  ...withCSS()
})
