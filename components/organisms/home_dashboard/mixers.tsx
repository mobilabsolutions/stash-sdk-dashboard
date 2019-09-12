import React from 'react'
import { useState, useEffect } from 'react'
import {
  useKeyPerformance,
  useDayActivity,
  useNotifications
} from '../../../hooks'
import { ReactElementLike } from 'prop-types'
import {
  KeyPerformance,
  TodaysActivity,
  Notifications,
  StaticNotifications
} from '../../../types'
import moment from 'moment'

//===========> Key Performance
interface KPProps {
  children: (p: KeyPerformance) => ReactElementLike
  liveData: KeyPerformance
}

export function KPMixer(props: KPProps) {
  const { children, liveData } = props

  const { kp, allowStream } = useKeyPerformance()
  const [state, setState] = useState({
    nrOfChargebacks: 0,
    nrOfRefundedTransactions: 0,
    nrOfTransactions: 0,
    salesVolume: 0,
    currencyId: 'EUR'
  })
  useEffect(() => {
    allowStream && setState(kp)
  }, [allowStream])
  useEffect(() => {
    allowStream &&
      liveData &&
      setState(prev => ({
        nrOfChargebacks: liveData.nrOfChargebacks + prev.nrOfChargebacks,
        nrOfRefundedTransactions:
          liveData.nrOfRefundedTransactions + prev.nrOfRefundedTransactions,
        nrOfTransactions: liveData.nrOfTransactions + prev.nrOfTransactions,
        salesVolume: liveData.salesVolume + prev.salesVolume,
        currencyId: prev.currencyId
      }))
  }, [liveData])
  return <>{children(state)}</>
}

//===========> Today's Activity
interface TAProps {
  children: (p: { data: MixedResult[] }) => ReactElementLike
  selectedDay: moment.Moment
  liveData: TodaysActivity
}

const timeReg = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/

interface MixedResult {
  today: number
  selectedDay: number
  time: string
}

const mapToPlot = (key: string) => (p: TodaysActivity) => {
  return {
    time: Number(p.time),
    [key]: p.amount / 100
  }
}

function mixDataForPlot(
  live: TodaysActivity[] = [],
  staticD: TodaysActivity[] = []
): MixedResult[] {
  const plotedSelectedDay = staticD.map(mapToPlot('selectedDay'))
  const plotedToday = live.map(mapToPlot('today'))
  const mappedData = plotedToday
    .concat(plotedSelectedDay)
    .reduce((acum, curr) => {
      const existing = acum[curr.time] || {}
      return {
        ...acum,
        [curr.time]: {
          ...existing,
          ...curr
        }
      }
    }, {})
  const flattedData = Object.entries(mappedData).map(
    ([_key, entry]) => entry as MixedResult
  )
  return flattedData
}

export function TAMixer(props: TAProps) {
  const { selectedDay, children, liveData } = props
  const { activities: selectedDayActivity } = useDayActivity(selectedDay)
  const { activities: todayActivities } = useDayActivity(moment())
  const [live, setLive] = useState<TodaysActivity[]>([])
  useEffect(() => {
    const nowHour = moment().hour()
    setLive(todayActivities.filter(act => Number(act.time) <= nowHour))
  }, [todayActivities])

  useEffect(() => {
    if (liveData) {
      const lastAct = live.length
        ? live[live.length - 1]
        : { amount: 0, time: moment().hour() }
      const [, ldHr] = timeReg.exec(liveData.time)

      const shouldPush = Number(ldHr) > Number(lastAct.time)
      if (shouldPush) {
        const modifyedLast = { ...liveData, time: ldHr }
        setLive(prev => [...prev, modifyedLast])
      } else {
        setLive(prev =>
          prev.map((act, i) =>
            i === prev.length - 1
              ? { ...act, amount: act.amount + liveData.amount }
              : act
          )
        )
      }
    }
    // !!liveData && setLive(prev => [...prev, liveData])
  }, [liveData])

  return <>{children({ data: mixDataForPlot(live, selectedDayActivity) })}</>
}

//===========> Notifications

interface NProps {
  children: (props: StaticNotifications) => ReactElementLike
  liveData: Notifications
}

const mapDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export function NotificationMixer(props: NProps) {
  const { data } = useNotifications()
  const { liveData, children } = props
  const [state, setState] = useState<StaticNotifications>(data)
  const moment_en = moment()
  moment_en.locale('en')
  const _day = mapDays[moment_en.weekday()] // Using this approach in order to get the same weekday if diferent locale
  useEffect(() => {
    setState(data)
  }, [data])
  useEffect(() => {
    if (liveData) {
      setState({
        notifications: liveData.notification
          ? [liveData.notification, ...state.notifications]
          : state.notifications,
        transactions: [
          ...state.transactions.map(({ day, nrOfTransactions }) =>
            day === _day
              ? {
                  day,
                  nrOfTransactions:
                    nrOfTransactions + (liveData.nrOfTransactions || 0)
                }
              : { day, nrOfTransactions }
          )
        ]
      })
    }
  }, [liveData])
  return <>{children(state)}</>
}
