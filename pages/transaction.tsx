import React from 'react'
import { Page } from '../components/organisms'
import { withRouter, RouterProps } from 'next/router'
import { useTransaction, useLocalization } from '../hooks'
import { VerticalScrollContainer, BackButton } from '../components/atoms'
import { TransactionDetails } from '../components/templates'
import styled from '../components/styled'
import Link from 'next/link'

interface DetailProps {
  router: RouterProps
}

const CustomScrollContainer = styled(VerticalScrollContainer)`
  max-width: 920px;
  margin: auto;
  padding-top: 40px;
`

const TransactionPage = ({ router }: DetailProps) => {
  const { transactionId } = router.query
  const { getText } = useLocalization()

  const {
    details,
    refund,
    reverse,
    capture,
    isLoading,
    error
  } = useTransaction(transactionId)
  return (
    <Page activePath={'/transactions'} isLoading={isLoading}>
      <CustomScrollContainer>
        <Link href="/transactions">
          <BackButton>{getText('Back to transactions overview')}</BackButton>
        </Link>
        <TransactionDetails
          details={details}
          refund={refund}
          reverse={reverse}
          capture={capture}
          error={error}
        />
      </CustomScrollContainer>
    </Page>
  )
}
export default withRouter(TransactionPage)
