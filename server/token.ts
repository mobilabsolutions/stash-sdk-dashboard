import { FastifyInstance, FastifyError } from 'fastify'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET =
  process.env.JWT_SECRET || 'pqriNWfgFqmdtoB{ydysuaP[wKgebF6tPUTdTa'

// import * as fastifyPlugin from 'fastify-plugin'

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

    const token = jwt.sign(
      {
        data: { user: username, merchantId: 1 },
        iat: Math.floor(Date.now() / 1000) + 60 * 5 // 5 min
      },
      JWT_SECRET
    )

    const refreshToken = jwt.sign(
      {
        data: { token },
        iat: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 1 day
      },
      JWT_SECRET
    )

    reply.send({ token, refreshToken })
  })

  next()
}
