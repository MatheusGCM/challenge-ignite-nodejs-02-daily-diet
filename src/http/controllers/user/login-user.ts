import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prismaUserRepository } from '@/repositories'
import { compare } from 'bcryptjs'

export async function loginUser(request: FastifyRequest, reply: FastifyReply) {
  const loginUserBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = loginUserBodySchema.parse(request.body)

  try {
    const user = await prismaUserRepository.findByEmail(email)

    if (!user) {
      throw new Error()
    }

    const isValidPassword = await compare(password, user.password_hash)

    if (isValidPassword) {
      const session_id = user.session_id
      reply.setCookie('sessionId', session_id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
      return reply.code(200).send({ message: 'Login successful', session_id })
    }

    throw new Error()
  } catch (error) {
    return reply
      .code(401)
      .send({ error: 'Unauthorized: Invalid username or password' })
  }
}
