import { useNextContext } from '../use_next_context'

export const useSettings = () => {
  const { locale, setLocale, cookies, setCookie } = useNextContext()

  return {
    locale,
    setLocale,
    token: cookies['__token'],
    setToken: (token: string) => setCookie('__token', token)
  }
}
