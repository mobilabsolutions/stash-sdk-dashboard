import { forwardRef } from 'react'
import styled from '../../styled'

const Container = styled.div`
  overflow-x: auto;
  height: 100%;
  width: 100%;
`

const MarginContainer = styled.div<{ maxWidth: string }>`
  max-width: ${p => (p.maxWidth ? p.maxWidth : '1024px')};
  margin: auto;
  padding-top: 40px;
`

interface Props {
  children: any
  maxWidth?: string
}

export const ScrollMargin = forwardRef(
  (
    p: Props,
    ref: ((instance: HTMLDivElement) => void) | React.RefObject<HTMLDivElement>
  ) => {
    return (
      <Container ref={ref}>
        <MarginContainer maxWidth={p.maxWidth}>{p.children}</MarginContainer>
      </Container>
    )
  }
)

export default Container
