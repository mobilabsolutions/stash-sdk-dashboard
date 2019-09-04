import { useState, useEffect } from 'react'
import { useRefund, useReverse, useCapture } from '../use_transactions/actions'
import { useApi } from '../use_api'
import Router from 'next/router'
import { TransactionDetails } from '../types'
import { isClient } from '../../assets/payment.static'

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

  const loadData = async () => {
    let url = `/api/v1/merchant/${encodeURIComponent(
      merchantId
    )}/transactions/${transactionId}`
    setState(prevState => ({
      ...prevState,
      error: false,
      isLoading: true
    }))

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
      setState(prevState => ({
        ...prevState,
        details: null,
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

    if (!transactionId) {
      Router.push('/transactions')
      return
    }

    loadData()
  }, [transactionId])

  const refund = useRefund(loadData)

  const reverse = useReverse(loadData)

  const capture = useCapture(loadData)

  return {
    ...state,
    refund,
    reverse,
    capture
  }
}
