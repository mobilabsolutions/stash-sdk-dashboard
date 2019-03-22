import { Field, FormikProps } from 'formik'

import { useLocalization } from '../../../hooks'
import { ChangePasswordProps } from '../../types'
import { H3, KeyIcon, PrimaryButton } from '../../atoms'
import { IconPasswordInput } from '../../molecules'
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

export default function ChangePassword(
  props: FormikProps<ChangePasswordProps>
) {
  const { getText } = useLocalization()

  return (
    <PageForm title={getText('Account')} handleSubmit={props.handleSubmit}>
      <LeftRight>
        <div className="left">
          <Field
            name="oldPassword"
            render={({ field, form }) => (
              <>
                <H3>{getText('Old Password')}</H3>
                <IconPasswordInput
                  field={field}
                  form={form}
                  icon={<KeyIcon />}
                  placeholder={getText('Old Password')}
                />
              </>
            )}
          />
          <Field
            name="newPassword"
            render={({ field, form }) => (
              <>
                <H3>{getText('New Password')}</H3>
                <IconPasswordInput
                  field={field}
                  form={form}
                  icon={<KeyIcon />}
                  placeholder={getText('New Password')}
                />
              </>
            )}
          />
          <Field
            name="newPasswordRetype"
            render={({ field, form }) => (
              <>
                <H3>{getText('Confirm new Password')}</H3>
                <IconPasswordInput
                  field={field}
                  form={form}
                  icon={<KeyIcon />}
                  placeholder={getText('Confirm new Password')}
                />
              </>
            )}
          />
        </div>
        <div className="right">
          <PrimaryButton
            label={getText('Update Password')}
            isFullSize={false}
            disabled={!props.isValid || !props.dirty}
          />
        </div>
      </LeftRight>
    </PageForm>
  )
}
