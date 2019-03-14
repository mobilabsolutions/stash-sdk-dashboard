import { useSettings } from '../hooks'
import { Page } from '../components/organisms'
import { Settings } from '../components/templates'

export default () => {
  const { locale, setLocale } = useSettings()

  return (
    <Page activePath="/account">
      <Settings locale={locale} setLocale={setLocale} />
    </Page>
  )
}
