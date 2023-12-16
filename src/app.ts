import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { userRoutes, mealRoutes } from './http/controllers/routes'

export const app = fastify()

app.register(fastifyCookie)
app.register(userRoutes, { prefix: '/user' })
app.register(mealRoutes, { prefix: '/meal' })
