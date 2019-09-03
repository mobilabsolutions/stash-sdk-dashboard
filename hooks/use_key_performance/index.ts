import { useState, useEffect } from 'react'
import { KeyPerformance as KP } from '../../types'
import { useApi } from '../'

interface KeyPerformance {
  kp: KP
  loading: boolean
  allowStream: boolean
  error: any
}

function initialValues(): KeyPerformance {
  return {
    kp: {
      nrOfChargebacks: 0,
      nrOfRefundedTransactions: 0,
      nrOfTransactions: 0,
      salesVolume: 0,
      currencyId: ''
    },
    allowStream: false,
    loading: false,
    error: null
  }
}

export default () => {
  const [state, setState] = useState(initialValues())
  const { get, merchantId } = useApi()
  const load = () => {
    setState(prevState => ({ ...prevState, loading: true }))
    get(`/api/v1/home/${encodeURIComponent(merchantId)}/key-performance`)
      .then((response: any) =>
        setState({
          kp: response.result,
          loading: false,
          allowStream: true,
          error: null
        })
      )
      .catch((error: any) =>
        setState(prev => ({ ...prev, loading: false, error }))
      )
  }

  useEffect(load, [])

  return {
    ...state,
    load
  }
}
