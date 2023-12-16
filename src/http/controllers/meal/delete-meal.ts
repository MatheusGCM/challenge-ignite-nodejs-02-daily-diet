import { prismaMealRepository } from '@/repositories'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const cookieSchema = z.object({
    sessionId: z.string().uuid(),
  })
  const paramsSchema = z.object({
    mealId: z.string().uuid(),
  })

  const { sessionId } = cookieSchema.parse(request.cookies)
  const { mealId } = paramsSchema.parse(request.params)

  try {
    await prismaMealRepository.delete(mealId, sessionId)
  } catch (error) {
    reply.status(404).send({ message: 'Record to delete does not exist.' })
  }

  return reply.status(204).send()
}
