import { useNextContext } from '../use_next_context'

const BACKEND_HOST =
  typeof window !== 'undefined'
    ? ''
    : process.env.API_UPSTREAM || 'https://pd.mblb.net'

const apiCall = (
  token: string,
  method: string,
  path: string,
  content: object = null
) => {
  const request: any = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'include'
  }

  if (content) {
    request.body = JSON.stringify(content)
  }

  const url = `${BACKEND_HOST}${path}`

  return new Promise((resolve, reject) => {
    fetch(url, request)
      .then(response => {
        if (response.status >= 500) {
          const error: any = new Error('Api Server Error')
          error.statusCode = response.status
          error.statusText = response.statusText
          return reject(error)
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
          .then(json =>
            resolve({ result: json.result, statusCode: response.status })
          )
          .catch(reject)
      })
      .catch(reject)
  })
}

export const useApi = () => {
  const { cookies, setCookie } = useNextContext()

  const token = cookies['__token']

  const get = (path: string) => apiCall(token, 'GET', path)
  const put = (path: string, content: object) =>
    apiCall(token, 'PUT', path, content)
  const patch = (path: string, content: object) =>
    apiCall(token, 'PATCH', path, content)
  const post = (path: string, content: object) =>
    apiCall(token, 'POST', path, content)
  const del = (path: string) => apiCall(token, 'DELETE', path)

  const login = (username: string, password: string) =>
    apiCall(null, 'POST', '/api/v1/token', { username, password }).then(
      ({ result: { token } }) => setCookie('__token', token)
    )

  const logout = () => setCookie('__token', null)

  return { get, put, patch, post, del, token, login, logout }
}
