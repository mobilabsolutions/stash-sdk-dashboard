import { createContext } from 'react'
import { useSessionStorage } from '../use_session_storage'

export const sessionContext = createContext(null)
sessionContext.displayName = 'SessionContext'

export const SessionProvider = ({ children }) => {
  const [token, setToken] = useSessionStorage('access_token', '')
  const [refreshToken, setRefreshToken] = useSessionStorage('refresh_token', '')
  const [userId, setUserId] = useSessionStorage('user_id', '')
  const [merchantId, setMerchantId] = useSessionStorage('merchant_id', '')
  return (
    <sessionContext.Provider
      value={{
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        userId,
        setUserId,
        merchantId,
        setMerchantId
      }}
    >
      {children}
    </sessionContext.Provider>
  )
}
