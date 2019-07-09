import { Page } from '../components/organisms'
import { AccountForm } from '../components/templates'
import { useState } from 'react'

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Page activePath="/account" isLoading={isLoading}>
      <AccountForm setIsLoading={setIsLoading} />
    </Page>
  )
}
