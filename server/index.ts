import 'isomorphic-fetch'
import * as fastify from 'fastify'
import * as proxy from 'fastify-http-proxy'
import * as nextJs from 'next'

import prepareDatepickerCss from './prepare_datepicker_css'

import { PORT, API_UPSTREAM, IS_DEVELOPMENT, BIND_ADDRESS } from './env'

process.env.TZ = 'UTC'

const server = fastify({ logger: true })

function polyfillIntl() {
  const areIntlLocalesSupported = require('intl-locales-supported')
  const localesMyAppSupports = ['en', 'de']

  if (global.Intl) {
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
      const IntlPolyfill = require('intl')
      Intl.NumberFormat = IntlPolyfill.NumberFormat
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
    }
  } else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl')
  }
}

polyfillIntl()

async function main() {
  const nextApp = nextJs({ dev: IS_DEVELOPMENT, quiet: !IS_DEVELOPMENT })
  const handle = nextApp.getRequestHandler()

  try {
    await nextApp.prepare()
    const datepickerCss = await prepareDatepickerCss()

    // add Proxy
    server.register(proxy, {
      upstream: API_UPSTREAM,
      prefix: '/api/v1',
      rewritePrefix: '/api/v1',
      http2: false
    })

    // Add health check endpoint
    server.get('/healthcheck', (_, reply) => {
      reply.send({ uptime: process.uptime() })
    })

    // changed datepicker css
    server.get('/static/css/datepicker.css', (_, reply) => {
      reply.type('text/css').send(datepickerCss)
    })

    // add next.js
    server.get('/*', (req, reply) => {
      handle(req.req, reply.res)
    })

    // start server
    await server.listen(PORT, BIND_ADDRESS)
    server.log.info({ url: `http://localhost:${PORT}` }, 'Server is ready')
  } catch (error) {
    server.log.error(error, 'Server init error')
    process.exit(1)
  }
}

main()
