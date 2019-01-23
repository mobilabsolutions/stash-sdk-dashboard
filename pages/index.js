import Router from 'next/router'

import { Page, Filter, Transactions } from '../components/templates'
import { Pagination } from '../components/molecules'
import { useTransactions } from '../hooks'

export default () => {
  const {
    data,
    error,
    startDate,
    endDate,
    setRange,
    selectedPage,
    numberOfPages,
    setPage,
    status,
    setStatus,
    token,
    isLoading
  } = useTransactions()
  if (!token) {
    Router.push('/login')
    return null
  }

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
        status={status}
        setStatus={setStatus}
      />
      <Transactions data={data} isLoading={isLoading} />
      <Pagination
        numberOfPages={numberOfPages}
        selectedPage={selectedPage}
        onSelectPage={setPage}
      />
    </Page>
  )
}
