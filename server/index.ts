import 'isomorphic-fetch'
import * as fastify from 'fastify'
import * as proxy from 'fastify-http-proxy'
import * as nextJs from 'next'

import prepareDatepickerCss from './prepare_datepicker_css'

process.env.TZ = 'UTC'

const PORT = parseInt(process.env.PORT, 10) || 3000
const API_UPSTREAM = process.env.API_UPSTREAM || 'https://pd.mblb.net'
const KEYCLOAK_UPSTREAM =
  process.env.KEYCLOAK_UPSTREAM || 'http://localhost:9090'
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'
const BIND_ADDRESS = IS_DEVELOPMENT ? '127.0.0.1' : '0.0.0.0'

async function main() {
  const nextApp = nextJs({ dev: IS_DEVELOPMENT })
  const handle = nextApp.getRequestHandler()

  try {
    await nextApp.prepare()
    const datepickerCss = await prepareDatepickerCss()

    const server = fastify()

    // add Proxy
    server.register(proxy, {
      upstream: API_UPSTREAM,
      prefix: '/api/v1',
      rewritePrefix: '/api/v1',
      http2: false
    })

    server.register(proxy, {
      upstream: KEYCLOAK_UPSTREAM,
      prefix: '/auth',
      rewritePrefix: '/auth',
      http2: false
    })

    // add request logging
    server.use((req, _, next) => {
      if (!IS_DEVELOPMENT) {
        if (req.url !== '/healthcheck') {
          console.log(new Date(), req.method, req.url)
        }
      } else {
        if (!req.url.startsWith('/_next')) {
          console.log(new Date(), req.method, req.url)
        }
      }

      next()
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
    server.get('/*', (req, reply) => handle(req.req, reply.res))

    // start server
    await server.listen(PORT, BIND_ADDRESS)
    console.log(`> Ready on http://localhost:${PORT}`)
  } catch (error) {
    console.error('Server init error', error)
    process.exit(1)
  }
}

main()
