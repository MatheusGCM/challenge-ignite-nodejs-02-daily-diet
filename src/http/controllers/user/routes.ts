import { FastifyInstance } from 'fastify'
import { registerUser, overview, loginUser } from './'
import { checkSessionIdExists } from '@/middlewares/check-session-id-exists'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', registerUser)
  app.get('/overview', { preHandler: [checkSessionIdExists] }, overview)
  app.post('/login', loginUser)
}
