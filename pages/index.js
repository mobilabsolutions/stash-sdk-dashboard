import Router from 'next/router'

import { Page, Transactions } from '../components/templates'
import { useTransactions } from '../hooks'

export default () => {
  const { data, error } = useTransactions()

  if (error && error.statusCode === 401) {
    Router.push('/login')
    return null
  }

  return (
    <Page activePath="/">
      <Transactions data={data} />
    </Page>
  )
}
