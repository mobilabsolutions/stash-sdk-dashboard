import { useCallback } from 'react'
import { useSessionStorage } from '../use_session_storage'

const BACKEND_HOST =
  typeof window !== 'undefined'
    ? ''
    : process.env.API_UPSTREAM || 'https://payment-dev.mblb.net'

const apiCall = (
  token: string,
  refresh: () => Promise<void>,
  method: string,
  path: string,
  content: object = null
) => {
  const request: any = token
    ? {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      }
    : {
        method,
        headers: {
          'Content-Type': 'application/json'
        }
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
            return refresh().then(accessToken => {
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
  const [token, setToken] = useSessionStorage('token', '')
  const [refreshToken, setRefreshToken] = useSessionStorage('refreshToken', '')

  const refresh = useCallback(
    () =>
      oauthApi('/api/v1/oauth/token', {
        grant_type: 'password',
        client_id: 'payment-dashboard-client',
        refresh_token: refreshToken
      }).then(({ access_token, refresh_token }) => {
        setToken(access_token)
        setRefreshToken(refresh_token)
        return access_token
      }),
    [refreshToken, setRefreshToken, setToken]
  )

  const get = useCallback(
    (path: string) => apiCall(token, refresh, 'GET', path),
    [refresh, token]
  )
  const put = useCallback(
    (path: string, content: object) =>
      apiCall(token, refresh, 'PUT', path, content),
    [refresh, token]
  )
  const patch = useCallback(
    (path: string, content: object) =>
      apiCall(token, refresh, 'PATCH', path, content),
    [refresh, token]
  )
  const post = useCallback(
    (path: string, content: object) =>
      apiCall(token, refresh, 'POST', path, content),
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

        return true
      }),
    [setRefreshToken, setToken]
  )

  const logout = useCallback(() => {
    setToken(null)
    setRefreshToken(null)
  }, [setRefreshToken, setToken])

  return { get, put, patch, post, del, token, login, logout, refresh }
}
