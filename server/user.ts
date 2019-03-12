import { FastifyInstance, FastifyError } from 'fastify'
import { NotFound } from 'http-errors'

import { verifyToken } from './token'
import { findUserById, updateUser, changePassword } from './data/user'

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
      const user = await findUserById(parseInt(request.params.id, 10))
      if (!user) {
        throw new NotFound('User not found.')
      }

      console.log(user)
      reply.send(user)
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
          firstname: { type: 'string' },
          lastname: { type: 'string' },
          locale: { type: 'string' }
        }
      }
    },
    async (request, reply) => {
      const result = await updateUser(
        parseInt(request.params.id, 10),
        request.body
      )

      if (!result) reply.status(400).send()
      else reply.status(204).send()
    }
  )

  fastify.post(
    '/:id/change-password',
    {
      preHandler: verifyToken,
      schema: {
        params: {
          id: { type: 'string' }
        },
        body: {
          oldPassword: { type: 'string' },
          newpassword: { type: 'string' }
        }
      }
    },
    async (request, reply) => {
      const result = await changePassword(
        parseInt(request.params.id, 10),
        request.body.oldPassword,
        request.body.newPassword
      )

      if (!result) reply.status(400).send()
      else reply.status(204).send()
    }
  )

  next()
}
