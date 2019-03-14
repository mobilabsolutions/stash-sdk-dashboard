import { Page } from '../components/organisms'

import { useTokenCheck } from '../hooks'

export default () => {
  useTokenCheck()

  return (
    <Page activePath="/">
      <div>Home Page</div>
    </Page>
  )
}
