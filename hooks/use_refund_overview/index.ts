import { useState, useEffect } from 'react'
import { useApi } from '../use_api'
import { RefundOverview } from '../../types'

interface ApiResponse {
  refunds: RefundOverview[]
}

function getInitial() {
  return {
    loading: false,
    error: false,
    data: []
  }
}
const useRefundOverview = () => {
  const [state, setState] = useState(getInitial())
  const { get, merchantId } = useApi()
  const load = () => {
    setState(prev => ({ ...prev, loading: true, error: false }))
    get(`/api/v1/home/${encodeURIComponent(merchantId)}/refunds`)
      .then((response: { result: ApiResponse }) => {
        const { refunds } = response.result
        setState({
          error: false,
          loading: false,
          data: refunds
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

export default useRefundOverview
