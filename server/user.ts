import { FastifyInstance, FastifyError } from 'fastify'

import { verifyToken } from './token'

export default function userPlugin(
  fastify: FastifyInstance,
  _: any,
  next: (err?: FastifyError) => void
) {
  fastify.get('/:id', { preHandler: verifyToken }, (request, reply) => {
    reply.send(request.params.tokenData)
  })

  next()
}
