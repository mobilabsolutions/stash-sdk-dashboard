import App, { Container } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { theme, GlobalStyle } from '../components/style'
import { LocaleProvider } from '../hooks/use_localization'

const getLocale = req => {
  const locales = req
    ? (req.headers['accept-language'] || 'en')
        .split(',')
        .map(item => {
          const match = item.match(/([a-z]{2}(-[A-Z]{2})?)/)
          if (match) return match[1]
          return null
        })
        .filter(item => item !== null)
    : navigator.languages

  return locales.length > 0 ? locales[0] : 'en'
}

export default class extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, locale: getLocale(ctx.req) }
  }

  render() {
    const { Component, pageProps, locale } = this.props

    return (
      <>
        <Head>
          <title>Payment Dashboard</title>
          <GlobalStyle />
        </Head>
        <Container>
          <LocaleProvider value={locale}>
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
          </LocaleProvider>
        </Container>
      </>
    )
  }
}
