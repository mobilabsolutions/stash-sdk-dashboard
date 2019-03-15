import { FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { H2, H4 } from '../../atoms'
import PageForm from '../page_form'

interface PspConfigurationProps {}

export default function PspConfiguration(
  props: FormikProps<PspConfigurationProps>
) {
  const { getText } = useLocalization()
  return (
    <PageForm
      title={getText('PSP Configuration')}
      handleSubmit={props.handleSubmit}
    >
      <H2>{getText('Welcome')}</H2>
      <H4>{getText('Login to your account')}</H4>
    </PageForm>
  )
}
