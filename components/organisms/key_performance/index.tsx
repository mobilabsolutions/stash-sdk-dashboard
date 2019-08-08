import React, { memo } from 'react'
import {
  Grid,
  SalesVolume,
  Chargebacks,
  Transactions,
  Refund
} from '../../atoms'
import { PerformanceCard } from '../../molecules'
import { useLocalization } from '../../../hooks'
import { theme } from '../../../assets/style'
import styled from '../../styled'

const Title = styled.span`
  font-size: 12px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${p => p.theme.shade.A200};
  text-transform: uppercase;
  display: block;
  margin: 0px 0px 0px 16px;
`
interface Props {
  salesVolume: number
  currencyId: string
  nrOfChargebacks: number
  nrOfRefundedTransactions: number
  nrOfTransactions: number
}

export function KeyPerformance(p: Props) {
  const { getText, formatAmount } = useLocalization()

  const {
    salesVolume,
    currencyId,
    nrOfChargebacks,
    nrOfRefundedTransactions,
    nrOfTransactions
  } = p
  return (
    <Grid.Row>
      <Title>{getText('Key Performance')}</Title>
      <Grid.Col l={3} m={6}>
        <PerformanceCard
          title={getText('Sales Volume')}
          amount={formatAmount(currencyId, salesVolume / 100).value}
          amountStyle={{ color: theme.primary.A400 }}
          iconEl={SalesVolume}
        />
      </Grid.Col>
      <Grid.Col l={3} m={6}>
        <PerformanceCard
          title={getText('Transactions')}
          amount={nrOfTransactions}
          amountStyle={{ color: '#4f5995' }}
          iconEl={Transactions}
        />
      </Grid.Col>
      <Grid.Col l={3} m={6}>
        <PerformanceCard
          title={getText('Refunded Transactions')}
          amount={nrOfRefundedTransactions}
          amountStyle={{ color: theme.mobilab.A700 }}
          iconEl={Refund}
        />
      </Grid.Col>
      <Grid.Col l={3} m={6}>
        <PerformanceCard
          title={getText('Chargebacks')}
          amountStyle={{ color: '#f27969' }}
          amount={nrOfChargebacks}
          iconEl={Chargebacks}
        />
      </Grid.Col>
    </Grid.Row>
  )
}

export default memo(KeyPerformance)
