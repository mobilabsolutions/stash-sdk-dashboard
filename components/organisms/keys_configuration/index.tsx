import { useLocalization } from '../../../hooks'
import PageForm from '../page_form'

export default function KeysConfiguration() {
  const { getText } = useLocalization()

  return (
    <PageForm title={getText('Keys')}>
      <div />
    </PageForm>
  )
}
