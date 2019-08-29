import React, { memo } from 'react'
import styled from '../../styled'
import { useLocalization, useRefundOverview } from '../../../hooks'
import LineChart from './line_chart'

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
    tspan {
      font-size: 12px !important;
    }
  }
  .no-data {
    margin: auto;
    color: #ffffff;
  }
`

export function RefundOverview() {
  const { getText } = useLocalization()
  const { data } = useRefundOverview()
  return (
    <ActivityContainer>
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
