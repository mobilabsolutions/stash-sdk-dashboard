import React from 'react'
import { FlatButton, ArrowBack } from '..'
import styled from '../../styled'

const CustomFlatButton = styled(FlatButton)`
  margin: auto;
  padding: 8px;
  font-size: 16px;
`

export default function BackButton({ children, ...rest }) {
  return (
    <CustomFlatButton {...rest}>
      <ArrowBack /> {children}
    </CustomFlatButton>
  )
}
