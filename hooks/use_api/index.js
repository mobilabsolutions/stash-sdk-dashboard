import { useNextContext } from '../use_next_context'

const BACKEND_HOST =
  typeof window !== 'undefined'
    ? ''
    : process.env.API_UPSTREAM || 'https://pd.mblb.net'

const apiCall = (token, method, path, content = null) => {
  const request = {
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
          const error = new Error('Api Server Error')
          error.statusCode = response.status
          error.statusText = response.statusText
          return reject(error)
        }

        if (response.status >= 400) {
          return response
            .json()
            .then(json => {
              const error = new Error('Api User Error')
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
  const { cookies } = useNextContext()

  const token = cookies['__token']

  const get = path => apiCall(token, 'GET', path)
  const put = (path, content) => apiCall(token, 'PUT', path, content)
  const patch = (path, content) => apiCall(token, 'PATCH', path, content)
  const post = (path, content) => apiCall(token, 'POST', path, content)
  const del = (path, content) => apiCall(token, 'DELETE', path, content)

  return { get, put, patch, post, del, token }
}