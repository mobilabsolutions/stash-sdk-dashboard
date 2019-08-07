import React from 'react'
import { useLiveData } from '../../../hooks'
import { KeyPerformance, TodaysActivity, Notifications } from '../../../types'
import { ReactElementLike } from 'prop-types'
interface LiveData {
  keyPerformance?: KeyPerformance
  todaysActivity?: TodaysActivity
  notifications?: Notifications
}
interface Props {
  children: (p: LiveData) => ReactElementLike
}
export default function LiveData(p: Props) {
  const liveData = useLiveData()
  return <>{p.children(liveData)}</>
}
