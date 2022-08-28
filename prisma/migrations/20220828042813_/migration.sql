-- CreateEnum
CREATE TYPE "ExerciseMuscleGroup" AS ENUM ('shoulders', 'chest', 'forearms', 'obliques', 'quads', 'cardio', 'biceps', 'abs', 'adductors', 'traps', 'triceps', 'abductors', 'hamstrings', 'calves', 'lats', 'glutes', 'lower_back');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('weighted', 'assisted', 'rep_based', 'timed');

-- CreateTable
CREATE TABLE "User" (
    "userId" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Setting" (
    "userId" UUID NOT NULL,
    "key" STRING NOT NULL,
    "setting" JSONB NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("userId","key")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" STRING NOT NULL,
    "primaryMuscleGroup" "ExerciseMuscleGroup" NOT NULL,
    "secondaryMuscleGroups" "ExerciseMuscleGroup"[],
    "exerciseType" "ExerciseType" NOT NULL,
    "setCount" INT4 NOT NULL,
    "minimumRecommendedRepetitions" INT4,
    "maximumRecommendedRepetitions" INT4,
    "timePerSetInSeconds" INT4,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

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
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "scheduledWorkoutId" UUID NOT NULL,
    "exerciseId" UUID NOT NULL,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "ScheduledWorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActiveWorkout" (
    "userId" UUID NOT NULL,
    "nickname" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "ActiveWorkout_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ActiveWorkoutExercise" (
    "userId" UUID NOT NULL,
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

-- CreateTable
CREATE TABLE "FinishedWorkout" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nickname" STRING NOT NULL,
    "durationInSeconds" INT4 NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinishedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedWorkoutExercise" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "finishedWorkoutId" UUID NOT NULL,
    "name" STRING NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL,
    "primaryMuscleGroup" "ExerciseMuscleGroup" NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "exerciseId" UUID,

    CONSTRAINT "FinishedWorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedWorkoutExerciseSet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "finishedWorkoutExerciseId" UUID NOT NULL,
    "resistanceInPounds" INT4,
    "repetitions" INT4,
    "timeInSeconds" INT4,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "FinishedWorkoutExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_userId_name_key" ON "Exercise"("userId", "name" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledWorkout_userId_orderNumber_key" ON "ScheduledWorkout"("userId", "orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledWorkoutExercise_scheduledWorkoutId_orderNumber_key" ON "ScheduledWorkoutExercise"("scheduledWorkoutId", "orderNumber");

-- CreateIndex
CREATE INDEX "ActiveWorkoutCheckin_at_idx" ON "ActiveWorkoutCheckin"("at" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "FinishedWorkout_endedAt_key" ON "FinishedWorkout"("endedAt");

-- CreateIndex
CREATE UNIQUE INDEX "FinishedWorkout_startedAt_key" ON "FinishedWorkout"("startedAt");

-- CreateIndex
CREATE INDEX "FinishedWorkout_startedAt_idx" ON "FinishedWorkout"("startedAt" DESC);

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkout" ADD CONSTRAINT "ScheduledWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutExercise" ADD CONSTRAINT "ScheduledWorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledWorkoutExercise" ADD CONSTRAINT "ScheduledWorkoutExercise_scheduledWorkoutId_fkey" FOREIGN KEY ("scheduledWorkoutId") REFERENCES "ScheduledWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkout" ADD CONSTRAINT "ActiveWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutExercise" ADD CONSTRAINT "ActiveWorkoutExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ActiveWorkout"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutExercise" ADD CONSTRAINT "ActiveWorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutExerciseSet" ADD CONSTRAINT "ActiveWorkoutExerciseSet_workoutExerciseUserId_workoutExer_fkey" FOREIGN KEY ("workoutExerciseUserId", "workoutExerciseOrderNumber") REFERENCES "ActiveWorkoutExercise"("userId", "orderNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActiveWorkoutCheckin" ADD CONSTRAINT "ActiveWorkoutCheckin_workoutUserId_fkey" FOREIGN KEY ("workoutUserId") REFERENCES "ActiveWorkout"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkout" ADD CONSTRAINT "FinishedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExercise" ADD CONSTRAINT "FinishedWorkoutExercise_finishedWorkoutId_fkey" FOREIGN KEY ("finishedWorkoutId") REFERENCES "FinishedWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExercise" ADD CONSTRAINT "FinishedWorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExerciseSet" ADD CONSTRAINT "FinishedWorkoutExerciseSet_finishedWorkoutExerciseId_fkey" FOREIGN KEY ("finishedWorkoutExerciseId") REFERENCES "FinishedWorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
