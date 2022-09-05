import {
  ExerciseType,
  FinishedWorkoutExerciseSet,
  Prisma,
  PrismaClient,
} from '@prisma/client';

type PersonalBestSetWithRank = {
  resistanceInPounds: number | null;
  repetitions: number | null;
  timeInSeconds: number | null;
  exerciseId: string;
  performedAt: Date;
  rank: BigInt;
};

export type PersonalBestSet = Omit<PersonalBestSetWithRank, 'rank'>;

export async function getPersonalBestsForExerciseIds(
  userId: string,
  exerciseIds: string[],
  prisma: PrismaClient | Prisma.TransactionClient
): Promise<Map<string, PersonalBestSet>> {
  if (exerciseIds.length === 0) {
    return new Map();
  }
  const result = await prisma.$queryRaw<PersonalBestSetWithRank[]>`
  with allSetsWithDataJoined as (
  select
    e.id as "exerciseId",
    fw."startedAt" as "performedAt",
    e."exerciseType",
    fwes.*
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
      e."userId" = ${userId} and e.id in (${Prisma.join(exerciseIds)}))
    select
    *
  from
    (
    select
      "exerciseId",
      "performedAt",
      repetitions,
      "timeInSeconds",
      "resistanceInPounds",
      row_number() over(partition by "exerciseId"
    order by
      "resistanceInPounds" desc nulls last,
      repetitions desc nulls last,
      "performedAt" asc) as rank
    from
      allSetsWithDataJoined
    where
      "exerciseType" = 'weighted'
      and (repetitions is not null
        and "resistanceInPounds" is not null))
  where
    rank = 1
  union
    select
    *
  from
    (
    select
      *,
      row_number() over(partition by "exerciseId"
    order by
      repetitions desc nulls last,
      "performedAt" asc) as rank
    from
      (
      select
        "exerciseId",
        "performedAt",
        sum(repetitions) as repetitions,
        sum("timeInSeconds") as "timeInSeconds",
        sum("resistanceInPounds") as "resistanceInPounds"
      from
        allSetsWithDataJoined
      where
        ("exerciseType" = 'rep_based'
          and repetitions is not null)
        or ("exerciseType" = 'timed'
          and "timeInSeconds" is not null)
      group by
        "finishedWorkoutExerciseId",
        "performedAt",
        "exerciseId")
        )
  where
    rank = 1
  union
    select
    *
  from
    (
    select
      "exerciseId",
      "performedAt",
      repetitions,
      "timeInSeconds",
      "resistanceInPounds",
      row_number() over(partition by "exerciseId"
    order by
      "resistanceInPounds" asc nulls last,
      repetitions desc nulls last,
      "performedAt" asc) as rank
    from
      allSetsWithDataJoined
    where
      "exerciseType" = 'assisted'
      and (repetitions is not null
        and "resistanceInPounds" is not null))
  where
    rank = 1
  `;
  return new Map(
    result.map(({ rank, ...personalBestSet }) => [
      personalBestSet.exerciseId,
      personalBestSet,
    ])
  );
}
