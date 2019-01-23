import { useEffect, useState } from 'react'
import moment from 'moment'

import { useApi } from '../use_api'

const isClient = typeof window === 'object'

const getInitValue = () => {
  return {
    data: [],
    loadingCount: 0,
    startDate: moment().add(-7, 'days'),
    endDate: moment(),
    startPos: 0,
    pageSize: 100,
    status: 'all',
    reason: '',
    error: null
  }
}

export const useTransactions = () => {
  const [state, setState] = useState(getInitValue())
  const { get: apiGet, token } = useApi()

  useEffect(() => {
    if (!isClient) return

    const loadData = () => {
      let url = `/api/v1/transactions?pagesize=${state.pageSize}`

      if (state.startPos) url += `&startpos=${state.startPos}`
      if (state.startDate) url += `&fromDate=${state.startDate.toISOString()}`
      if (state.endDate) url += `&toDate=${state.endDate.toISOString()}`
      if (state.status !== 'all') url += `&status=${state.status.toUpperCase()}`
      if (state.reason) url += `&reason=${state.reason}`

      return apiGet(url)
        .then(response =>
          setState(prevState => ({
            ...prevState,
            data: response.result.transactions,
            totalCount: response.result.totalCount,
            error: null,
            loadingCount: prevState.loadingCount - 1
          }))
        )
        .catch(error =>
          setState(prevState => ({
            ...prevState,
            data: [],
            error,
            loadingCount: prevState.loadingCount - 1
          }))
        )
    }

    setState(prevState => ({
      ...prevState,
      loadingCount: prevState.loadingCount + 1,
      error: null
    }))

    loadData()
  }, [
    state.startDate,
    state.endDate,
    state.startPos,
    state.pageSize,
    state.status,
    state.reason
  ])

  const numberOfPages =
    state.data && state.data.length > 0
      ? Math.ceil(state.totalCount / state.pageSize)
      : 0
  const selectedPage = Math.ceil(state.startPos / state.pageSize) + 1

  const setRange = (fromDate, toDate) =>
    setState(prevState => ({
      ...prevState,
      startDate: fromDate,
      endDate: toDate,
      startPos: 0
    }))

  const setPage = page =>
    setState(prevState => ({
      ...prevState,
      startPos: (page - 1) * state.pageSize
    }))

  const setStatus = status =>
    setState(prevState => ({ ...prevState, status, startPos: 0 }))

  const setReason = reason =>
    setState(prevState => ({ ...prevState, reason, startPos: 0 }))

  return {
    data: state.data,
    isLoading: state.loadingCount > 0,
    startDate: state.startDate,
    endDate: state.endDate,
    status: state.status,
    reason: state.reason,
    error: state.error,
    setRange,
    numberOfPages,
    selectedPage,
    setPage,
    setStatus,
    setReason,
    token
  }
}
