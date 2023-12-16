import { prisma } from '@/lib/prisma'
import { Meal, Prisma } from '@prisma/client'
import { MealRepository } from './@types/meal-repository'

export class PrismaMealRepository implements MealRepository {
  async update(
    mealId: string,
    data: Prisma.MealCreateInput,
    userSessionId: string,
  ) {
    const meal = await prisma.meal.update({
      data,
      where: { id: mealId, AND: { user_session_id: userSessionId } },
    })

    return meal
  }

  async delete(mealId: string, userSessionId: string) {
    await prisma.meal.delete({
      where: { id: mealId, AND: { user_session_id: userSessionId } },
    })
  }

  async findUniqueMeal(mealId: string, userSessionId: string) {
    const meal = await prisma.meal.findUnique({
      where: { id: mealId, AND: { user_session_id: userSessionId } },
    })

    if (!meal) return {} as Meal

    return meal
  }

  async findManyMeals(userSessionId: string) {
    const meal = await prisma.meal.findMany({
      where: { user_session_id: userSessionId },
    })

    return meal
  }

  async create(data: Prisma.MealCreateInput) {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }
}
