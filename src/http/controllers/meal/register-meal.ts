import { prismaMealRepository } from '@/repositories'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function registerMeal(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerMealBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.string(),
    time: z.string(),
    isOnDiet: z.boolean(),
  })

  const { name, description, date, time, isOnDiet } =
    registerMealBodySchema.parse(request.body)

  const { sessionId } = request.cookies

  await prismaMealRepository.create({
    name,
    description,
    date,
    time,
    isOnDiet,
    user: { connect: { session_id: sessionId } },
  })

  return reply.code(201).send()
}
