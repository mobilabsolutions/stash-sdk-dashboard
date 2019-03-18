import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { PspConfig, PspType } from '../../types'
import { H3, AccountIcon, KeyIcon } from '../../atoms'
import { IconInput, RadioGroup } from '../../molecules'
import PageForm from '../page_form'

export default function PspConfiguration(props: FormikProps<PspConfig>) {
  const { getText } = useLocalization()
  const pspTypes = Object.values(PspType)
    .filter(value => value !== PspType.BRAINTREE)
    .map(value => ({
      value,
      label: getText(value)
    }))

  return (
    <PageForm
      title={getText('PSP Configuration')}
      handleSubmit={props.handleSubmit}
    >
      <Field
        name="type"
        render={({ field, form }) => (
          <>
            <H3>{getText('PSP')}</H3>
            <RadioGroup field={field} form={form} items={pspTypes} />
          </>
        )}
      />
      <Field
        name="bsAccountId"
        render={({ field, form }) => (
          <>
            <H3>{getText('Account Id')}</H3>
            <IconInput
              field={field}
              form={form}
              icon={<AccountIcon />}
              placeholder={getText('Account Id')}
            />
          </>
        )}
      />
      <Field
        name="bsPortalId"
        render={({ field, form }) => (
          <>
            <H3>{getText('Portal Id')}</H3>
            <IconInput
              field={field}
              form={form}
              icon={<AccountIcon />}
              placeholder={getText('Portal Id')}
            />
          </>
        )}
      />
      <Field
        name="bsKey"
        render={({ field, form }) => (
          <>
            <H3>{getText('Key')}</H3>
            <IconInput
              field={field}
              form={form}
              icon={<KeyIcon />}
              placeholder={getText('Key')}
            />
          </>
        )}
      />
    </PageForm>
  )
}
