import Router from 'next/router'

import { Page, Filter, Transactions } from '../components/templates'
import { useTransactions } from '../hooks'

export default () => {
  const { data, error, startDate, endDate, setRange } = useTransactions()

  if (error && error.statusCode === 401) {
    Router.push('/login')
    return null
  }

  return (
    <Page activePath="/">
      <Filter startDate={startDate} endDate={endDate} setRange={setRange} />
      <Transactions data={data} />
    </Page>
  )
}
