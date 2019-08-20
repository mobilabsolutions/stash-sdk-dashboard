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

interface Props {
  data: any[]
  selectedDay: moment.Moment
}

const timeFormater = (time: string) => {
  return `${time}:00:00`
}

export default function ActivityAreaChart(props: Props) {
  const { getText } = useLocalization()
  return (
    <ResponsiveContainer>
      <AreaChart
        data={props.data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          type="number"
          tickCount={24}
          allowDuplicatedCategory={false}
          domain={['dataMin', 'dataMax']}
          tickFormatter={timeFormater}
        />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelFormatter={timeFormater}
          labelStyle={{ fontWeight: 'bold' }}
        />
        <Legend />
        <Area
          type="monotone"
          connectNulls
          name={props.selectedDay.format('DD-MM-YYYY')}
          dataKey="selectedDay"
          stroke="#82ca9d"
          isAnimationActive={false}
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="today"
          isAnimationActive={false}
          name={getText('Today')}
          stroke="#8884d8"
          connectNulls
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
