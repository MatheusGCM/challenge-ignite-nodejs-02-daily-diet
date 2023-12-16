import { Meal, Prisma, User } from '@prisma/client'

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  overview(userSessionId: string): Promise<Meal[]>
  findByEmail(email: string): Promise<User | null>
}
