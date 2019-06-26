import { useState, useEffect } from 'react'
import { useSessionStorage } from '../use_session_storage'

/**
 * Gives a way to store in session storage a state (or part of it), so it can be used as an initial state.
 *
 * @param key Session storage key
 * @param initial Initial value
 * @param setStored Decide how and what from state should be saved to session storage
 * @param getInitial Get initial value for state with initial and stored state
 */
export default function<T>(
  key: string,
  initial: T,
  setStored = (state: T): any => state,
  getInitial = (state: T, stored: any): T => ({ ...state, ...stored })
) {
  const [_stored_state, _setStoredState] = useSessionStorage(key, initial)
  const a = useState<T>(getInitial(initial, _stored_state))

  useEffect(() => {
    _setStoredState(setStored(a[0]))
  }, [a[0]])

  return a
}
