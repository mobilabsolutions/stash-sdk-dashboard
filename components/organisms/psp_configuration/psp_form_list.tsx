import React from 'react'
import { PSP } from '../../../types/psp'
import PspForm from '../psp_form'
import { useLocalization, useToast } from '../../../hooks'
import { useApi } from '.'
import styled from '../../styled'
import { ToastSuccess, ToastError } from '../../molecules'

interface Props {
  pspList: Array<PSP>
  onDeletePsp: (id: string) => Promise<{ statusCode: number }>
  onUpdatePsp: (id: string, psp: PSP) => Promise<{ result: PSP }>
}

const ItemContainer = styled.div`
  padding: 16px 0px;
`

export default function PspFormList(props: Props) {
  const { pspList, onUpdatePsp, onDeletePsp } = props
  const { getText } = useLocalization()
  const { success: toastSuccess, error: toastError } = useToast()
  const {
    isloading: isUpdating,
    error: updateError,
    action: updatePsp
  } = useApi(
    onUpdatePsp,
    () => {
      toastSuccess(({ onClose }) => (
        <ToastSuccess onClose={onClose}>
          {getText('PSP configuration updated.')}
        </ToastSuccess>
      ))
    },
    () => {
      toastError(({ onClose }) => (
        <ToastError onClose={onClose}>
          {getText('An error occurred trying to update the PSP. Try again.')}
        </ToastError>
      ))
    }
  )
  const {
    isloading: isDeleting,
    error: deleteError,
    action: deletePsp
  } = useApi(
    onDeletePsp,
    () => {
      toastSuccess(getText('PSP configuration deleted.'))
    },
    () => {
      toastError(
        getText('An error occurred trying to delete the PSP. Try again.')
      )
    }
  )
  return (
    <div>
      {pspList.map((p, i) => {
        return (
          <ItemContainer key={`${p.type}-${i}`}>
            <PspForm
              psp={p}
              onDeletePsp={deletePsp}
              isUpdate={isUpdating}
              updateError={updateError}
              isDeleting={isDeleting}
              deleteError={deleteError}
              onUpdatePsp={updatePsp}
            />
          </ItemContainer>
        )
      })}
    </div>
  )
}
