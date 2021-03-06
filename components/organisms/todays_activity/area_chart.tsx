import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import moment from 'moment'
import { useLocalization } from '../../../hooks'
import styled from '../../styled'

interface Props {
  data: any[]
  selectedDay: moment.Moment
}

const timeFormater = (time: string) => {
  const day = moment()
    .hours(Number(time))
    .minutes(0)
    .seconds(0)
  return day.format('h a')
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  tspan {
    color: #a3aaaf;
    font-size: 12px;
  }
`

const useFormatter = () => {
  const { formatAmount } = useLocalization()
  return (amount: number = 0) =>
    amount === 0 ? '0' : formatAmount('EUR', amount).value
}

const INTERVAL = 8

//12am...8am...4pm...11pm
const CustomizedAxisTick = props => {
  const { x, y, fill, payload, index } = props
  if (index % INTERVAL !== 0 && index !== 23) return null
  return (
    <g className="recharts-layer recharts-cartesian-axis-tick">
      <text
        stroke="none"
        width="646"
        height="30"
        x={x}
        y={y}
        fill={fill}
        className="recharts-text recharts-cartesian-axis-tick-value"
        textAnchor="middle"
      >
        <tspan x={x} dy="0.71em">
          {timeFormater(payload.value)}
        </tspan>
      </text>
    </g>
  )
}
// The function was generated [here](https://mycurvefit.com/)
//y = 12334540 + (-26.85997 - 12334540)/(1 + (x/79427.87)^1.346958)

export default function ActivityAreaChart(props: Props) {
  const { getText } = useLocalization()
  const currencyFormatter = useFormatter()
  const text =
    moment()
      .add(-1, 'day')
      .date() == props.selectedDay.date()
      ? getText('Yesterday')
      : props.selectedDay.format('DD/MM/YYYY')
  return (
    <Container>
      <ResponsiveContainer>
        <AreaChart
          data={props.data}
          margin={{ top: 10, right: 30, left: 16, bottom: 0 }}
        >
          <defs>
            <linearGradient
              x1="50%"
              x2="50%"
              y1="50%"
              y2="100%"
              id="selectedDay"
            >
              <stop offset="40%" stopColor="#609df6" />
              <stop offset="100%" stopColor="rgba(117, 169, 246, 0.39)" />
            </linearGradient>
            <linearGradient x1="100%" y1="100%" x2="0%" y2="0%" id="today">
              <stop offset="0%" stopColor="rgba(4, 139, 133, 0)" />
              <stop offset="50%" stopColor="#07d0c7" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            type="number"
            stroke={'#a3aaaf'}
            allowDuplicatedCategory={false}
            domain={['dataMin', 'dataMax']}
            tick={CustomizedAxisTick}
            interval={0}
            tickCount={24}
            tickFormatter={timeFormater}
            tickLine={false}
            tickMargin={8}
            axisLine={false}
          />
          <YAxis
            axisLine={false}
            stroke={'#a3aaaf'}
            tickSize={8}
            tickLine={{ stroke: '#edeff0' }}
            tickFormatter={currencyFormatter}
            tickMargin={16}
          />
          <CartesianGrid stroke={'#edeff0'} vertical={false} />
          <Tooltip
            labelFormatter={timeFormater}
            formatter={val => currencyFormatter(val as number)}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Area
            dataKey="today"
            name={getText('Today')}
            stroke="#07d0c7"
            connectNulls
            fill="url(#today)"
          />
          <Area
            connectNulls
            name={text}
            dataKey="selectedDay"
            stroke="#609df6"
            fill="url(#selectedDay)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}
