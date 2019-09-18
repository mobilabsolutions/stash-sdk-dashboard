import { useState, useEffect } from 'react'
import { StaticNotifications } from '../../types'
import { useApi } from '../'

interface Root {
  data: StaticNotifications
  loading: boolean
  error: any
}
function initialValues(): Root {
  return {
    data: {
      notifications: [],
      transactions: []
    },
    loading: false,
    error: null
  }
}

export default () => {
  const [state, setState] = useState(initialValues())
  const { get, merchantId } = useApi()
  const load = () => {
    setState(prevState => ({ ...prevState, loading: true }))
    get(`/api/v1/home/${encodeURIComponent(merchantId)}/notifications`)
      .then((response: any) =>
        setState({
          data: response.result,
          loading: false,
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
