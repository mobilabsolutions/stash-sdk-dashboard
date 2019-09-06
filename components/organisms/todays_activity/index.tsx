import React, { memo } from 'react'
import moment from 'moment'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import { H4 } from '../../atoms'
import ActivityAreaChart from './area_chart'

interface Props {
  selectedDay: moment.Moment
  data: MixedResult[]
}

interface MixedResult {
  today: number
  selectedDay: number
  time: string
}

const ActivityContainer = styled.div`
  padding: ${p => p.theme.spacing.medium};
  .title {
    margin-top: 0px;
    color: ${p => p.theme.shade.A700};
  }
  .graph {
    width: 100%;
    display: flex;
    height: ${p => p.theme.graphHeight.medium};
  }
  .no-data {
    margin: auto;
  }
  .header {
  }
`

const Legend = styled.div`
  display: flex;
  flex-direction: row;
  float: right;
  margin-top: -40px;
  margin-right: 28px;
`
const LegendItem = styled.span<{ color: string }>`
  color: ${p => p.theme.shade.A200};
  margin-left: 16px;
  font-size: 14px;
  ::before {
    height: 12px;
    width: 12px;
    content: '';
    display: inline-block;
    transform: translate(-4px, 1px);
    color: ${p => p.color};
    border-radius: 6px;
    background-color: ${p => p.color};
  }
`

export function TodaysActivityCmp(props: Props) {
  const { getText } = useLocalization()
  return (
    <ActivityContainer>
      <div className="header">
        <H4 className="title">{getText('Today´s Activity')}</H4>
        <Legend>
          <LegendItem color="#609df6">{getText('Yesterday')}</LegendItem>
          <LegendItem color="#07d0c7">{getText('Today')}</LegendItem>
        </Legend>
      </div>
      <div className="graph">
        {props.data.length ? (
          <ActivityAreaChart
            data={props.data}
            selectedDay={props.selectedDay}
          />
        ) : (
          <span className="no-data">{getText('No data')}</span>
        )}
      </div>
    </ActivityContainer>
  )
}
export default memo(TodaysActivityCmp)
