import { useSettings } from '../hooks'
import { Page } from '../components/organisms'
import { AccountForm } from '../components/templates'

export default () => {
  const { locale, setLocale } = useSettings()

  return (
    <Page activePath="/account">
      <AccountForm locale={locale} setLocale={setLocale} />
    </Page>
  )
}
