import React, { memo } from 'react'
import styled from '../../styled'
import { useLocalization } from '../../../hooks'
import { H4 } from '../../atoms'
import LineChart from './line_chart'
import moment from 'moment'

const ActivityContainer = styled.div`
  padding: ${p => p.theme.spacing.medium};
  .title {
    margin-top: 0px;
    color: ${p => p.theme.white};
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

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => ({
  time: moment()
    .add('days', -n)
    .unix(),
  amount: Math.floor(Math.random() * 100 * 34)
}))

export function RefundOverview() {
  const { getText } = useLocalization()
  return (
    <ActivityContainer>
      <H4 className="title">{getText('Refunds Overview')}</H4>
      <div className="graph">
        {data.length ? (
          <LineChart data={data} />
        ) : (
          <span className="no-data">{getText('No data')}</span>
        )}
      </div>
    </ActivityContainer>
  )
}
export default memo(RefundOverview)
