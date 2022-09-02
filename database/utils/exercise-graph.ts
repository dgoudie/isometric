import { Prisma, PrismaClient } from '@prisma/client';

export type ExerciseGraphListType = {
  repetitions?: number;
  resistanceInPounds?: number;
  timeInSeconds?: number;
  performedAt: Date;
};

export async function getExerciseGraphData(
  userId: string,
  exerciseId: string,
  prisma: PrismaClient | Prisma.TransactionClient
): Promise<ExerciseGraphListType[]> {
  return prisma.$queryRaw<ExerciseGraphListType[]>`
    with allSetsWithDataJoined as (
    select
      fwes.*,
      fw."startedAt" as "performedAt",
      e."exerciseType"
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
      e.id = ${exerciseId} and e."userId" = ${userId})
      select
      "repetitions",
      "resistanceInPounds",
      "timeInSeconds",
      "performedAt"
    from
      (
      select
        *,
        case
          when "exerciseType" = 'weighted' then row_number() over(partition by "finishedWorkoutExerciseId"
        order by
          "resistanceInPounds" desc nulls last)
          when "exerciseType" = 'timed' then row_number() over(partition by "finishedWorkoutExerciseId"
        order by
          "timeInSeconds" desc nulls last)
          when "exerciseType" = 'assisted' then row_number() over(partition by "finishedWorkoutExerciseId"
        order by
          "resistanceInPounds" asc nulls last)
          when "exerciseType" = 'rep_based' then row_number() over(partition by "finishedWorkoutExerciseId"
        order by
          "repetitions" desc nulls last)
        end as rank
      from
          allSetsWithDataJoined)
    where
      rank = 1
      and (
      ("exerciseType" = 'weighted'
        and repetitions is not null
        and "resistanceInPounds" is not null)
      or ("exerciseType" = 'timed'
        and "timeInSeconds" is not null)
      or ("exerciseType" = 'assisted'
        and repetitions is not null
        and "resistanceInPounds" is not null)
      or ("exerciseType" = 'rep_based'
        and repetitions is not null)
      )
    order by
      "performedAt"
  `;
}
