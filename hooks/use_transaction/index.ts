import { useState, useEffect } from 'react'
import {
  useRefund,
  useReverse,
  useCapture,
  Params
} from '../use_transactions/actions'
import { useApi } from '../use_api'
import Router from 'next/router'
import { TransactionDetails } from '../types'
const isClient = typeof window === 'object'

interface ActionResponse {
  action: string
  additionalInfo: string
  amount: number
  currency: string
  id: string
  status: string
}

interface TransactionState {
  details?: TransactionDetails
  isLoading: boolean
  error: boolean
}

function getInitial(): TransactionState {
  return {
    details: null,
    isLoading: false,
    error: false
  }
}

export const useTransaction = transactionId => {
  const [state, setState] = useState(getInitial())
  const { get: apiGet, token, merchantId } = useApi()

  useEffect(() => {
    if (!isClient) return

    if (!token) {
      Router.push('/login')
      return
    }

    if (!transactionId) {
      Router.push('/transactions')
      return
    }

    const loadData = async () => {
      setState({
        isLoading: true,
        error: false
      })
      let url = `/api/v1/merchant/${encodeURIComponent(
        merchantId
      )}/transactions/${transactionId}`

      try {
        const response: { result: TransactionDetails } = await apiGet(url)
        return setState(prev => ({
          ...prev,
          isLoading: false,
          error: false,
          details: {
            ...response.result,
            amount: (response.result.amount || 0) / 100
          }
        }))
      } catch (error) {
        if (error && error.statusCode === 401) {
          Router.push('/login')
          return null
        }
        setState(prevState => ({
          ...prevState,
          details: null,
          error,
          isLoading: false
        }))
      }
    }

    loadData()
  }, [transactionId, token])

  function modifyDetails(details: any) {
    setState(prevState => ({
      ...prevState,
      details: {
        ...prevState.details,
        ...details
      }
    }))
  }
  const refund = useRefund(
    (response: { result: ActionResponse }, p: Params) => {
      const { reason } = p
      modifyDetails({
        ...response.result,
        reason,
        amount: response.result.amount / 100
      })
    }
  )

  const reverse = useReverse(
    (response: { result: ActionResponse }, p: Params) => {
      const { reason } = p
      modifyDetails({
        ...response.result,
        reason,
        amount: response.result.amount / 100
      })
    }
  )

  const capture = useCapture((response: { result: ActionResponse }) => {
    modifyDetails({
      ...response.result,
      amount: response.result.amount / 100
    })
  })

  return {
    ...state,
    refund,
    reverse,
    capture
  }
}
