import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { theme, GlobalStyle } from '../assets/style'
import { NextContextProvider } from '../hooks/use_next_context'

export default class extends App {
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
          <GlobalStyle />
        </Head>
        <Container>
          <NextContextProvider context={context}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </NextContextProvider>
        </Container>
      </>
    )
  }
}
