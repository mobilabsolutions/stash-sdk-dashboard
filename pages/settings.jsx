import { useSettings } from '../hooks';
import { Page, Settings } from '../components/templates';
export default () => {
    const { locale, setLocale, token, setToken } = useSettings();
    return (<Page activePath="/settings">
      <Settings locale={locale} setLocale={setLocale} token={token} setToken={setToken}/>
    </Page>);
};
