import { IS_DEVELOPMENT } from './env'
import { FastifyInstance } from 'fastify'

const FAKE_DATA = [
  {
    transactionId: 1,
    status: 'declined',
    timestamp: new Date(2019, 1, 19),
    reason: 'reason 1',
    currency: 'EUR',
    amount: 123,
    customerId: 1
  },
  {
    transactionId: 2,
    status: 'rejected',
    timestamp: new Date(2019, 1, 20),
    reason: 'reason 22',
    currency: 'EUR',
    amount: 32,
    customerId: 1
  },
  {
    transactionId: 6,
    status: 'authorised',
    timestamp: new Date(2019, 1, 23),
    reason: 'reason 2',
    currency: 'EUR',
    amount: 352,
    customerId: 1
  },
  {
    transactionId: 3,
    status: 'cancelled',
    timestamp: new Date(2019, 1, 19, 22, 32, 44, 0),
    reason: 'reason 12',
    currency: 'EUR',
    amount: 3,
    customerId: 1
  },
  {
    transactionId: 5,
    status: 'captured',
    timestamp: new Date(2019, 1, 19, 2, 32, 44, 0),
    reason: 'reason 12',
    currency: 'EUR',
    amount: 3,
    customerId: 1
  },
  {
    transactionId: 4,
    status: 'declined',
    timestamp: new Date(2019, 1, 23),
    reason: 'reason 5',
    currency: 'EUR',
    amount: 13,
    customerId: 1
  }
]

export function crateFakeTransactions(server: FastifyInstance) {
  if (IS_DEVELOPMENT) {
    server.get('/api/v1/transactions', (req, reply) => {
      const { status } = req.params
      if (status == 'all' || !status) reply.send({ transactions: FAKE_DATA })
      else
        reply.send({
          transactions: FAKE_DATA.filter(function(trn) {
            return trn.status === status
          })
        })
    })
  }
}

export function fakeRefund(server: FastifyInstance) {
  if (IS_DEVELOPMENT) {
    server.put('/api/v1/payment/refund', (req, reply) => {
      if (req)
        reply.send({
          action: 'REFUND',
          amount: 0,
          currency: 'EUR',
          status: 'SUCCESS'
        })
    })
    server.put('/api/v1/payment/reverse', (req, reply) => {
      if (req)
        reply.send({
          action: 'REVERSAL',
          amount: 0,
          currency: 'EUR',
          status: 'SUCCESS'
        })
    })
    server.put('/api/v1/payment/capture', (req, reply) => {
      if (req)
        reply.send({
          action: 'CAPTURE',
          amount: 0,
          currency: 'EUR',
          status: 'SUCCESS'
        })
    })
  }
}
