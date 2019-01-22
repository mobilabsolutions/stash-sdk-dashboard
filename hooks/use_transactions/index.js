import { useEffect, useState } from 'react'
import moment from 'moment'

import { useApi } from '../use_api'

const isClient = typeof window === 'object'

const initValue = {
  data: [],
  isLoading: true,
  startDate: moment().add(-7, 'days'),
  endDate: moment(),
  startPos: 0,
  pageSize: 400,
  error: null
}

let refreshCount = 0

export const useTransactions = () => {
  const { get: apiGet } = useApi()
  const [state, setState] = useState(initValue)

  useEffect(() => {
    if (!isClient) return

    if (!state.isLoading)
      setState({
        ...state,
        isLoading: true,
        error: null
      })

    let url = `/api/v1/transactions?pagesize=${state.pageSize}`

    if (state.startPos) url += `&startpos=${state.startPos}`
    if (state.startDate) url += `&fromDate=${state.startDate.toISOString()}`
    if (state.endDate) url += `&toDate=${state.endDate.toISOString()}`

    apiGet(url)
      .then(response => {
        setState({
          ...state,
          data: response.result.transactions,
          totalCount: response.result.totalCount,
          isLoading: false
        })
      })
      .catch(error => {
        setState({
          ...state,
          data: [],
          error,
          isLoading: false
        })
      })
  }, [
    state.startDate,
    state.endDate,
    state.startPos,
    state.pageSize,
    refreshCount
  ])

  const setRange = (fromDate, toDate) =>
    setState({ ...state, startDate: fromDate, endDate: toDate })
  const refresh = () => refreshCount++

  return {
    ...state,
    setRange,
    refresh
  }
}
