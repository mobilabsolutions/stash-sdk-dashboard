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
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="35%" stopColor="#609df6" />
              <stop offset="65%" stopColor="rgba(117, 169, 246, 0.39)" />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3aede5" />
              <stop offset="95%" stopColor="rgba(4, 139, 133, 0)" />
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
          <YAxis axisLine={false} stroke={'#a3aaaf'} />
          <CartesianGrid stroke={'#edeff0'} vertical={false} />
          <Tooltip
            labelFormatter={timeFormater}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <Legend />
          <Area
            type="monotone"
            connectNulls
            name={getText('Yesterday')}
            dataKey="selectedDay"
            stroke="#3aede5"
            isAnimationActive={false}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="today"
            isAnimationActive={false}
            name={getText('Today')}
            stroke="#609df6"
            connectNulls
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  )
}
