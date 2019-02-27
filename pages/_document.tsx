import React from 'react'
import Document, { Main, NextScript, Head } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { globalStyle } from '../assets/style'

type Props = {
  styleTags: any
}

export default class extends Document<Props> {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    const { styleTags } = this.props

    return (
      <html>
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" href="/static/icons/icon-32x32.png" sizes="32x32" />
          <link
            rel="icon"
            href="/static/icons/icon-192x192.png"
            sizes="192x192"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="/static/icons/icon-180x180.png"
          />
          <style type="text/css" dangerouslySetInnerHTML={globalStyle} />
          <link rel="stylesheet" href="/static/css/datepicker.css" />
          {styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
