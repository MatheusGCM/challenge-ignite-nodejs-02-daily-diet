import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UserRepository } from './@types/user-repository'

export class PrismaUserRepository implements UserRepository {
  async overview(userSessionId: string) {
    const meal = await prisma.meal.findMany({
      where: { user_session_id: userSessionId },
    })

    return meal
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }
}
