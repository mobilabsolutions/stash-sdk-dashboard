import { FastifyInstance, FastifyError } from 'fastify'
import { NotFound } from 'http-errors'

import {
  getMerchantById,
  updateMerchant,
  getMerchantKeys
} from './data/merchant'
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
      const merchant = await getMerchantById(request.params.id)
      if (!merchant) throw new NotFound('Merchant not found.')

      reply.send(merchant)
    }
  )

  fastify.put(
    '/:id',
    {
      preHandler: verifyToken,
      schema: {
        params: {
          id: { type: 'string' }
        },
        body: {
          id: { type: 'string' },
          name: { type: 'string' },
          defaultCurrencyId: { type: 'string' }
        }
      }
    },
    async (request, reply) => {
      const result = await updateMerchant(request.params.id, request.body)

      if (!result) reply.status(400).send()
      else reply.status(204).send()
    }
  )

  fastify.get(
    '/:id/api-key',
    {
      preHandler: verifyToken,
      schema: {
        params: {
          id: { type: 'string' }
        }
      }
    },
    async (request, reply) => {
      const keys = await getMerchantKeys(request.params.id)

      const result = keys ? { data: keys } : { data: [] }
      reply.send(result)
    }
  )

  next()
}
