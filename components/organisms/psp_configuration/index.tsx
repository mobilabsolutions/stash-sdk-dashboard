import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { PspConfig, PspType } from '../../types'
import { H2, H4 } from '../../atoms'
import { RadioGroup } from '../../molecules'
import PageForm from '../page_form'

export default function PspConfiguration(props: FormikProps<PspConfig>) {
  const { getText } = useLocalization()
  const pspTypes = Object.keys(PspType).map(key => ({
    value: key,
    label: getText(key)
  }))

  return (
    <PageForm
      title={getText('PSP Configuration')}
      handleSubmit={props.handleSubmit}
    >
      <Field
        name="type"
        render={({ field, form }) => (
          <RadioGroup field={field} form={form} items={pspTypes} />
        )}
      />
      <H2>{getText('Welcome')}</H2>
      <H4>{getText('Login to your account')}</H4>
    </PageForm>
  )
}
