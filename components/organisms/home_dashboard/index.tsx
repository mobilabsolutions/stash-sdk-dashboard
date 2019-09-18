import React from 'react'
import {
  KeyPerformance,
  LiveData,
  TodaysActivity,
  Notifications,
  ChartOverviews
} from '../../organisms'
import styled from '../../styled'
import { Grid } from '../../atoms'
import { KPMixer, TAMixer, NotificationMixer } from './mixers'
import { KeyPerformance as KP } from 'types'
import moment from 'moment'

const Card = styled.div`
  min-height: 120px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
`
const selectedDay = moment().add(-1, 'day') // In the future this could be selected by user

export default function HomeDashboard() {
  return (
    <LiveData>
      {({ keyPerformance, todaysActivity, notifications }) => (
        <>
          <KPMixer liveData={keyPerformance}>
            {(props: KP) => <KeyPerformance {...props} />}
          </KPMixer>
          <Grid.Row>
            <Grid.Col l={8} m={6}>
              <Card>
                <TAMixer selectedDay={selectedDay} liveData={todaysActivity}>
                  {props => (
                    <TodaysActivity selectedDay={selectedDay} {...props} />
                  )}
                </TAMixer>
              </Card>
            </Grid.Col>
            <Grid.Col l={4} m={6}>
              <Card>
                <NotificationMixer liveData={notifications}>
                  {props => <Notifications {...props} />}
                </NotificationMixer>
              </Card>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <Card>
                <ChartOverviews />
              </Card>
            </Grid.Col>
          </Grid.Row>
        </>
      )}
    </LiveData>
  )
}
