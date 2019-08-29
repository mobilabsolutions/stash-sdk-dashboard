import React, { memo } from 'react'
import styled from '../../styled'
import { useLocalization, usePMOverview } from '../../../hooks'
import Barchart from './bar_chart'

const Container = styled.div`
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
  .recharts-legend-item {
    margin-bottom: 16px;
  }
`

export function PMOverview() {
  const { getText } = useLocalization()
  const { data } = usePMOverview()
  const transformData = data.map(({ day, paymentMethodData = [] }) => {
    const PMs = paymentMethodData.reduce(
      (acum: any, { amount, paymentMethod }) => ({
        ...acum,
        [paymentMethod]: amount
      }),
      {}
    )
    return {
      day,
      ...PMs
    }
  })
  return (
    <Container>
      <div className="graph">
        {data.length ? (
          <Barchart data={transformData} />
        ) : (
          <span className="no-data">{getText('No data')}</span>
        )}
      </div>
    </Container>
  )
}
export default memo(PMOverview)
