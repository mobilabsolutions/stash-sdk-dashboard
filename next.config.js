const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60, // 1h
    pagesBufferLength: 10
  }
})
