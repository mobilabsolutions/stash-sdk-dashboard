import React, { useState } from 'react'
import { PSP } from '../../../types/psp'
import PspForm from '../psp_form'
import { useLocalization, useToast } from '../../../hooks'
import { useApi } from '.'
import styled from '../../styled'
import { ToastSuccess, ToastError, WarnPopup } from '../../molecules'
import { WarnButton } from '../../atoms'

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
  const [pspToDelete, setPspToDelete] = useState(null)
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
      toastSuccess(({ onClose }) => (
        <ToastSuccess onClose={onClose}>
          {getText('PSP configuration deleted.')}
        </ToastSuccess>
      ))
      setPspToDelete(null)
    },
    () => {
      toastError(({ onClose }) => (
        <ToastError onClose={onClose}>
          {getText('An error occurred trying to delete the PSP. Try again.')}
        </ToastError>
      ))
      setPspToDelete(null)
    }
  )
  return (
    <div>
      <WarnPopup
        action={getText('Delete')}
        onAction={() => deletePsp(pspToDelete)}
        show={!!pspToDelete}
        PrimaryButtonEl={p => <WarnButton type="button" {...p} />}
        onClose={() => setPspToDelete(null)}
        header={getText(
          'Are you sure you want to delete this PSP configuration?'
        )}
      >
        {}
      </WarnPopup>

      {pspList.map((p, i) => {
        return (
          <ItemContainer key={`${p.type}-${i}`}>
            <PspForm
              psp={p}
              onDeletePsp={pspList.length > 1 ? setPspToDelete : null} // At least one psp should remain
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
