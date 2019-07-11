import { useEffect } from 'react'
import moment, { Moment } from 'moment'
import Router from 'next/router'
import { useStoredState, useDownloadcsv } from '..'

import { useApi } from '../use_api'
import { useRefund, useReverse, useCapture } from './actions'
import { statusToAction, isClient } from '../../assets/payment.static'
import { TransactionAction, TransactionStatus } from '../types'

interface Transaction {
  action: TransactionAction
  amount: number
  createdDate: string | number | Date
  currencyId: string
  customerId: string
  paymentMethod: string
  reason: string
  status: TransactionStatus
  transactionId: string
}
interface TransactionResponse {
  metadata: {
    limit: 0
    offset: 0
    pageCount: 0
    totalCount: 0
  }
  transactions: Array<Transaction>
}

interface State {
  data: Array<Transaction>
  isLoading: boolean
  startDate: moment.Moment
  endDate: moment.Moment
  startPos: number
  pageSize: number
  totalCount: number
  status:
    | ''
    | 'all'
    | 'authorised'
    | 'peversed'
    | 'refunded'
    | 'captured'
    | 'fail'
    | 'pre-Authorised'
  text: string
  paymentMethod: string
  error: any
  refreshCounter: number
}

function getInitValue(): State {
  return {
    data: [],
    isLoading: false,
    startDate: null,
    endDate: null,
    startPos: 0,
    pageSize: 100,
    totalCount: 0,
    status: '',
    paymentMethod: '',
    text: '',
    error: null,
    refreshCounter: 0
  }
}

function getUrlWithFilter(ep: string, merchantId: string, state: State) {
  let url = `/api/v1/merchant/${encodeURIComponent(merchantId)}/${ep}?limit=${
    state.pageSize
  }`

  url += `&offset=${state.startPos}`
  //--------------- Filter DATES
  if (state.startDate)
    url += `&createdAtStart=${state.startDate.utc().format()}`
  if (state.endDate) url += `&createdAtEnd=${state.endDate.utc().format()}`

  ////---------------
  //--------------- Filter ACTION and STATUS
  if (!!state.status && state.status !== 'all') {
    const status = state.status === 'fail' ? 'FAIL' : 'SUCCESS'
    url += `&status=${status}`
    url +=
      state.status === 'fail' ? '' : `&action=${statusToAction[state.status]}`
  }
  ////---------------
  if (!!state.paymentMethod && state.paymentMethod !== 'all') {
    url += `&paymentMethod=${state.paymentMethod}`
  }

  if (state.text) url += `&text=${state.text}`
  return url
}

export const useTransactions = () => {
  const [state, setState] = useStoredState(
    'transactions-state',
    getInitValue(),
    ({
      isLoading,
      startDate,
      endDate,
      startPos,
      pageSize,
      totalCount,
      status,
      paymentMethod,
      text
    }) => ({
      isLoading,
      startDate,
      endDate,
      startPos,
      pageSize,
      totalCount,
      status,
      paymentMethod,
      text
    }),
    (state, { startDate = null, endDate = null, ...rest }) => ({
      ...state,
      startDate: startDate ? moment(startDate, moment.defaultFormatUtc) : null,
      endDate: endDate ? moment(endDate, moment.defaultFormatUtc) : null,
      ...rest
    })
  )
  const { get: apiGet, token, merchantId } = useApi()

  const loadData = async () => {
    setState(prevState => ({
      ...prevState,
      isLoading: true,
      error: null
    }))
    const url = getUrlWithFilter('transactions', merchantId, state)
    try {
      const response: { result: TransactionResponse } = await apiGet(url)
      return setState(prevState => ({
        ...prevState,
        data: response.result.transactions.map((item: Transaction) => ({
          ...item,
          amount: item.amount / 100,
          timestamp: moment(item.createdDate, moment.defaultFormatUtc).toDate()
        })),
        totalCount: response.result.metadata.totalCount,
        error: null,
        isLoading: false
      }))
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        data: [],
        error,
        isLoading: false
      }))
    }
  }

  useEffect(() => {
    if (!isClient) return

    if (!token) {
      Router.push('/login')
      return
    }

    loadData()
  }, [
    state.startDate,
    state.endDate,
    state.startPos,
    state.pageSize,
    state.status,
    state.text,
    state.refreshCounter,
    state.paymentMethod,
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

  const setStatus = (status: any) =>
    setState(prevState => ({ ...prevState, status, startPos: 0 }))

  const setText = (text: string) =>
    setState(prevState => ({ ...prevState, text, startPos: 0 }))

  const setPaymentMethod = (paymentMethod: string) =>
    setState(prevState => ({ ...prevState, paymentMethod, startPos: 0 }))

  const clearFilters = () =>
    setState(prevState => ({
      ...prevState,
      status: '',
      text: '',
      paymentMethod: '',
      startPos: 0,
      startDate: null,
      endDate: null
    }))

  const refund = useRefund(loadData)

  const reverse = useReverse(loadData)

  const capture = useCapture(loadData)

  const resetPageSizeTo = (pageSize = 100) => {
    setState(prev => ({
      ...prev,
      pageSize,
      startPos: 0
    }))
  }

  const url = getUrlWithFilter('transactions/csv', merchantId, {
    ...state,
    pageSize: state.totalCount
  })
  const FILE_NAME = 'transaction_list.csv'
  const exportCSV = useDownloadcsv(url, FILE_NAME)

  return {
    clearFilters,
    data: state.data,
    isLoading: state.isLoading,
    startDate: state.startDate,
    endDate: state.endDate,
    status: state.status,
    paymentMethod: state.paymentMethod,
    text: state.text,
    error: state.error,
    pageSize: state.pageSize,
    resetPageSizeTo,
    setRange,
    totalCount: state.totalCount,
    reverse,
    capture,
    numberOfPages,
    selectedPage,
    setPage,
    setPaymentMethod,
    setStatus,
    setText,
    refund,
    token,
    exportCSV
  }
}
