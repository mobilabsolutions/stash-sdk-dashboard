import React from 'react'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import { H1, EmptyFilterPage } from '../../atoms'

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
  span {
    color: ${p => p.theme.shade.A200};
    margin: auto;
    width: 274px;
    text-align: center;
  }
`

export default function NoTransactions(props) {
  const { getText } = useLocalization()
  return (
    <Container {...props}>
      <div className="internal">
        <EmptyFilterPage />
        <H1>{getText('No transaction found.')}</H1>
        <span>
          {getText(
            "Sorry, we couldn't find any transaction matching your filters."
          )}
        </span>
      </div>
    </Container>
  )
}
