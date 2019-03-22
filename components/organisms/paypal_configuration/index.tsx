import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { PspConfig } from '../../types'
import { H3, AccountIcon, KeyIcon, PrimaryButton } from '../../atoms'
import { IconInput } from '../../molecules'
import PageForm from '../page_form'
import styled from '../../styled'

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

export default function PaypalConfiguration(props: FormikProps<PspConfig>) {
  const { getText } = useLocalization()

  return (
    <PageForm
      title={getText('Paypal Configuration')}
      handleSubmit={props.handleSubmit}
    >
      <LeftRight>
        <div className="left">
          <Field
            name="paypalPublicKey"
            render={({ field, form }) => (
              <>
                <H3>{getText('Public Key')}</H3>
                <IconInput
                  field={field}
                  form={form}
                  icon={<AccountIcon />}
                  placeholder={getText('Public Key')}
                />
              </>
            )}
          />
          <Field
            name="paypalPrivateKey"
            render={({ field, form }) => (
              <>
                <H3>{getText('Private Key')}</H3>
                <IconInput
                  field={field}
                  form={form}
                  icon={<KeyIcon />}
                  placeholder={getText('Private Key')}
                />
              </>
            )}
          />
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
