import { useLocalization } from '../../../hooks'
import PageForm from '../page_form'

export default function PspConfiguration() {
  const { getText } = useLocalization()

  return (
    <PageForm
      title={getText('PSP configuration')}
      handleSubmit={() => console.log('Hallo')}
    >
      <div>Hallo</div>
    </PageForm>
  )
}
