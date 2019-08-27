import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
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
// const data = [
//   0,
//   1,
//   2,
//   3,
//   4,
//   5,
//   6,
//   7,
//   8,
//   9,
//   10,
//   11,
//   12,
//   13,
//   14,
//   15,
//   16,
//   17,
//   18,
//   19,
//   20,
//   21,
//   22,
//   23
// ].map(hr => ({
//   today: Math.floor(Math.random() * 100),
//   selectedDay: Math.floor(Math.random() * 100),
//   time: hr
// }))

export default function ActivityAreaChart(props: Props) {
  const { getText } = useLocalization()
  return (
    <Container>
      <ResponsiveContainer>
        <AreaChart
          data={props.data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
              <stop offset="50%" stopColor="#3aede5" />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            type="number"
            stroke={'a3aaaf'}
            tickCount={24}
            allowDuplicatedCategory={false}
            domain={['dataMin', 'dataMax']}
            tickFormatter={() => ''}
            axisLine={false}
          />
          <YAxis
            axisLine={false}
            stroke={'#a3aaaf'}
            tickSize={8}
            tickLine={{ stroke: '#edeff0' }}
            tickMargin={16}
          />
          <CartesianGrid stroke={'#edeff0'} vertical={false} />
          <Tooltip
            labelFormatter={timeFormater}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <Area
            dataKey="today"
            isAnimationActive={false}
            name={getText('Today')}
            stroke="#3aede5"
            connectNulls
            fill="url(#today)"
          />
          <Area
            connectNulls
            name={getText('Yesterday')}
            dataKey="selectedDay"
            stroke="#609df6"
            isAnimationActive={false}
            fill="url(#selectedDay)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}
