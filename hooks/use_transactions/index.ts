import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import Router from 'next/router'

import { useApi } from '../use_api'
import { useRefund, useReverse, useCapture, Params } from './actions'
import { statusToAction } from '../../assets/utils'
const isClient = typeof window === 'object'

interface Transaction {
  action: 'AUTH' | 'PREAUTH' | 'REVERSAL' | 'REFUND' | 'CAPTURE'
  amount: number
  createdDate: string | number | Date
  currencyId: string
  customerId: string
  paymentMethod: string
  reason: string
  status: 'SUCCESS' | 'FAIL'
  transactionId: string
}
interface TransactionReponse {
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
    | 'authorised'
    | 'peversed'
    | 'refunded'
    | 'captured'
    | 'fail'
    | 'pre-Authorised'
  text: string
  error: any
  refreshCounter: number
}

function getInitValue(): State {
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
    status: '',
    text: '',
    error: null,
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
      //--------------- Filter DATES
      if (state.startDate)
        url += `&createdAtStart=${state.startDate.format(
          'YYYY-MM-DD HH:mm:ss'
        )}`
      if (state.endDate)
        url += `&createdAtEnd=${state.endDate.format('YYYY-MM-DD HH:mm:ss')}`

      ////---------------
      //--------------- Filter ACTION and STATUS
      if (!!state.status) {
        const status = state.status === 'fail' ? 'FAIL' : 'SUCCESS'
        url += `&status=${status}`
        url +=
          state.status === 'fail'
            ? ''
            : `&action=${statusToAction[state.status]}`
      }
      ////---------------
      if (state.text) url += `&text=${state.text}`

      try {
        const response: { result: TransactionReponse } = await apiGet(url)
        return setState(prevState => ({
          ...prevState,
          data: response.result.transactions.map((item: Transaction) => ({
            ...item,
            amount: item.amount / 100,
            timestamp: moment(
              item.createdDate,
              moment.defaultFormatUtc
            ).toDate()
          })),
          totalCount: response.result.metadata.totalCount,
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
    state.text,
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

  const setStatus = (status: any) =>
    setState(prevState => ({ ...prevState, status, startPos: 0 }))

  const setText = (text: string) =>
    setState(prevState => ({ ...prevState, text, startPos: 0 }))

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

  const resetPageSizeTo = (pageSize = 100) => {
    setState(prev => ({
      ...prev,
      pageSize,
      startPos: 0
    }))
  }

  return {
    data: state.data,
    isLoading: state.isLoading,
    startDate: state.startDate,
    endDate: state.endDate,
    status: state.status,
    text: state.text,
    error: state.error,
    pageSize: state.pageSize,
    resetPageSizeTo,
    setRange,
    modifyData,
    totalCount: state.totalCount,
    reverse,
    capture,
    numberOfPages,
    selectedPage,
    setPage,
    setStatus,
    setText,
    refund,
    token
  }
}
