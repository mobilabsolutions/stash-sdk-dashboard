import { useState, useEffect } from 'react'
import { KeyPerformance, TodaysActivity, Notifications } from '../../types'
import { useApi } from '../'
import StompJs from '@stomp/stompjs'

interface LiveData {
  keyPerformance?: KeyPerformance
  todaysActivity?: TodaysActivity
  notifications?: Notifications
}

function initialValues(): LiveData {
  return {
    keyPerformance: null,
    todaysActivity: null,
    notifications: null
  }
}

export default () => {
  const [state, setState] = useState(initialValues())
  const { useSocket } = useApi()
  const [sock] = useSocket(
    '/api/v1/app',
    '/user/topic/transactions',
    (response: LiveData) => {
      setState(response)
    }
  )

  useEffect(() => {
    ;(sock as StompJs.Client).activate()
  }, [])

  return state
}
