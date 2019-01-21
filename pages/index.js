import Router from 'next/router'

import { Page } from '../components/templates'
import { useLocalization, useTransactions } from '../hooks'

export default () => {
  const { getText } = useLocalization()
  const { data, error } = useTransactions()

  if (error && error.statusCode === 401) {
    Router.push('/login')
    return null
  }

  return (
    <Page activePath="/">
      <span>{getText('Welcome')}</span>
      <div>
        {data &&
          data.map((row, index) => (
            <span key={index}>{JSON.stringify(row)}</span>
          ))}
      </div>
    </Page>
  )
}
