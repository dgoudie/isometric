import { Prisma, PrismaClient } from '@prisma/client';

export async function reindexScheduledWorkoutExercises(
  scheduledWorkoutId: string,
  prisma: PrismaClient | Prisma.TransactionClient
): Promise<void> {
  const maxOrderNumberRecord = await prisma.scheduledWorkoutExercise.findFirst({
    where: { scheduledWorkoutId },
    orderBy: {
      orderNumber: 'desc',
    },
  });
  if (!maxOrderNumberRecord) {
    return;
  }
  const maxOrderNumber = maxOrderNumberRecord.orderNumber;
  await reindex(scheduledWorkoutId, maxOrderNumber + 1, prisma);
  await reindex(scheduledWorkoutId, 0, prisma);
}

async function reindex(
  scheduledWorkoutId: string,
  padding: number,
  prisma: PrismaClient | Prisma.TransactionClient
) {
  await prisma.$executeRaw`
    update
      "ScheduledWorkoutExercise" swe
    set
      "orderNumber" = derivedOrder.order - 1 + cast(${padding} as int)
    from
      (
      select
        row_number() over (
      order by
        "orderNumber") as order,
        id
      from
        "ScheduledWorkoutExercise" swe
      where
        "scheduledWorkoutId" = ${scheduledWorkoutId} ) derivedOrder
    where
      "scheduledWorkoutId" = ${scheduledWorkoutId}
      and swe.id = derivedOrder.id
  `;
}
