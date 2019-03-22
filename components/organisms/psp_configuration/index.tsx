import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { PspConfig, PspType } from '../../types'
import { H3, AccountIcon, KeyIcon, PrimaryButton } from '../../atoms'
import { IconInput, RadioGroup } from '../../molecules'
import PageForm from '../page_form'
import styled from '../../styled'

const FieldWrapper = styled.div`
  margin-top: 24px;
`

const LeftRight = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  > .left {
    display: flex;
    flex: 3;
    flex-direction: column;
  }
  > .right {
    display: flex;
    flex: 0;
    flex-direction: column;
    padding-top: 12px;
  }
`

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
      <LeftRight>
        <div className="left">
          <Field
            name="type"
            render={({ field, form }) => (
              <>
                <H3>{getText('PSP')}</H3>
                <RadioGroup field={field} form={form} items={pspTypes} />
              </>
            )}
          />
          {props.values.type === PspType.BS_PAYONE && (
            <FieldWrapper>
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
            </FieldWrapper>
          )}
          {props.values.type === PspType.ADYEN && (
            <FieldWrapper>
              <Field
                name="adyenUsername"
                render={({ field, form }) => (
                  <>
                    <H3>{getText('Username')}</H3>
                    <IconInput
                      field={field}
                      form={form}
                      icon={<KeyIcon />}
                      placeholder={getText('Username')}
                    />
                  </>
                )}
              />
              <Field
                name="adyenPassword"
                render={({ field, form }) => (
                  <>
                    <H3>{getText('Password')}</H3>
                    <IconInput
                      field={field}
                      form={form}
                      icon={<AccountIcon />}
                      placeholder={getText('Password')}
                    />
                  </>
                )}
              />
            </FieldWrapper>
          )}
        </div>
        <div className="right">
          <PrimaryButton
            label={getText('Save')}
            isFullSize={false}
            disabled={!props.isValid || !props.dirty}
          />
        </div>
      </LeftRight>
    </PageForm>
  )
}
