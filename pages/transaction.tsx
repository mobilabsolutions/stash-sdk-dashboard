import React from 'react'
import {
  Page,
  PaymentMethodDetails,
  TransactionEssentials,
  TransactionDetails as TransactionDetailCmp,
  TransactionTimeline
} from '../components/organisms'
import { withRouter, RouterProps } from 'next/router'
import { useTransaction, useLocalization } from '../hooks'
import { VerticalScrollContainer, BackButton } from '../components/atoms'
import styled from '../components/styled'
import Link from 'next/link'

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

  const { details, refund, reverse, capture, isLoading } = useTransaction(
    transactionId
  )
  return (
    <Page activePath={'/transactions'} isLoading={isLoading}>
      <CustomScrollContainer>
        <Link href="/transactions">
          <BackButton>{getText('Back to transactions overview')}</BackButton>
        </Link>
        {details && (
          <>
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
            <DetailItem>
              <TransactionTimeline timeline={details.timelineInfo} />
            </DetailItem>
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
            <DetailItem>
              <PaymentMethodDetails
                paymentMethod={details.paymentMethod}
                ccConfig={details.paymentInfo.extra.ccConfig}
                payPalConfig={details.paymentInfo.extra.payPalConfig}
                personalData={details.paymentInfo.extra.personalData}
                sepaConfig={details.paymentInfo.extra.sepaConfig}
                aliasId={details.aliasId}
              />
            </DetailItem>
          </>
        )}
      </CustomScrollContainer>
    </Page>
  )
}
export default withRouter(TransactionDetails)
