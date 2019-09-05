import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useLocalization } from '../../../hooks'
import styled from '../../styled'

const useFormatter = () => {
  const { formatAmount } = useLocalization()
  return (amount: number = 0) =>
    amount === 0 ? '0' : formatAmount('EUR', amount / 100).value
}

const SpanTooltip = styled.span`
  background-color: #4f5995;
  color: #ffffff;
  font-size: 12px;
  padding: 5px 16px;
  border-radius: 5px;
`

export default function RefundLineChart(props: { data: any[] }) {
  const formatter = useFormatter()
  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <SpanTooltip className="custom-tooltip">
          {formatter(payload[0].value as number)}
        </SpanTooltip>
      )
    }
  }
  return (
    <ResponsiveContainer>
      <LineChart
        data={props.data}
        margin={{ top: 10, right: 30, left: 8, bottom: 0 }}
      >
        <XAxis
          dataKey="day"
          stroke={'#ffffff'}
          allowDuplicatedCategory={false}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
        />
        <YAxis
          axisLine={false}
          stroke={'#ffffff'}
          type="number"
          tickMargin={8}
          tickSize={8}
          tickFormatter={formatter}
        />
        <CartesianGrid stroke={'#ededed'} vertical={false} />
        <Tooltip
          content={CustomTooltip}
          formatter={val => [formatter(val as number), '']}
        />
        <Line
          type="linear"
          dataKey="amount"
          name="Amount"
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
          stroke="#ffffff"
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
