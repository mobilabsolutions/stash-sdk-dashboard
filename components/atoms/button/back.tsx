import React from 'react'
import { FlatButton, ArrowBack } from '..'
import styled from '../../styled'

const CustomFlatButton = styled(FlatButton)`
  margin: auto;
  font-size: 16px;
  background-color: transparent;
  border: 8px solid transparent;
  > svg {
    margin-right: 8px;
    transform: translate(0px, 2px);
  }
`

export default function BackButton({ children, ...rest }) {
  return (
    <CustomFlatButton {...rest}>
      <ArrowBack /> {children}
    </CustomFlatButton>
  )
}
