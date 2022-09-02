import { Prisma, PrismaClient } from '@prisma/client';

type LastPerformedListType = {
  exerciseId: string;
  lastPerformedAt: Date;
};

export async function getLastPerformedForExerciseIds(
  userId: string,
  exerciseIds: string[],
  prisma: PrismaClient | Prisma.TransactionClient
): Promise<Map<string, Date>> {
  if (exerciseIds.length === 0) {
    return new Map();
  }
  const result = await prisma.$queryRaw<LastPerformedListType[]>`
    select
      e.id as "exerciseId",
      max(fw."startedAt") as "lastPerformedAt"
    from
      "FinishedWorkoutExerciseSet" fwes
    left join "FinishedWorkoutExercise" fwe on
      fwe.id = fwes."finishedWorkoutExerciseId"
    left join "FinishedWorkout" fw on
      fw.id = fwe."finishedWorkoutId"
    left join "Exercise" e on
      (fwe."exerciseId" = e.id
        or (fwe."name" = e."name"
          and fw."userId" = e."userId"))
    where
      e.id in (${Prisma.join(exerciseIds)})
      and fw."userId" = ${userId}
    group by
      e.id
  `;
  return new Map(
    result.map((result) => [result.exerciseId, result.lastPerformedAt])
  );
}
