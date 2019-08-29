import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { useLocalization } from '../../../hooks'
const useFormatter = () => {
  const { formatAmount } = useLocalization()
  return (amount: number = 0) =>
    amount === 0 ? '0' : formatAmount('EUR', amount / 100).value
}
export enum PaymentMethodColor {
  CC = '#3aede5',
  PAY_PAL = '#747f86',
  SEPA = '#609df6'
  // KLARNA = '#f27969',
  // APPLE_PAY = '#4f5995',
  // GOOGLE_PAY = '#00be41'
}

export default function PaymentMLineChart(props: { data: any[] }) {
  const { getText } = useLocalization()
  const formatter = useFormatter()
  return (
    <ResponsiveContainer>
      <BarChart
        data={props.data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="day"
          stroke={'#a3aaaf'}
          allowDuplicatedCategory={false}
          axisLine={false}
          tickLine={false}
          tickMargin={10}
          tickFormatter={(v: string) => getText(v.slice(0, 3))}
        />
        <YAxis
          axisLine={false}
          stroke={'#a3aaaf'}
          tickMargin={2}
          tickLine={false}
          tickFormatter={formatter}
        />
        <CartesianGrid stroke={'#ededed'} vertical={false} />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconSize={8}
          iconType="circle"
          wrapperStyle={{
            paddingLeft: '50px'
          }}
        />
        {Object.keys(PaymentMethodColor).map(p => (
          <Bar
            key={p}
            dataKey={p}
            fill={PaymentMethodColor[p]}
            name={getText(p)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
