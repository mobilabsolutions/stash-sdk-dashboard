import styled from '../../styled'
import {
  H3,
  KeyIcon,
  CopyIcon,
  DeleteIcon,
  Body,
  PrimaryButton
} from '../../atoms'
import { useLocalization, useToast } from '../../../hooks'
import PageForm from '../page_form'

const KeysWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`

const KeyWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  > span {
    margin-left: 24px;
    margin-right: 24px;
    display: block;
    min-width: 250px;
  }
  .key {
    min-width: 265px;
  }
  .name {
    min-width: 288px;
  }
  > svg:not(:first-child) {
    cursor: pointer;
  }
  > svg:last-child {
    margin-left: 24px;
  }
`

const copyToClipboard = (text: string) => {
  const tempElement = document.createElement('textarea')
  tempElement.value = text
  tempElement.setAttribute('readonly', '')
  tempElement.style.position = 'absolute'
  tempElement.style.left = '-9999px'
  document.body.appendChild(tempElement)
  tempElement.select()
  document.execCommand('copy')
  document.body.removeChild(tempElement)
}

interface KeyEntity {
  id: number
  type: string
  name: string
  key?: string
}

interface KeysConfigurationProps {
  keys: KeyEntity[]
  onDelete: (key: KeyEntity) => void
  onCreate: (type: string, name?: string) => void
}

export default function KeysConfiguration({
  keys,
  onDelete,
  onCreate
}: KeysConfigurationProps) {
  const { getText } = useLocalization()
  const { success: toastSuccess } = useToast()

  const publicKeys = keys.filter(item => item.type === 'PUBLIC')
  const privateKeys = keys.filter(item => item.type === 'PRIVATE')

  return (
    <PageForm title={getText('Keys')}>
      <div>
        <H3>{getText('Public Keys')}</H3>
        <KeysWrapper>
          {publicKeys.length === 0 ? (
            <Body>{getText('there is no public key generated yet')}</Body>
          ) : (
            publicKeys.map(keyEntity => (
              <KeyWrapper key={keyEntity.id}>
                <KeyIcon />
                <Body className="key">{keyEntity.key}</Body>
                <CopyIcon
                  onClick={() => {
                    copyToClipboard(keyEntity.key)
                    toastSuccess(getText('Key Copied'))
                  }}
                />
                <DeleteIcon onClick={() => onDelete(keyEntity)} />
              </KeyWrapper>
            ))
          )}
        </KeysWrapper>
        <PrimaryButton
          type="button"
          label={getText('Create a new Public Key')}
          onClick={() => onCreate('PUBLIC')}
        />
      </div>
      <div style={{ marginTop: '32px' }}>
        <H3>{getText('Private Keys')}</H3>
        <KeysWrapper>
          {privateKeys.length === 0 ? (
            <Body>{getText('there is no private key generated yet')}</Body>
          ) : (
            privateKeys.map(keyEntity => (
              <KeyWrapper key={keyEntity.id}>
                <KeyIcon />
                <Body className={keyEntity.key ? 'key' : 'name'}>
                  {keyEntity.key || keyEntity.name}
                </Body>
                {keyEntity.key && (
                  <CopyIcon onClick={() => copyToClipboard(keyEntity.key)} />
                )}
                <DeleteIcon onClick={() => onDelete(keyEntity)} />
                {keyEntity.key && (
                  <Body>
                    {getText(
                      'Copy this key now because it cannot be recovered in the future.'
                    )}
                  </Body>
                )}
              </KeyWrapper>
            ))
          )}
        </KeysWrapper>
        <PrimaryButton
          type="button"
          label={getText('Create a new Private Key')}
          onClick={() => onCreate('PRIVATE')}
        />
      </div>
    </PageForm>
  )
}
