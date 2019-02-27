import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/style';
import { NextContextProvider } from '../hooks/use_next_context';
const getDisplayName = (Component) => {
    return Component.displayName || Component.name || 'Component';
};
export default (WrappedComponent, { locale = 'en', pathname = '/', query = {}, asPath = '/', cookie = '' } = {}) => {
    const context = {
        pathname,
        query,
        asPath,
        req: {
            headers: {
                'accept-language': locale,
                cookie
            }
        }
    };
    const wrapper = props => {
        return (<NextContextProvider context={context}>
        <ThemeProvider theme={theme}>
          <WrappedComponent {...props}/>
        </ThemeProvider>
      </NextContextProvider>);
    };
    wrapper.displayName = `WithTestSetup(${getDisplayName(WrappedComponent)})`;
    return wrapper;
};
