import React, { useState, useContext } from 'react'
import {
  KeyPerformance,
  LiveData,
  TodaysActivity,
  Notifications,
  ChartOverviews
} from '../../organisms'
import styled from '../../styled'
import { Grid, H3 } from '../../atoms'
import { KPMixer, TAMixer, NotificationMixer } from './mixers'
import { KeyPerformance as KP } from 'types'
import moment from 'moment'
import { sessionContext } from '../../../hooks/use_api/session_context'
import { useLocalization } from '../../../hooks'

const Card = styled.div`
  min-height: 120px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
`
const yesterday = moment().add(-1, 'day') // In the future this could be selected by user

export function HomeDashboard() {
  const [selectedDay, setSelectedDay] = useState(yesterday)
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
                    <TodaysActivity
                      selectedDay={selectedDay}
                      onSelectedChange={setSelectedDay}
                      {...props}
                    />
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

const Title = styled(H3)`
  margin-bottom: 32px;
  margin-left: 16px;
`

export default () => {
  const { merchantName } = useContext(sessionContext)
  const { getText } = useLocalization()
  return (
    <>
      {merchantName && (
        <Title>{getText('Welcome %{merchantName}!', { merchantName })}</Title>
      )}
      <HomeDashboard />
    </>
  )
}
