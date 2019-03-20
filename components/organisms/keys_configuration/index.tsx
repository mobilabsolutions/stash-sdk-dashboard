import styled from '../../styled'
import { H3, KeyIcon, CopyIcon, DeleteIcon, Body } from '../../atoms'
import { useLocalization } from '../../../hooks'
import PageForm from '../page_form'

const PublicKeyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
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
  type: string
  name: string
  key?: string
}

interface KeysConfigurationProps {
  keys: KeyEntity[]
}

export default function KeysConfiguration({ keys }: KeysConfigurationProps) {
  const { getText } = useLocalization()

  const publicKeys = keys.filter(item => item.type === 'PUBLIC')
  // const privateKeys = keys.filter(item => item.type === 'PRIVATE')

  return (
    <PageForm title={getText('Keys')}>
      <div>
        <H3>{getText('Public Keys')}</H3>
        {publicKeys.map((keyEntity: any, index: number) => (
          <PublicKeyWrapper key={index}>
            <KeyIcon />
            <Body>{keyEntity.key}</Body>
            <CopyIcon onClick={() => copyToClipboard(keyEntity.key)} />
            <DeleteIcon />
          </PublicKeyWrapper>
        ))}
      </div>
      <div />
    </PageForm>
  )
}
