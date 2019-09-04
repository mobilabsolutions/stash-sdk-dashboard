import React from 'react'
import { PrimaryButton, Add } from '../../atoms'
import styled from '../../styled'

const Btn = styled(PrimaryButton)`
  width: fit-content;
`
const Wrapper = styled.div`
  .add-plus > svg {
    margin-right: ${p => p.theme.spacing.xsmall};
    transform: translate(-5px, 1px);
  }
`

export default function UploadImage(props) {
  return (
    <Wrapper>
      <Btn {...props} label={''} type="file" onClick={() => {}}>
        <span className="add-plus">
          <Add />
          {props.label}
        </span>
      </Btn>
    </Wrapper>
  )
}
