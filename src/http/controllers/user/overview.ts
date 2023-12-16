import { prismaUserRepository } from '@/repositories'
import { bestSequenceDiet } from '@/utils/best-sequence-diet'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function overview(request: FastifyRequest, reply: FastifyReply) {
  const cookieSchema = z.object({
    sessionId: z.string().uuid(),
  })
  const { sessionId } = cookieSchema.parse(request.cookies)

  const meal = await prismaUserRepository.overview(sessionId)

  const total = meal.length
  const withinDiet = meal.filter((item) => item.isOnDiet).length
  const outsideDiet = meal.filter((item) => !item.isOnDiet).length
  const sequence = bestSequenceDiet(meal)

  return reply.send({
    meal: {
      total,
      within_diet: withinDiet,
      outside_diet: outsideDiet,
      best_sequence_within_diet: sequence,
    },
  })
}
