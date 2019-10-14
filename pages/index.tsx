import { Page, HomeDashboard } from '../components/organisms'

import { useTokenCheck } from '../hooks'
import { ScrollMargin } from '../components/atoms'

export default () => {
  useTokenCheck()
  return (
    <Page activePath="/">
      <ScrollMargin>
        <HomeDashboard />
      </ScrollMargin>
    </Page>
  )
}
