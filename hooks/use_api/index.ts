import { useCallback } from 'react'
import Router from 'next/router'

import { useSessionStorage } from '../use_session_storage'

const BACKEND_HOST =
  typeof window !== 'undefined'
    ? ''
    : process.env.API_UPSTREAM || 'https://payment-dev.mblb.net'

const apiCall = (
  token: string,
  refresh: () => Promise<string>,
  method: string,
  path: string,
  content: object = null,
  headers = {},
  getRaw = false
) => {
  const request: any = {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include'
  }

  if (content) {
    request.body = JSON.stringify(content)
  }

  const url = `${BACKEND_HOST}${path}`
  let didRefresh = false

  const processApiCall = (request: any) => {
    return new Promise((resolve, reject) => {
      return fetch(url, request)
        .then(response => {
          if (response.status >= 500) {
            const error: any = new Error('Api Server Error')
            error.statusCode = response.status
            error.statusText = response.statusText
            return reject(error)
          }

          if (response.status === 401 && !didRefresh) {
            return refresh()
              .then(accessToken => {
                didRefresh = true
                return processApiCall({
                  method,
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                  },
                  credentials: 'include'
                })
              })
              .catch(error => {
                if (error.statusCode && error.statusCode === 401) {
                  Router.push('/login')
                  return
                }
                throw error
              })
          }
          if (response.status >= 400) {
            return response
              .json()
              .then(json => {
                const error: any = new Error('Api User Error')
                error.statusCode = response.status
                error.statusText = response.statusText
                error.reason = json.reason
                error.data = json.data
                reject(error)
              })
              .catch(error => {
                error.statusCode = response.status
                error.statusText = response.statusText
                reject(error)
              })
          }

          if (response.status == 204) {
            return resolve({ result: null, statusCode: response.status })
          }

          if (getRaw) {
            return resolve({ result: response, statusCode: response.status })
          }

          response
            .json()
            .then(result => resolve({ result, statusCode: response.status }))
            .catch(reject)
        })
        .catch(reject)
    })
  }

  return processApiCall(request)
}

const oauthApi = (path: string, body: Object) => {
  const formData = new FormData()
  Object.keys(body).forEach(key => {
    formData.append(key, body[key])
  })

  const request: any = {
    method: 'POST',
    headers: {
      Authorization:
        'Basic cGF5bWVudC1kYXNoYm9hcmQtY2xpZW50OkJ3YnJDRlJaOWQ2RWZjZlhnZTRS'
    },
    credentials: 'include',
    body: formData
  }

  return new Promise((resolve, reject) => {
    const url = `${BACKEND_HOST}${path}`
    fetch(url, request)
      .then(response => {
        if (response.status >= 400) {
          const error: any = new Error('Authorization Error')
          error.statusCode = response.status
          reject(error)
        }

        return response.json()
      })
      .then(result => resolve(result))
      .catch(error => reject(error))
  })
}

export const useApi = () => {
  const [token, setToken] = useSessionStorage('access_token', '')
  const [refreshToken, setRefreshToken] = useSessionStorage('refresh_token', '')
  const [userId, setUserId] = useSessionStorage('user_id', '')
  const [merchantId, setMerchantId] = useSessionStorage('merchant_id', '')

  const parseJwt = useCallback((jwtRaw: string) => {
    const parts = jwtRaw.split('.')
    if (parts.length !== 3) return null

    return JSON.parse(atob(parts[1]))
  }, [])

  const refresh = useCallback(
    () =>
      oauthApi('/api/v1/oauth/token', {
        grant_type: 'refresh_token',
        client_id: 'payment-dashboard-client',
        refresh_token: refreshToken
      }).then(({ access_token, refresh_token }) => {
        setToken(access_token)
        setRefreshToken(refresh_token)
        return access_token
      }),
    [refreshToken, setRefreshToken, setToken]
  )

  const getRaw = useCallback(
    (path: string) => apiCall(token, refresh, 'GET', path, undefined, {}, true),
    [refresh, token]
  )

  const get = useCallback(
    (path: string) => apiCall(token, refresh, 'GET', path),
    [refresh, token]
  )
  const put = useCallback(
    (path: string, content: object, headers: object = {}) =>
      apiCall(token, refresh, 'PUT', path, content, headers),
    [refresh, token]
  )
  const patch = useCallback(
    (path: string, content: object, headers: object = {}) =>
      apiCall(token, refresh, 'PATCH', path, content, headers),
    [refresh, token]
  )
  const post = useCallback(
    (path: string, content: object, headers: object = {}) =>
      apiCall(token, refresh, 'POST', path, content, headers),
    [refresh, token]
  )
  const del = useCallback(
    (path: string) => apiCall(token, refresh, 'DELETE', path),
    [refresh, token]
  )

  const login = useCallback(
    (username: string, password: string) =>
      oauthApi('/api/v1/oauth/token', {
        grant_type: 'password',
        client_id: 'payment-dashboard-client',
        username,
        password
      }).then(({ access_token, refresh_token }) => {
        setToken(access_token)
        setRefreshToken(refresh_token)

        const payload = parseJwt(access_token)
        setUserId(payload.user_name)
        if (payload.authorities.length === 1)
          setMerchantId(payload.authorities[0])

        return true
      }),
    [parseJwt, setMerchantId, setRefreshToken, setToken, setUserId]
  )

  const logout = useCallback(() => {
    setToken(null)
    setRefreshToken(null)
    setUserId(null)
    setMerchantId(null)
  }, [setMerchantId, setRefreshToken, setToken, setUserId])

  return {
    get,
    getRaw,
    put,
    patch,
    post,
    del,
    token,
    login,
    logout,
    refresh,
    userId,
    merchantId
  }
}
