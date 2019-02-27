import React, { useContext, useState } from 'react';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment/locale/de';
const isClient = typeof window === 'object';
const nextContext = React.createContext(null);
nextContext.displayName = 'NextContext';
export const useNextContext = () => {
    const { pathname, query, asPath, req, cookies, setCookie, locale, setLocale } = useContext(nextContext);
    return {
        pathname,
        query,
        asPath,
        req,
        cookies,
        setCookie,
        locale,
        setLocale
    };
};
const getCookies = req => {
    const cookieString = req && !isClient ? req.headers['cookie'] : document.cookie;
    if (!cookieString)
        return {};
    return cookieString
        .split(';')
        .filter(item => item)
        .map(item => item.trim().split('='))
        .reduce((result, [key, ...values]) => {
        result[key] = values.join('=');
        return result;
    }, {});
};
const getLocale = req => {
    const locales = req
        ? (req.headers['accept-language'] || 'en')
            .split(',')
            .map((item) => {
            const match = item.match(/([a-z]{2}(-[A-Z]{2})?)/);
            if (match)
                return match[1];
            return null;
        })
            .filter((item) => item !== null)
        : navigator.languages;
    return locales.length > 0 ? locales[0] : 'en';
};
export const NextContextProvider = ({ children, context }) => {
    const [cookies, setStateCookies] = useState(getCookies(context.req));
    const setCookie = (key, value, expiryDate = null) => {
        if (!isClient)
            return;
        setStateCookies(prevCookies => ({ ...prevCookies, [key]: value }));
        if (expiryDate) {
            document.cookie = `${encodeURI(key)}=${encodeURI(value)}; expires=${expiryDate}`;
        }
        else {
            document.cookie = `${encodeURI(key)}=${encodeURI(value)}`;
        }
    };
    const locale = cookies['__locale'] || getLocale(context.req);
    moment.locale(locale);
    const setLocale = (locale) => {
        if (!isClient)
            return;
        moment.locale(locale);
        setCookie('__locale', locale);
    };
    const providerValue = {
        ...context,
        cookies,
        setCookie,
        locale,
        setLocale
    };
    return (<nextContext.Provider value={providerValue}>
      {children}
    </nextContext.Provider>);
};
