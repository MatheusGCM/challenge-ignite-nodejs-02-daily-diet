import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { prismaUserRepository } from '@/repositories'
import { hash } from 'bcryptjs'

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerUserBodySchema.parse(request.body)

  const session_id = randomUUID()
  const password_hash = await hash(password, 6)

  reply.setCookie('sessionId', session_id, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  await prismaUserRepository.create({
    name,
    email,
    password_hash,
    session_id,
  })

  return reply.code(201).send()
}
