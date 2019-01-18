import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { theme, GlobalStyle } from '../style'

export default class extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head key="1">
          <title>Payment Dashboard</title>
          <GlobalStyle />
        </Head>
        <Container key="2">
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Container>
      </>
    )
  }
}
