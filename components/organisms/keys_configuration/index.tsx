import styled from '../../styled'
import {
  H3,
  KeyIcon,
  CopyIcon,
  DeleteIcon,
  Body,
  PrimaryButton
} from '../../atoms'
import { useLocalization } from '../../../hooks'
import PageForm from '../page_form'

const KeysWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`

const PublicKeyWrapper = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  > span {
    margin-left: 8px;
    margin-right: 8px;
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

  const publicKeys = keys.filter(item => item.type === 'PUBLIC')
  // const privateKeys = keys.filter(item => item.type === 'PRIVATE')

  return (
    <PageForm title={getText('Keys')}>
      <div>
        <H3>{getText('Public Keys')}</H3>
        <KeysWrapper>
          {publicKeys.map(keyEntity => (
            <PublicKeyWrapper key={keyEntity.id}>
              <KeyIcon />
              <Body>{keyEntity.key}</Body>
              <CopyIcon onClick={() => copyToClipboard(keyEntity.key)} />
              <DeleteIcon onClick={() => onDelete(keyEntity)} />
            </PublicKeyWrapper>
          ))}
        </KeysWrapper>
        <PrimaryButton
          type="button"
          label={getText('Create a new Public Key')}
          onClick={() => onCreate('PUBLIC')}
        />
      </div>
      <div />
    </PageForm>
  )
}
