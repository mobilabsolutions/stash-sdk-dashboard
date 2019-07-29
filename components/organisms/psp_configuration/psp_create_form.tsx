import React, { useState } from 'react'
import { PspType } from '../../types'
import { useLocalization, useToast } from '../../../hooks'
import { PrimaryButton, SecondaryButton, Add } from '../../atoms'
import { Select, ToastSuccess, ToastError } from '../../molecules'
import { PSP } from '../../../types/psp'
import { useApi } from '.'
import PspForm from '../psp_form'
import styled from '../../styled'

const Container = styled.div`
  margin: ${p => p.theme.spacing.small} 0px;
  .psp-create-form {
    padding-top: ${p => p.theme.spacing.medium};
  }
  .psp-select {
    max-width: 300px;
    margin-right: ${p => p.theme.spacing.small};
  }
  .select-cancel-container {
    display: flex;
    flex-direction: row;
  }
  .add-plus > svg {
    margin-right: ${p => p.theme.spacing.xsmall};
    transform: translate(-5px, 1px);
  }
`

interface Props {
  pspsToCreate: Array<{ label: string; value: PspType }>
  onCreatePsp: (id: string, psp: PSP) => Promise<{ result: PSP }>
}

export default function PspCreateForm(props: Props) {
  const { pspsToCreate, onCreatePsp } = props
  const [state, setState] = useState({
    isCreatingForm: false,
    pspToCreate: null
  })
  const { getText } = useLocalization()
  const { success: toastSuccess, error: toastError } = useToast()
  const {
    isloading: isCreating,
    error: createError,
    action: createPsp
  } = useApi(
    onCreatePsp,
    () => {
      toastSuccess(({ onClose }) => (
        <ToastSuccess onClose={onClose}>
          {getText('New PSP configuration added.')}
        </ToastSuccess>
      ))
      setState({
        isCreatingForm: false,
        pspToCreate: null
      })
    },
    () => {
      toastError(({ onClose }) => (
        <ToastError onClose={onClose}>
          {getText('An error occurred trying to create the PSP. Try again.')}
        </ToastError>
      ))
    }
  )
  const onCancel = () => {
    setState({
      isCreatingForm: false,
      pspToCreate: null
    })
  }
  return (
    <Container>
      {pspsToCreate.length !== 0 && (
        <>
          {!state.isCreatingForm ? (
            <PrimaryButton
              label={''}
              type="button"
              onClick={() => {
                setState({
                  isCreatingForm: true,
                  pspToCreate: null
                })
              }}
            >
              <span className="add-plus">
                <Add />
                {getText('Add a new PSP configuration')}
              </span>
            </PrimaryButton>
          ) : (
            <div className="select-cancel-container">
              <Select
                className="psp-select"
                options={pspsToCreate}
                value={
                  !!state.pspToCreate
                    ? {
                        label: getText(state.pspToCreate),
                        value: state.pspToCreate
                      }
                    : state.pspToCreate
                }
                placeholder={getText('Select a PSP')}
                onChange={({ value }) => {
                  setState({
                    isCreatingForm: true,
                    pspToCreate: value
                  })
                }}
              />
              {!state.pspToCreate && (
                <SecondaryButton label={getText('Cancel')} onClick={onCancel} />
              )}
            </div>
          )}
        </>
      )}
      {!!state.pspToCreate && (
        <div className="psp-create-form">
          <PspForm
            psp={{
              type: state.pspToCreate
            }}
            isUpdate={isCreating}
            updateError={createError}
            onUpdatePsp={createPsp}
            onCancel={onCancel}
          />
        </div>
      )}
    </Container>
  )
}
