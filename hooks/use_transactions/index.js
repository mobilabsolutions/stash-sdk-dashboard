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
  pageSize: 100,
  status: 'all',
  error: null
}

let refreshCount = 0

export const useTransactions = () => {
  const { get: apiGet, token } = useApi()
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
    if (state.status !== 'all') url += `&status=${state.status.toUpperCase()}`

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
    state.status,
    token,
    refreshCount
  ])

  const numberOfPages =
    state.data && state.data.length > 0
      ? Math.ceil(state.totalCount / state.pageSize)
      : 0
  const selectedPage = Math.ceil(state.startPos / state.pageSize) + 1

  const setRange = (fromDate, toDate) =>
    !state.isLoading &&
    setState({ ...state, startDate: fromDate, endDate: toDate, startPos: 0 })
  const setPage = page =>
    !state.isLoading &&
    setState({ ...state, startPos: (page - 1) * state.pageSize })

  const setStatus = status =>
    !state.isLoading && setState({ ...state, status, startPos: 0 })

  const refresh = () => refreshCount++

  return {
    ...state,
    setRange,
    numberOfPages,
    selectedPage,
    setPage,
    setStatus,
    refresh,
    token
  }
}
