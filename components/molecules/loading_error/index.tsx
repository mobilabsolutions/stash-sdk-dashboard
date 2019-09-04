import React, { forwardRef } from 'react'
import styled from '../../styled'
import { H1, Wallet } from '../../atoms'

const Container = styled.div`
  display: flex;
  height: 85%;
  .internal {
    margin: auto;
    display: flex;
    flex-direction: column;
  }
  svg {
    margin: auto;
    margin-bottom: ${p => p.theme.spacing.large};
  }
  h1 {
    color: ${p => p.theme.primary.A500};
    margin: auto;
    margin-bottom: ${p => p.theme.spacing.small};
  }
`

interface Props {
  mainText: string
  children: any
}

export function LoadingError(props: Props, elRef: any) {
  return (
    <Container ref={elRef}>
      <div className="internal">
        <Wallet />
        <H1>{props.mainText}</H1>
        {props.children}
      </div>
    </Container>
  )
}

export default forwardRef<HTMLDivElement, any>(LoadingError)
