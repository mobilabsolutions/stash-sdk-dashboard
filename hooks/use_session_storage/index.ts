import { useState, useEffect } from 'react'

const isClient = typeof window === 'object'

export const useSessionStorage = <T>(
  key: string,
  initialValue?: T
): [T, (value: T) => void] => {
  if (!isClient) {
    return [initialValue as T, () => {}]
  }

  const [state, setState] = useState<T>(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key)
      if (typeof sessionStorageValue !== 'string') {
        sessionStorage.setItem(key, String(initialValue))
        return initialValue
      } else {
        return JSON.parse(sessionStorageValue || 'null')
      }
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      const serializedState = JSON.stringify(state)
      sessionStorage.setItem(key, serializedState)
    } catch {}
  }, [state])

  return [state, setState]
}
