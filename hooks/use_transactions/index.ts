import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import Router from 'next/router'

import { useApi } from '../use_api'
import { useRefund, useReverse, useCapture, Params } from './actions'
const isClient = typeof window === 'object'

const getInitValue = () => {
  return {
    data: [],
    isLoading: false,
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
  const { get: apiGet, token, merchantId } = useApi()

  useEffect(() => {
    if (!isClient) return

    if (!token) {
      Router.push('/login')
      return
    }

    const loadData = async () => {
      let url = `/api/v1/merchant/${encodeURIComponent(
        merchantId
      )}/transactions?limit=${state.pageSize}`

      url += `&offset=${state.startPos}`
      if (state.startDate) url += `&fromDate=${state.startDate.toISOString()}`
      if (state.endDate) url += `&toDate=${state.endDate.toISOString()}`
      if (state.status !== 'all') url += `&status=${state.status.toUpperCase()}`
      if (state.reason) url += `&reason=${state.reason}`

      try {
        const response: any = await apiGet(url)
        return setState(prevState => ({
          ...prevState,
          data: response.result.transactions.map(
            (item: {
              amount: number
              createdDate: string | number | Date
            }) => ({
              ...item,
              amount: item.amount / 100,
              timestamp: moment(
                item.createdDate,
                moment.defaultFormatUtc
              ).toDate()
            })
          ),
          totalCount: response.result.totalCount,
          error: null,
          isLoading: false
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
          isLoading: false
        }))
      }
    }

    setState(prevState => ({
      ...prevState,
      isLoading: true,
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
  const selectedPage = Math.ceil(state.startPos / state.pageSize)

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
      startPos: page * state.pageSize
    }))

  const setStatus = (status: string) =>
    setState(prevState => ({ ...prevState, status, startPos: 0 }))

  const setReason = (reason: string) =>
    setState(prevState => ({ ...prevState, reason, startPos: 0 }))

  const modifyData = (transactionId: string, modification: any) =>
    setState(prevState => ({
      ...prevState,
      data: state.data.map(transaction =>
        transaction.transactionId == transactionId
          ? { ...transaction, ...modification }
          : transaction
      )
    }))

  interface ActionResponse {
    action: string
    additionalInfo: string
    amount: number
    currency: string
    id: string
    status: string
  }
  const refund = useRefund((response: ActionResponse, p: Params) => {
    const { transactionId } = p
    modifyData(transactionId, { ...response })
  })

  const reverse = useReverse((response: ActionResponse, p: Params) => {
    const { transactionId } = p
    modifyData(transactionId, { ...response })
  })

  const capture = useCapture((response: ActionResponse, p: Params) => {
    const { transactionId } = p
    modifyData(transactionId, { ...response })
  })

  return {
    data: state.data,
    isLoading: state.isLoading,
    startDate: state.startDate,
    endDate: state.endDate,
    status: state.status,
    reason: state.reason,
    error: state.error,
    setRange,
    modifyData,
    reverse,
    capture,
    numberOfPages,
    selectedPage,
    setPage,
    setStatus,
    setReason,
    refund,
    token
  }
}
