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
`

export function TodaysActivityCmp(props: Props) {
  const { getText } = useLocalization()
  return (
    <ActivityContainer>
      <H4 className="title">{getText('Today´s Activity')}</H4>
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
