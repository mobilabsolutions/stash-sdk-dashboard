import { FastifyInstance, FastifyError } from 'fastify'
import { NotFound } from 'http-errors'

import { findMerchantById } from './data/merchant'
import { verifyToken } from './token'

export default function userPlugin(
  fastify: FastifyInstance,
  _: any,
  next: (err?: FastifyError) => void
) {
  fastify.get(
    '/:id',
    {
      preHandler: verifyToken,
      schema: {
        params: {
          id: { type: 'string' }
        }
      }
    },
    async (request, reply) => {
      const merchant = await findMerchantById(request.params.id)
      if (!merchant) throw new NotFound('Merchant not found.')

      reply.send(merchant)
    }
  )

  next()
}
