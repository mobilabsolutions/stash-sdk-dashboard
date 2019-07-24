import { useLocalization } from '../../../hooks'
import { PspType } from '../../types'
import { PageTitleSection } from '../page_form'
import styled from '../../styled'
import { PSP } from '../../../types/psp'
import { useState } from 'react'
import PspFormList from './psp_form_list'
import PspCreateForm from './psp_create_form'

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 ${props => props.theme.shade.A50};
  padding: 16px;
`
interface Props {
  pspList: Array<PSP>
  onCreatePsp: (id: string, psp: PSP) => Promise<{ result: PSP }>
  onDeletePsp: (id: string) => Promise<{ statusCode: number }>
  onUpdatePsp: (id: string, psp: PSP) => Promise<{ result: PSP }>
}

export const useApi = (
  promise: (...p: any[]) => Promise<{ result: PSP } | { statusCode: number }>,
  onSuccess?: (r?: any) => void,
  onError?: (err?: any) => void
): { isloading: boolean; error: any; action: (...p: any[]) => void } => {
  const [state, setState] = useState({ isloading: false, error: false })

  const action = (...p: any[]) => {
    setState({ isloading: true, error: false })
    promise(...p)
      .then(r => {
        setState({ isloading: false, error: false })
        !!onSuccess && onSuccess(r)
      })
      .catch(e => {
        setState({ isloading: false, error: true })
        !!onError && onError(e)
      })
  }
  return {
    ...state,
    action
  }
}
const allPsps = Object.keys(PspType).map(key => PspType[key])

export default function PspConfiguration(props: Props) {
  const { getText } = useLocalization()
  const { pspList = [], onDeletePsp, onUpdatePsp, onCreatePsp } = props

  const pspsToCreate = allPsps
    .filter(psp => pspList.findIndex(p => p.type === psp) == -1)
    .map(psp => ({ label: getText(psp), value: psp }))

  return (
    <PageTitleSection title={getText('PSP Configuration')}>
      <ContentWrapper>
        <PspFormList
          pspList={pspList}
          onUpdatePsp={onUpdatePsp}
          onDeletePsp={onDeletePsp}
        />

        <PspCreateForm pspsToCreate={pspsToCreate} onCreatePsp={onCreatePsp} />
      </ContentWrapper>
    </PageTitleSection>
  )
}
