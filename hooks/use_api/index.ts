import { useCallback } from 'react'
import { useNextContext } from '../use_next_context'

const BACKEND_HOST =
  typeof window !== 'undefined'
    ? ''
    : process.env.API_UPSTREAM || 'https://pd.mblb.net'

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

export const useApi = () => {
  const { cookies, setCookie } = useNextContext()

  const token = cookies['__token']
  const refreshToken = cookies['__refreshToken']

  const refresh = useCallback(
    () =>
      apiCall(refreshToken, null, 'POST', '/api/v1/token/refresh', null).then(
        ({ result: { refreshToken, accessToken } }) => {
          setCookie('__token', accessToken)
          setCookie('__refreshToken', refreshToken)

          return accessToken
        }
      ),
    [refreshToken, setCookie]
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
      apiCall(null, null, 'POST', '/api/v1/token', { username, password }).then(
        ({ result: { refreshToken, accessToken } }) => {
          setCookie('__token', accessToken)
          setCookie('__refreshToken', refreshToken)
        }
      ),
    [setCookie]
  )

  const logout = useCallback(() => {
    setCookie('__token', null)
    setCookie('__refreshToken', null)
  }, [setCookie])

  return { get, put, patch, post, del, token, login, logout, refresh }
}
