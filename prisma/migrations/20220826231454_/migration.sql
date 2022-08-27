/*
  Warnings:

  - You are about to drop the column `createdAt` on the `FinishedWorkout` table. All the data in the column will be lost.
  - You are about to drop the column `dayNumber` on the `FinishedWorkout` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseInSchedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduleDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutCheckin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutExerciseSet` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[startedAt]` on the table `FinishedWorkout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNumber` to the `FinishedWorkout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `FinishedWorkout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExerciseInSchedule" DROP CONSTRAINT "ExerciseInSchedule_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "ExerciseInSchedule" DROP CONSTRAINT "ExerciseInSchedule_scheduleDayUserId_scheduleDayOrderNumbe_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleDay" DROP CONSTRAINT "ScheduleDay_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_scheduleDayOrderNumber_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutCheckin" DROP CONSTRAINT "WorkoutCheckin_workoutUserId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_workoutUserId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_workoutUserId_scheduleDayOrderNumber_order_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseSet" DROP CONSTRAINT "WorkoutExerciseSet_workoutExerciseUserId_workoutExerciseOr_fkey";

-- DropIndex
DROP INDEX "FinishedWorkout_createdAt_idx";

-- DropIndex
DROP INDEX "FinishedWorkout_createdAt_key";

-- AlterTable
ALTER TABLE "FinishedWorkout" DROP COLUMN "createdAt";
ALTER TABLE "FinishedWorkout" DROP COLUMN "dayNumber";
ALTER TABLE "FinishedWorkout" ADD COLUMN     "orderNumber" INT4 NOT NULL;
ALTER TABLE "FinishedWorkout" ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL;
ALTER TABLE "FinishedWorkout" ALTER COLUMN "endedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "ExerciseInSchedule";

-- DropTable
DROP TABLE "ScheduleDay";

-- DropTable
DROP TABLE "Workout";

-- DropTable
DROP TABLE "WorkoutCheckin";

-- DropTable
DROP TABLE "WorkoutExercise";

-- DropTable
DROP TABLE "WorkoutExerciseSet";

-- CreateTable
CREATE TABLE "ScheduledWorkout" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "nickname" STRING NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduledWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduledWorkoutExercise" (
    "exerciseId" UUID NOT NULL,
    "scheduledWorkoutUserId" UUID NOT NULL,
    "scheduledWorkoutOrderNumber" INT4 NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "setCount" INT4 NOT NULL,
    "timePerSetInSeconds" INT4,
    "recommendedRepetitions" INT4,

    CONSTRAINT "ScheduledWorkoutExercise_pkey" PRIMARY KEY ("scheduledWorkoutUserId","scheduledWorkoutOrderNumber","orderNumber")
);

-- CreateTable
CREATE TABLE "ActiveWorkout" (
    "userId" UUID NOT NULL,
    "nickname" STRING NOT NULL,
    "scheduleDayOrderNumber" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActiveWorkout_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ActiveWorkoutExercise" (
    "userId" UUID NOT NULL,
    "scheduledWorkoutOrderNumber" INT4 NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "exerciseId" UUID NOT NULL,

    CONSTRAINT "ActiveWorkoutExercise_pkey" PRIMARY KEY ("userId","orderNumber")
);

-- CreateTable
CREATE TABLE "ActiveWorkoutExerciseSet" (
    "workoutExerciseUserId" UUID NOT NULL,
    "workoutExerciseOrderNumber" INT4 NOT NULL,
    "resistanceInPounds" INT4,
    "repetitions" INT4,
    "timeInSeconds" INT4,
    "complete" BOOL NOT NULL,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "ActiveWorkoutExerciseSet_pkey" PRIMARY KEY ("workoutExerciseUserId","workoutExerciseOrderNumber","orderNumber")
);

-- CreateTable
CREATE TABLE "ActiveWorkoutCheckin" (
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutUserId" UUID NOT NULL,

    CONSTRAINT "ActiveWorkoutCheckin_pkey" PRIMARY KEY ("at")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledWorkout_userId_orderNumber_key" ON "ScheduledWorkout"("userId", "orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveWorkout_userId_scheduleDayOrderNumber_key" ON "ActiveWorkout"("userId", "scheduleDayOrderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ActiveWorkoutExercise_userId_scheduledWorkoutOrderNumber_or_key" ON "ActiveWorkoutExercise"("userId", "scheduledWorkoutOrderNumber", "orderNumber");

-- CreateIndex
CREATE INDEX "ActiveWorkoutCheckin_at_idx" ON "ActiveWorkoutCheckin"("at" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "FinishedWorkout_startedAt_key" ON "FinishedWorkout"("startedAt");

-- CreateIndex
CREATE INDEX "FinishedWorkout_startedAt_idx" ON "FinishedWorkout"("startedAt" DESC);

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutExercise" ADD CONSTRAINT "ScheduledWorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutExercise" ADD CONSTRAINT "ScheduledWorkoutExercise_scheduledWorkoutUserId_scheduledW_fkey" FOREIGN KEY ("scheduledWorkoutUserId", "scheduledWorkoutOrderNumber") REFERENCES "ScheduledWorkout"("userId", "orderNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkout" ADD CONSTRAINT "ActiveWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkout" ADD CONSTRAINT "ActiveWorkout_userId_scheduleDayOrderNumber_fkey" FOREIGN KEY ("userId", "scheduleDayOrderNumber") REFERENCES "ScheduledWorkout"("userId", "orderNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutExercise" ADD CONSTRAINT "ActiveWorkoutExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ActiveWorkout"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutExercise" ADD CONSTRAINT "ActiveWorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutExercise" ADD CONSTRAINT "ActiveWorkoutExercise_userId_scheduledWorkoutOrderNumber_o_fkey" FOREIGN KEY ("userId", "scheduledWorkoutOrderNumber", "orderNumber") REFERENCES "ScheduledWorkoutExercise"("scheduledWorkoutUserId", "scheduledWorkoutOrderNumber", "orderNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutExerciseSet" ADD CONSTRAINT "ActiveWorkoutExerciseSet_workoutExerciseUserId_workoutExer_fkey" FOREIGN KEY ("workoutExerciseUserId", "workoutExerciseOrderNumber") REFERENCES "ActiveWorkoutExercise"("userId", "orderNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutCheckin" ADD CONSTRAINT "ActiveWorkoutCheckin_workoutUserId_fkey" FOREIGN KEY ("workoutUserId") REFERENCES "ActiveWorkout"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
