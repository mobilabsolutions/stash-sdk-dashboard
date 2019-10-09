import { useCallback, useState, useEffect, useContext } from 'react'
import Router from 'next/router'
import SockJS from 'sockjs-client'
import * as StompJs from '@stomp/stompjs'
import getConfig from 'next/config'
import { sessionContext } from './session_context'
import { isClient } from '../../assets/payment.static'

const { publicRuntimeConfig } = getConfig() || { publicRuntimeConfig: {} }
const { API_UPSTREAM, NAMESPACE = 'dev' } = publicRuntimeConfig

const BACKEND_HOST = isClient
  ? ''
  : API_UPSTREAM || 'https://payment-dev.mblb.net'

const SOCKET_URL = API_UPSTREAM || `https://payment-${NAMESPACE}.mblb.net`
export enum Method {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

export const apiCall = (
  token: string,
  refresh: () => Promise<string>,
  method: Method,
  path: string,
  content: object | BodyInit = null,
  headers = {},
  getRaw = false,
  stringify = true
) => {
  const getHeaders = _token => {
    if (typeof headers == 'function')
      return headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${_token}`
      })

    return {
      ...headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${_token}`
    }
  }

  const request: RequestInit = {
    method,
    headers: getHeaders(token),
    credentials: 'include'
  }

  const getContent = () =>
    stringify ? JSON.stringify(content) : (content as BodyInit)

  if (content) {
    request.body = getContent()
  }

  const url = `${BACKEND_HOST}${path}`
  let didRefresh = false

  const processApiCall = (request: RequestInit) => {
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
                  headers: getHeaders(accessToken),
                  body: !!content ? getContent() : null,
                  credentials: 'include'
                })
                  .then(resolve)
                  .catch(reject)
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

export const oauthApi = (path: string, body: Object) => {
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
  const {
    token,
    setToken,
    refreshToken,
    setRefreshToken,
    userId,
    setUserId,
    merchantId,
    setMerchantId,
    merchantName,
    setMerchantName
  } = useContext(sessionContext)

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
    (path: string) =>
      apiCall(token, refresh, Method.GET, path, undefined, {}, true),
    [refresh, token]
  )

  const get = useCallback(
    (path: string) => apiCall(token, refresh, Method.GET, path),
    [refresh, token]
  )
  const put = useCallback(
    (path: string, content: object, headers: object = {}) =>
      apiCall(token, refresh, Method.PUT, path, content, headers),
    [refresh, token]
  )
  const patch = useCallback(
    (path: string, content: object, headers: object = {}) =>
      apiCall(token, refresh, Method.PATCH, path, content, headers),
    [refresh, token]
  )
  const post = useCallback(
    (path: string, content: object, headers: object = {}, stringify = true) =>
      apiCall(
        token,
        refresh,
        Method.POST,
        path,
        content,
        headers,
        false,
        stringify
      ),
    [refresh, token]
  )
  const del = useCallback(
    (path: string) => apiCall(token, refresh, Method.DELETE, path),
    [refresh, token]
  )

  const resetPassword = (email: string, merchantId: string) =>
    new Promise((resolve, reject) => {
      fetch(
        `${BACKEND_HOST}/api/v1/merchant/${merchantId}/user/forgot-password?email=${encodeURIComponent(
          email
        )}`,
        {
          method: Method.POST,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          if (response.status !== 201) {
            const error: any = new Error('Reset request failed')
            error.statusCode = response.status
            reject(error)
          }
          resolve(true)
        })
        .catch(reject)
    })

  const useSocket = useCallback(
    (
      url: string,
      topic: string,
      subscription: (response: any) => void,
      onError?: (response: any) => void
    ) => {
      const client = new StompJs.Client({
        reconnectDelay: 3000
      })
      client.webSocketFactory = function() {
        return new SockJS(`${SOCKET_URL}${url}?access_token=${token}`)
      }
      client.onConnect = () => {
        socket.subscribe(topic, ({ body }) => {
          subscription(JSON.parse(body))
        })
      }

      client.onWebSocketError = function(frame) {
        !!onError && onError(frame)
      }

      client.onWebSocketClose = (e: CloseEvent) => {
        if (e.code == 1002) {
          //Unauthorized access handle
          console.log(e)

          refresh()
            .then(accessToken => {
              client.webSocketFactory = () => {
                return new SockJS(
                  `${SOCKET_URL}${url}?access_token=${accessToken}`
                )
              }
            })
            .catch(() => {
              Router.push('/login')
            })
        }
      }
      const [socket, setSocket] = useState(client)
      useEffect(() => {
        return () => {
          socket.deactivate()
        }
      }, [socket])
      return [socket, setSocket]
    },
    [token]
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
        if (payload.merchant_name) {
          setMerchantName(payload.merchant_name)
        }
        return true
      }),
    [
      parseJwt,
      setMerchantId,
      setMerchantName,
      setRefreshToken,
      setToken,
      setUserId
    ]
  )

  const logout = useCallback(() => {
    setToken(null)
    setRefreshToken(null)
    setUserId(null)
    setMerchantId(null)
    setMerchantName(null)
  }, [setMerchantId, setRefreshToken, setToken, setUserId, setMerchantName])

  return {
    get,
    getRaw,
    put,
    useSocket,
    patch,
    post,
    del,
    token,
    login,
    logout,
    refresh,
    resetPassword,
    userId,
    merchantId,
    merchantName
  }
}
