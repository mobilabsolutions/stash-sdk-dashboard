import { useState, useEffect } from 'react'
import { useApi } from '../use_api'
import { PaymentMethodOverview } from '../../types'

interface ApiResponse {
  transactions: PaymentMethodOverview[]
}

function getInitial() {
  return {
    loading: false,
    error: false,
    data: []
  }
}
const usePMOverview = () => {
  const [state, setState] = useState(getInitial())
  const { get, merchantId } = useApi()
  const load = () => {
    get(`/api/v1/home/${encodeURIComponent(merchantId)}/payment-methods`)
      .then((response: { result: ApiResponse }) => {
        const { transactions } = response.result
        setState({
          error: false,
          loading: false,
          data: transactions
        })
      })
      .catch((error: any) => {
        setState(prev => ({ ...prev, loading: false, error }))
      })
  }
  useEffect(load, [merchantId, get])
  return {
    ...state,
    load
  }
}

export default usePMOverview
