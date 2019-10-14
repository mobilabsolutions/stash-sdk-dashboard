import React from 'react'
import { Page } from '../components/organisms'
import { withRouter, RouterProps } from 'next/router'
import { useTransaction } from '../hooks'
import { BackButton, ScrollMargin } from '../components/atoms'
import { TransactionDetails } from '../components/templates'
import Link from 'next/link'

interface DetailProps {
  router: RouterProps
}

const TransactionPage = ({ router }: DetailProps) => {
  const { transactionId } = router.query

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
      <ScrollMargin maxWidth="920px">
        <Link href="/transactions">
          <BackButton>{''}</BackButton>
        </Link>
        <TransactionDetails
          details={details}
          refund={refund}
          reverse={reverse}
          capture={capture}
          error={error}
        />
      </ScrollMargin>
    </Page>
  )
}
export default withRouter(TransactionPage)
