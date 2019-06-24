import React from 'react'
import { Page } from '../components/organisms'
import { withRouter, RouterProps } from 'next/router'
import { useTransaction, useLocalization } from '../hooks'
import { VerticalScrollContainer, BackButton } from '../components/atoms'
import styled from '../components/styled'
import Link from 'next/link'
import {
  TransactionEssentials,
  TransactionDetails as TransactionDetailCmp
} from '../components/organisms'

interface DetailProps {
  router: RouterProps
}

const CustomScrollContainer = styled(VerticalScrollContainer)`
  max-width: 920px;
  margin: auto;
  padding-top: 40px;
  font-family: ${props => props.theme.fontTransactions};
`

const DetailItem = styled.div`
  padding-top: 24px;
`

const TransactionDetails = ({ router }: DetailProps) => {
  const { transactionId } = router.query
  const { getText } = useLocalization()

  const { details, refund, reverse, capture } = useTransaction(transactionId)
  return (
    <Page activePath={'transactions'}>
      <CustomScrollContainer>
        <Link href="/transactions">
          <BackButton>{getText('Back to transactions overview')}</BackButton>
        </Link>
        {details && (
          <DetailItem>
            <TransactionEssentials
              refund={refund}
              reverse={reverse}
              capture={capture}
              transactionId={details.transactionId}
              amount={details.amount}
              currency={details.currencyId}
              status={details.status}
              action={details.action}
              date={details.createdDate}
              extra={details.paymentInfo.extra}
            />
          </DetailItem>
        )}
        {details && (
          <DetailItem>
            <TransactionDetailCmp
              transactionId={details.transactionId}
              action={details.action}
              status={details.status}
              amount={details.amount}
              currency={details.currencyId}
              description={details.reason}
              createdDate={details.createdDate}
            />
          </DetailItem>
        )}
      </CustomScrollContainer>
    </Page>
  )
}
export default withRouter(TransactionDetails)
