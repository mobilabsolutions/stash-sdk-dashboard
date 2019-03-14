import { Page } from '../components/organisms'
import { useTokenCheck } from '../hooks'

export default () => {
  useTokenCheck()

  return (
    <Page activePath="/reports">
      <div>Report Page</div>
    </Page>
  )
}
