import { useEffect, useState } from 'react'

import { useApi } from '../use_api'

export const useKeys = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const { get, merchantId } = useApi()

  useEffect(() => {
    setIsLoading(true)
    get(`/api/v1/merchant/${encodeURIComponent(merchantId)}/api-key`)
      .then((response: any) => {
        setIsLoading(false)
        setError(null)

        if (response.result && response.result.data)
          setData(response.result.data)
        else setData([])
      })
      .catch(error => {
        setIsLoading(false)
        setData([])
        setError(error)
      })
  }, [get, merchantId])

  return { isLoading, error, data }
}
