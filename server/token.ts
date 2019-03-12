import {
  FastifyInstance,
  FastifyError,
  FastifyRequest,
  DefaultQuery,
  DefaultParams,
  DefaultHeaders
} from 'fastify'
import { IncomingMessage } from 'http'

import * as jwt from 'jsonwebtoken'
import { Unauthorized } from 'http-errors'

import { JWT_SECRET } from './env'

export function verifyToken(
  request: FastifyRequest<
    IncomingMessage,
    DefaultQuery,
    DefaultParams,
    DefaultHeaders,
    any
  >,
  _: any,
  done: (error?: Error) => void
) {
  const token = request.cookies['__token']
  if (!token) {
    return done(new Unauthorized('No Token'))
  }

  jwt.verify(token, JWT_SECRET, (error: Error, payload: any) => {
    if (error) {
      done(new Unauthorized('Token is not valid'))
    }

    request.params.tokenData = payload

    done()
  })
}

export default function tokenPlugin(
  fastify: FastifyInstance,
  _: any,
  next: (err?: FastifyError) => void
) {
  fastify.post('/', (request, reply) => {
    const { username, password } = request.body

    if (username !== password) {
      reply.status(404).send()
      return
    }

    const accessToken = jwt.sign(
      {
        data: { user: username, merchantId: 1 },
        iat: Math.floor(Date.now() / 1000) + 60 * 5 // 5 min
      },
      JWT_SECRET
    )

    const refreshToken = jwt.sign(
      {
        accessToken,
        iat: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 1 day
      },
      JWT_SECRET
    )

    reply.send({ accessToken, refreshToken })
  })

  fastify.post('/refresh', (request, reply) => {
    const authHeader = request.headers.authorization
    if (!authHeader || authHeader.length <= 7) {
      reply.status(401).send()
      return
    }

    const tokenString = authHeader.slice(7)

    jwt.verify(tokenString, JWT_SECRET, (error: Error, payload: any) => {
      if (error) {
        reply.status(401).send()
        return
      }

      if (!payload.accessToken) {
        reply.status(400).send()
        return
      }

      const oldToken: any = jwt.decode(payload.accessToken)

      const accessToken = jwt.sign(
        {
          data: oldToken.data,
          iat: Math.floor(Date.now() / 1000) + 60 * 5 // 5 min
        },
        JWT_SECRET
      )

      const refreshToken = jwt.sign(
        {
          accessToken,
          iat: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 1 day
        },
        JWT_SECRET
      )

      reply.send({ accessToken, refreshToken })
    })
  })

  next()
}
