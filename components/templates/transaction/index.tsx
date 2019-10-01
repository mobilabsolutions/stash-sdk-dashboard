import React from 'react'
import {
  PaymentMethodDetails,
  TransactionEssentials,
  TransactionDetails as TransactionDetailCmp,
  TransactionTimeline
} from '../../organisms'
import styled from '../../styled'
import { LoadingError } from '../../molecules'
import { useLocalization } from '../../../hooks'
import {
  TransactionDetails as TransactionModel,
  TimeAction,
  TransactionAction,
  TransactionStatus
} from '../../../types/transaction'

interface DetailProps {
  details: TransactionModel
  refund: any
  reverse: any
  capture: any
  error: boolean
}

const DetailItem = styled.div`
  padding-top: 24px;
`

const BackText = styled.span`
  color: ${p => p.theme.shade.A200};
  margin: auto;
  width: 300px;
  text-align: center;
`

const getRemaining = (acc: number, time: TimeAction) =>
  time.action === TransactionAction.REFUND &&
  time.status === TransactionStatus.SUCCESS
    ? acc + time.amount
    : acc

const TransactionDetails = (props: DetailProps) => {
  const { details, refund, reverse, capture, error } = props
  const { getText } = useLocalization()
  if (error)
    return (
      <LoadingError mainText={getText('Oops! Something went wrong.')}>
        <BackText>
          {getText(
            'Unable to show the current transaction. Try again later or refresh the page.'
          )}
        </BackText>
      </LoadingError>
    )

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
            initialAmount={details.initialAmount}
            usedAmount={details.timelineInfo.reduce(getRemaining, 0)}
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
