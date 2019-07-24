import React from 'react'
import { PSP as Psp, PspType } from '../../../types/psp'
import styled from '../../styled'
import { H3 } from '../../atoms'
import Braintree from './braintree'
import Adyen from './adyen'
import BSPayone from './bspayone'

export const nonEmptyValidation = (errorString: string) => (values: any) =>
  Object.entries(values).reduce((er, [key, value]) => {
    return !value
      ? {
          ...er,
          [key]: errorString
        }
      : er
  }, {})

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => props.theme.white};
  border-radius: 5px;
  padding: 16px 0px;
`
export const GenericPspForm = ({ title, children, handleSubmit }) => (
  <>
    <H3>{title}</H3>
    <Form onSubmit={handleSubmit}>{children}</Form>
  </>
)

const CmpMapping = {
  [PspType.ADYEN]: Adyen,
  [PspType.BRAINTREE]: Braintree,
  [PspType.BS_PAYONE]: BSPayone
}
export interface Props {
  psp: Psp
  onDeletePsp?: (id: string) => void
  isDeleting?: boolean
  deleteError?: any
  onUpdatePsp: (id: string, psp: Psp) => void
  isUpdate: boolean
  updateError: any
  onCancel?: Function
}
export default function PspForm(p: Props) {
  const PSP = CmpMapping[p.psp.type]
  return <div>{!!PSP && <PSP {...p} />}</div>
}
