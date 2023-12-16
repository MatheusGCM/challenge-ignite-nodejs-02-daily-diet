import { Prisma, Meal } from '@prisma/client'

export interface MealRepository {
  create(data: Prisma.MealCreateInput): Promise<Meal>
  findUniqueMeal(mealId: string, userSessionId: string): Promise<Meal>
  findManyMeals(mealId: string, userSessionId: string): Promise<Meal[]>
  delete(mealId: string, userSessionId: string): void
  update(
    mealId: string,
    data: Prisma.MealCreateInput,
    userSessionId: string,
  ): Promise<Meal>
}
