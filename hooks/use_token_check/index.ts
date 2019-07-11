import { useEffect } from 'react'
import Router from 'next/router'

import { useApi } from '../use_api'
import { isClient } from '../../assets/payment.static'

export function useTokenCheck() {
  const { token } = useApi()
  useEffect(() => {
    if (!isClient) return

    if (!token) {
      Router.push('/login')
    }
  }, [token])
}
