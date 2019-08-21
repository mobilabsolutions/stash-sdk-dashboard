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
import moment from 'moment'

const timeFormater = (time: number) => moment(time * 1000).format('ddd')

const Label = ({ children }) => (
  <span style={{ color: '#ffffff' }}>{children}</span>
)

export default function RefundLineChart(props) {
  return (
    <ResponsiveContainer>
      <LineChart
        data={props.data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey="time"
          type="number"
          stroke={'a3aaaf'}
          allowDuplicatedCategory={false}
          domain={['dataMin', 'dataMax']}
          tickFormatter={v => <Label>{timeFormater(v)}</Label>}
          axisLine={false}
        />
        <YAxis axisLine={false} stroke={'a3aaaf'} />
        <CartesianGrid stroke={'#edeff0'} vertical={false} />
        <Tooltip
          labelStyle={{ fontWeight: 'bold' }}
          labelFormatter={timeFormater}
        />
        <Line
          type="linear"
          dataKey="amount"
          name="Amount"
          isAnimationActive={false}
          stroke="#ffffff"
          connectNulls
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
