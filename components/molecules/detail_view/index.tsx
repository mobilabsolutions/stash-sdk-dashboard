import React, { forwardRef } from 'react'
import styled from '../../styled'
import { H2 } from '../../atoms'

const ContentWrapper = styled.div`
  display: block;
  width: 100%;
  border-radius: 4px;
  padding: 24px;
  background-color: #ffffff;
`
const Title = styled(H2)`
  margin-block-start: ${p => p.theme.spacing.xsmall};
  margin-block-end: ${p => p.theme.spacing.xsmall};
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`

interface Props {
  title?: string
  wrapperStyle?: any
  children: any
}
export function DetailView(props: Props, reference: any) {
  const { title, wrapperStyle = {} } = props
  return (
    <div ref={reference}>
      <Title>{title}</Title>
      <ContentWrapper style={wrapperStyle}>{props.children}</ContentWrapper>
    </div>
  )
}
export default forwardRef(DetailView)
