import { Meal } from '@prisma/client'

export function bestSequenceDiet(data: Meal[]): number {
  let currentSequence = 0
  let bestSequenceDiet = 0

  for (const meal of data) {
    if (meal.isOnDiet) {
      currentSequence++
      if (currentSequence > bestSequenceDiet) {
        bestSequenceDiet = currentSequence
      }
    } else {
      currentSequence = 0
    }
  }

  return bestSequenceDiet
}
