import React, { forwardRef } from 'react'
import { InputCreator } from '../input'
import { InputWrapper } from '../../atoms'
import styled from '../../styled'

const CustomImputWrapper = styled(InputWrapper)`
  margin-bottom: 0px;
  border: solid 1px
    ${props =>
      props.focused ? props.theme.primary.A500 : props.theme.shade.A50};
  background-color: ${props => props.theme.shade.A25};
  :hover {
    border-color: ${props =>
      props.focused ? props.theme.primary.A500 : props.theme.shade.A200};
  }
`

const CustomInput = forwardRef(InputCreator(CustomImputWrapper))

const HtmlInput = styled.input`
  border: none;
  color: ${props => props.theme.shade.A700};
  display: block;
  font-size: 14px;
  margin-left: ${p => p.theme.spacing.small};
  margin-right: ${p => p.theme.spacing.small};
  box-shadow: none;
  width: 100%;
  background-color: ${props => props.theme.shade.A25};
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${props => props.theme.shade.A200};
  }
  ::selection {
    background-color: ${props => props.theme.primary.A100};
  }
`

export default function InputFilter(props) {
  return (
    <CustomInput {...props}>{props => <HtmlInput {...props} />}</CustomInput>
  )
}
