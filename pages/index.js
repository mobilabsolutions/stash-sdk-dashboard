import Router from 'next/router'

import { Page, Filter, Transactions } from '../components/templates'
import { useTransactions } from '../hooks'

export default () => {
  const {
    data,
    error,
    startDate,
    endDate,
    setRange,
    startPos,
    pageSize,
    setStartPos,
    totalCount
  } = useTransactions()

  if (error && error.statusCode === 401) {
    Router.push('/login')
    return null
  }

  return (
    <Page activePath="/">
      <Filter
        startDate={startDate}
        endDate={endDate}
        setRange={setRange}
        startPos={startPos}
        pageSize={pageSize}
        totalCount={totalCount}
        setStartPos={setStartPos}
      />
      <Transactions data={data} />
    </Page>
  )
}
