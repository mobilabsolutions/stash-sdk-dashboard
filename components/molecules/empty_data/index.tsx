import React from 'react'
import styled from '../../styled'
import { H1, EmptyFilterPage } from '../../atoms'

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
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
  span {
    color: ${p => p.theme.shade.A200};
    margin: auto;
    width: 274px;
    text-align: center;
  }
`

interface Props {
  title: string
  secondTitle?: String
  style?: any
}

export default function EmptyData(props: Props) {
  const { title, secondTitle, style } = props
  return (
    <Container style={style}>
      <div className="internal">
        <EmptyFilterPage />
        <H1>{title}</H1>
        <span>{secondTitle}</span>
      </div>
    </Container>
  )
}
