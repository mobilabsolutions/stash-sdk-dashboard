process.env.TZ = 'UTC'

require('isomorphic-fetch')

const fastify = require('fastify')
const proxy = require('fastify-http-proxy')
const Next = require('next')

const PORT = parseInt(process.env.PORT, 10) || 3000
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'
const BIND_ADDRESS = IS_DEVELOPMENT ? '127.0.0.1' : '0.0.0.0'
const API_UPSTREAM = process.env.API_UPSTREAM || 'https://pd.mblb.net'

const nextApp = Next({ dev: IS_DEVELOPMENT })
const handle = nextApp.getRequestHandler()

nextApp
  .prepare()
  .then(() => {
    const server = fastify()

    // add Proxy
    server.register(proxy, {
      upstream: API_UPSTREAM,
      prefix: '/api/v1',
      rewritePrefix: '/api/v1',
      http2: false
    })

    // add request logging
    server.use((req, _, next) => {
      if (!IS_DEVELOPMENT) {
        if (req.originalUrl !== '/healthcheck') {
          console.log(new Date(), req.method, req.originalUrl)
        }
      } else {
        if (!req.originalUrl.startsWith('/_next')) {
          console.log(new Date(), req.method, req.originalUrl)
        }
      }

      next()
    })

    // Add health check endpoint
    server.get('/healthcheck', (req, reply) =>
      reply.send({ uptime: process.uptime() })
    )

    // add next.js
    server.get('/*', (req, reply) => handle(req.req, reply.res))

    // start server
    server.listen(PORT, BIND_ADDRESS, error => {
      if (error) {
        console.error('Server init error (server.listen)', error)
        process.exit(1)
      }
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(error => {
    console.error('Server init error (nextApp.prepare)', error)
    process.exit(1)
  })
