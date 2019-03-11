import { Page } from '../components/templates'

import { useTokenCheck } from '../hooks'

export default () => {
  useTokenCheck()

  return (
    <Page activePath="/">
      <div>Home Page</div>
    </Page>
  )
}
