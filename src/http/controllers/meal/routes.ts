import { FastifyInstance } from 'fastify'
import { checkSessionIdExists } from '@/middlewares/check-session-id-exists'
import { registerMeal, selectMeals, deleteMeals, updateMeal } from './'

export async function mealRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [checkSessionIdExists] }, registerMeal)
  app.get('/:mealId?', { preHandler: [checkSessionIdExists] }, selectMeals)
  app.delete('/:mealId', { preHandler: [checkSessionIdExists] }, deleteMeals)
  app.put('/:mealId', { preHandler: [checkSessionIdExists] }, updateMeal)
}
