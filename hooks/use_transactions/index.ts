import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import Router from 'next/router'

import { useApi } from '../use_api'
const isClient = typeof window === 'object'

const getInitValue = () => {
  return {
    data: [],
    loadingCount: 0,
    startDate: moment()
      .add(-1, 'months')
      .hours(0)
      .minutes(0)
      .seconds(0)
      .milliseconds(0),
    endDate: moment()
      .hours(23)
      .minutes(59)
      .seconds(59)
      .milliseconds(999),
    startPos: 0,
    pageSize: 100,
    totalCount: 0,
    status: 'all',
    reason: '',
    error: null,
    isRefunding: false,
    refreshCounter: 0
  }
}

export const useTransactions = () => {
  const [state, setState] = useState(getInitValue())
  const { get: apiGet, post: apiPost, token } = useApi()

  useEffect(() => {
    if (!isClient) return

    if (!token) {
      Router.push('/login')
      return
    }

    const loadData = async () => {
      let url = `/api/v1/transactions?pagesize=${state.pageSize}`

      if (state.startPos) url += `&startpos=${state.startPos}`
      if (state.startDate) url += `&fromDate=${state.startDate.toISOString()}`
      if (state.endDate) url += `&toDate=${state.endDate.toISOString()}`
      if (state.status !== 'all') url += `&status=${state.status.toUpperCase()}`
      if (state.reason) url += `&reason=${state.reason}`

      try {
        const response: any = await apiGet(url)
        return setState(prevState => ({
          ...prevState,
          data: response.result.transactions.map(item => ({
            ...item,
            amount: item.amount / 100,
            timestamp: new Date(item.timestamp)
          })),
          totalCount: response.result.totalCount,
          error: null,
          loadingCount: prevState.loadingCount - 1
        }))
      } catch (error) {
        if (error && error.statusCode === 401) {
          Router.push('/login')
          return null
        }
        setState(prevState => ({
          ...prevState,
          data: [],
          error,
          loadingCount: prevState.loadingCount - 1
        }))
      }
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
    state.reason,
    state.refreshCounter,
    token,
    apiGet
  ])

  const numberOfPages =
    state.data && state.data.length > 0
      ? Math.ceil(state.totalCount / state.pageSize)
      : 0
  const selectedPage = Math.ceil(state.startPos / state.pageSize) + 1

  const setRange = (fromDate: Moment, toDate: Moment) =>
    setState(prevState => ({
      ...prevState,
      startDate: fromDate
        ? fromDate
            .hours(0)
            .minutes(0)
            .seconds(0)
            .milliseconds(0)
        : null,
      endDate: toDate
        ? toDate
            .hours(23)
            .minutes(59)
            .seconds(59)
            .milliseconds(999)
        : null,
      startPos: 0
    }))

  const setPage = (page: number) =>
    setState(prevState => ({
      ...prevState,
      startPos: (page - 1) * state.pageSize
    }))

  const setStatus = (status: string) =>
    setState(prevState => ({ ...prevState, status, startPos: 0 }))

  const setReason = (reason: string) =>
    setState(prevState => ({ ...prevState, reason, startPos: 0 }))

  const refund = (transactionId: string, reason: string) => {
    setState(prevState => ({ ...prevState, isRefunding: true }))

    return new Promise((resolve, reject) => {
      apiPost('/api/v1/payment/refund', { transactionId, reason })
        .then(() => {
          setState(prevState => ({
            ...prevState,
            isRefunding: false,
            refreshCounter: prevState.refreshCounter + 1
          }))
          resolve(true)
        })
        .catch(error => {
          setState(prevState => ({
            ...prevState,
            error,
            isRefunding: false
          }))
          reject(error)
        })
    })
  }

  return {
    data: state.data,
    isLoading: state.loadingCount > 0,
    startDate: state.startDate,
    endDate: state.endDate,
    status: state.status,
    reason: state.reason,
    error: state.error,
    isRefunding: state.isRefunding,
    setRange,
    numberOfPages,
    selectedPage,
    setPage,
    setStatus,
    setReason,
    refund,
    token
  }
}
