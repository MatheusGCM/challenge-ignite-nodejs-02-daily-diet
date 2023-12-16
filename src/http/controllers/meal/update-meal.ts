import { prismaMealRepository } from '@/repositories'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const updateMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.string(),
    time: z.string(),
    isOnDiet: z.boolean(),
  })
  const paramsSchema = z.object({
    mealId: z.string().uuid(),
  })
  const cookieSchema = z.object({
    sessionId: z.string().uuid(),
  })

  const { name, description, date, time, isOnDiet } =
    updateMealBodySchema.parse(request.body)
  const { mealId } = paramsSchema.parse(request.params)
  const { sessionId } = cookieSchema.parse(request.cookies)

  const data = {
    name,
    description,
    date,
    time,
    isOnDiet,
    user: { connect: { session_id: sessionId } },
  }

  try {
    await prismaMealRepository.update(mealId, data, sessionId)
  } catch (error) {
    reply.status(404).send({ message: 'Record to update not found.' })
  }
  return reply.code(204).send()
}
