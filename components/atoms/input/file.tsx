import React from 'react'
import { Add } from '../../atoms'
import styled from '../../styled'

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
const Label = styled.label`
  border-radius: 20px;
  border-width: 0;
  height: 40px;
  display: block;
  outline: none;
  overflow: hidden;
  padding: 0;
  position: relative;
  transition: background-color 0.3s;
  width: fit-content;
  :hover,
  :focus {
    cursor: pointer;
  }
  ::before {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 100%;
    content: '';
    display: block;
    left: 50%;
    padding-top: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0;
  }
  :active:not(:disabled)::before {
    padding-top: 120%;
    transition: width 0.4s ease-out, padding-top 0.4s ease-out;
    width: 120%;
  }
  :disabled {
    cursor: not-allowed;
  }
  > span {
    display: block;
    font-size: 14px;
    padding: 0.75em 1.5em;
  }
  background-color: ${props => props.theme.primary.A500};
  :hover,
  :focus {
    background-color: ${props => props.theme.primary.A700};
  }
  :active {
    background-color: ${props => props.theme.primary.A800};
  }
  :disabled {
    background-color: ${props => props.theme.shade.A200};
  }
  > span {
    color: ${props => props.theme.shade.A25};
    white-space: nowrap;
  }
  svg {
    margin-right: ${p => p.theme.spacing.xsmall};
    transform: translate(-5px, 1px);
  }
`

const Wrapper = styled.div`
  .add-plus > svg {
    margin-right: ${p => p.theme.spacing.xsmall};
    transform: translate(-5px, 1px);
  }
`

export default function UploadFile(props) {
  return (
    <Wrapper>
      <Input
        {...props}
        type="file"
        id="input-file"
        accept={'.jpeg, .png'}
        name="input-file"
      />
      <Label htmlFor="input-file">
        <span>
          <Add />
          {props.label}
        </span>
      </Label>
    </Wrapper>
  )
}
