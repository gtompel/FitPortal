import { prisma } from "@/lib/prisma"

export async function getFreeWorkouts() {
  "use server"
  
  const workouts = await prisma.workout.findMany({
    where: {
      isFree: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return workouts
} 