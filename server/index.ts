process.env.TZ = 'UTC'

require('isomorphic-fetch')

const fs = require('fs')
const fastify = require('fastify')
const proxy = require('fastify-http-proxy')
const Next = require('next')

const PORT = parseInt(process.env.PORT, 10) || 3000
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'
const BIND_ADDRESS = IS_DEVELOPMENT ? '127.0.0.1' : '0.0.0.0'
const API_UPSTREAM = process.env.API_UPSTREAM || 'https://pd.mblb.net'

const nextApp = Next({ dev: IS_DEVELOPMENT })
const handle = nextApp.getRequestHandler()

const prepareDatepicker = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      './node_modules/react-dates/lib/css/_datepicker.css',
      'utf8',
      (error, data) => {
        if (error) return reject(error)

        resolve(
          data
            .replace('#b2f1ec', '#CEFBF9')
            .replace('#80e8e0', '#9DF6F2')
            .replace('#66e2da', '#6BF2EC')
            .replace('#33dacd', '#08E8DE')
            .replace('#00a699', '#07D0C7')
            .replace('#008489', '#048B85')
            .replace('#007a87', '#035C58')
            .replace('#f2f2f2', '#F6F7F7')
            .replace('#e4e7e7', '#EDEFF0')
            .replace('#dbdbdb', '#D1D5D7')
            .replace('#cacccd', '#A3AAAF')
            .replace('#82888a', '#747F86')
            .replace('#757575', '#46545E')
            .replace('#484848', '#22333F')
        )
      }
    )
  })
}

nextApp
  .prepare()
  .then(() => prepareDatepicker())
  .then(datepickerCss => {
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
    server.get('/healthcheck', (_, reply) =>
      reply.send({ uptime: process.uptime() })
    )

    server.get('/static/css/datepicker.css', (_, reply) => {
      reply.type('text/css').send(datepickerCss)
    })
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
