import { useCallback } from 'react'

import { useApi } from '../use_api'

export const usePassword = () => {
  const { put, merchantId, userId } = useApi()

  const changePassword = useCallback(
    (oldPassword, newPassword) => {
      return put(
        `/api/v1/merchant/${encodeURIComponent(
          merchantId
        )}/user/${encodeURIComponent(userId)}/change-password`,
        { oldPassword, newPassword }
      )
    },
    [merchantId, put, userId]
  )

  return { changePassword }
}
