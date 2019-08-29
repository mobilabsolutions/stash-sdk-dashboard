import React from 'react'
import {
  PaymentMethodDetails,
  TransactionEssentials,
  TransactionDetails as TransactionDetailCmp,
  TransactionTimeline
} from '../../organisms'
import styled from '../../styled'

interface DetailProps {
  details: any
  refund: any
  reverse: any
  capture: any
}

const DetailItem = styled.div`
  padding-top: 24px;
`

const TransactionDetails = (props: DetailProps) => {
  const { details, refund, reverse, capture } = props

  return (
    details && (
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
          <TransactionTimeline
            timeline={details.timelineInfo}
            currencyId={details.currencyId}
          />
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
    )
  )
}
export default TransactionDetails
