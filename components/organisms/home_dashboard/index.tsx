import React from 'react'
import { KeyPerformance, LiveData } from '../../organisms'
import styled from '../../styled'
import { Grid } from '../../atoms'
import { KPMixer } from './mixers'
import { KeyPerformance as KP } from 'types'

const Card = styled.div`
  height: 120px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
`

export default function HomeDashboard() {
  return (
    <LiveData>
      {({ keyPerformance }) => (
        <>
          <KPMixer liveData={keyPerformance}>
            {(props: KP) => <KeyPerformance {...props} />}
          </KPMixer>
          <Grid.Row>
            <Grid.Col l={8} m={6}>
              <Card></Card>
            </Grid.Col>
            <Grid.Col l={4} m={6}>
              <Card></Card>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <Card></Card>
            </Grid.Col>
          </Grid.Row>
        </>
      )}
    </LiveData>
  )
}
