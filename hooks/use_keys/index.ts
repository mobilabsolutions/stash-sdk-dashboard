import { useEffect, useState, useCallback } from 'react'

import { useApi } from '../use_api'

const initialState = {
  data: [],
  isLoading: true,
  error: null
}

export const useKeys = () => {
  const [state, setState] = useState(initialState)
  const { get, post, del, merchantId } = useApi()

  useEffect(() => {
    setState(prevState => ({ ...prevState, isLoading: true }))
    get(`/api/v1/merchant/${encodeURIComponent(merchantId)}/api-key`)
      .then((response: any) =>
        setState({
          data:
            response.result && response.result.data ? response.result.data : [],
          isLoading: false,
          error: null
        })
      )
      .catch((error: any) => setState({ data: [], isLoading: false, error }))
  }, [get, merchantId])

  const create = useCallback(
    (type: string, name?: string) => {
      post(`/api/v1/merchant/${encodeURIComponent(merchantId)}/api-key`, {
        type,
        name
      }).then((response: any) => {
        if (response && response.result) {
          setState(prevState => ({
            ...prevState,
            data: [
              ...prevState.data,
              {
                type,
                name,
                ...response.result
              }
            ]
          }))
        }
      })
    },
    [merchantId, post]
  )

  const remove = useCallback(
    (id: number) => {
      del(
        `/api/v1/merchant/${encodeURIComponent(merchantId)}/api-key/${id}`
      ).then(() => {
        setState(prevState => ({
          ...prevState,
          data: prevState.data.filter(item => item.id !== id)
        }))
      })
    },
    [del, merchantId]
  )

  return { ...state, create, remove }
}
