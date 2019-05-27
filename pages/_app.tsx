import App, { Container } from 'next/app'
import Head from 'next/head'

import { theme } from '../assets/style'
import { ThemeProvider } from '../components/styled'
import { NextContextProvider } from '../hooks/use_next_context'
import { ToastProvider } from '../hooks/use_toast'
import { ThemeProvider as NewTheme } from '@zendeskgarden/react-theming'
import '@zendeskgarden/react-pagination/dist/styles.css'
type Props = {
  context: object
}

export default class extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps,
      context: {
        pathname: ctx.pathname,
        query: ctx.query,
        asPath: ctx.asPath,
        req: ctx.req && {
          headers: ctx.req.headers
        }
      }
    }
  }

  render() {
    const { Component, pageProps, context } = this.props

    return (
      <>
        <Head>
          <title>Payment Dashboard</title>
        </Head>
        <Container>
          <NextContextProvider context={context}>
            <ThemeProvider theme={theme}>
              <NewTheme>
                <ToastProvider>
                  <Component {...pageProps} />
                </ToastProvider>
              </NewTheme>
            </ThemeProvider>
          </NextContextProvider>
        </Container>
      </>
    )
  }
}
