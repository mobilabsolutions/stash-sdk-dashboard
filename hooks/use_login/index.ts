import { useState } from 'react'

const isClient = typeof window !== 'undefined'

const KEYCLOAK_HOST = isClient
  ? ''
  : process.env.KEYCLOAK_UPSTREAM || 'http://localhost:9090'
const KEYCLOAK_PATH = '/auth/realms/master/protocol/openid-connect/token'

const keyCloakApi = async (keycloakUri: string, body: object) => {
  const request: any = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: Object.keys(body)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
      .join('&')
  }

  const response = await fetch(keycloakUri, request)
  if (response.status >= 400) {
    const error: any = new Error('Key Cloak Error')
    error.statusCode = response.status
    throw error
  }
  const token = await response.json()
  isClient && window.sessionStorage.setItem('TOKEN', JSON.stringify(token))
  return token
}

export const useLogin = () => {
  const [token, setToken] = useState(null)

  const login = (username: string, password: string) =>
    keyCloakApi(KEYCLOAK_HOST + KEYCLOAK_PATH, {
      username,
      password,
      grant_type: 'password',
      client_id: 'dashboard'
    }).then(loginToken => setToken(loginToken))

  const logout = () => {
    isClient && window.sessionStorage.removeItem('TOKEN')
    setToken(null)
  }

  return { login, logout, token }
}
