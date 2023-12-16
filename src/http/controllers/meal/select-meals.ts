import { prismaMealRepository } from '@/repositories'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function selectMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cookieSchema = z.object({
    sessionId: z.string().uuid(),
  })
  const paramsSchema = z.object({
    mealId: z.string().uuid().optional(),
  })

  let meal
  const { mealId } = paramsSchema.parse(request.params)
  const { sessionId } = cookieSchema.parse(request.cookies)

  if (mealId) {
    meal = await prismaMealRepository.findUniqueMeal(mealId, sessionId)
  } else {
    meal = await prismaMealRepository.findManyMeals(sessionId)
  }

  return reply.send({ meal })
}
