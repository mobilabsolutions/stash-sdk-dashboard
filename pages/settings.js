import { useLocalization } from '../hooks'
import { Page } from '../components/templates'

export default () => {
  const { getText } = useLocalization()

  return (
    <Page activePath="/settings">
      <span>{getText('Settings')}</span>
    </Page>
  )
}
