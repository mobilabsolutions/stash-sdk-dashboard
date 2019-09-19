import { useState, useEffect } from 'react'
import { TodaysActivity as Activity } from '../../types'
import { useApi } from '../'
import { Moment, defaultFormatUtc } from 'moment'

interface ActivityState {
  activities: Activity[]
  loading: boolean
  error: any
}

interface ApiResponse {
  transactions: {
    amount: number
    hour: number
  }[]
}

function initialValues(): ActivityState {
  return {
    activities: [],
    loading: false,
    error: null
  }
}

export default (date: Moment) => {
  const [state, setState] = useState(initialValues())
  const { get, merchantId } = useApi()
  const load = () => {
    setState(prevState => ({ ...prevState, loading: true }))
    get(
      `/api/v1/home/${encodeURIComponent(merchantId)}/activity?date=${date
        .clone()
        .hours(0)
        .minutes(0)
        .format(defaultFormatUtc)}`
    )
      .then((response: { result: ApiResponse }) => {
        const { transactions = [] } = response.result

        return setState({
          activities: transactions.map(trans => ({
            time: trans.hour.toString(),
            amount: trans.amount
          })),
          loading: false,
          error: null
        })
      })
      .catch((error: any) => {
        setState(prev => ({ ...prev, loading: false, error }))
      })
  }

  useEffect(load, [date])

  return {
    ...state,
    load
  }
}
