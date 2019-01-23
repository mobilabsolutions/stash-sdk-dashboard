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
    <Page activePath="/" isLoading={isLoading}>
      <Filter startDate={startDate} endDate={endDate} setRange={setRange} />
      <Transactions data={data} />
      <Pagination
        numberOfPages={numberOfPages}
        selectedPage={selectedPage}
        onSelectPage={setPage}
      />
    </Page>
  )
}
