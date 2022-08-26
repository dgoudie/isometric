-- CreateEnum
CREATE TYPE "ExerciseMuscleGroup" AS ENUM ('shoulders', 'chest', 'forearms', 'obliques', 'quads', 'cardio', 'biceps', 'abs', 'adductors', 'traps', 'triceps', 'abductors', 'hamstrings', 'calves', 'lats', 'glutes', 'lower_back');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('weighted', 'assisted', 'rep_based', 'timed');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "primaryMuscleGroup" "ExerciseMuscleGroup" NOT NULL,
    "secondaryMuscleGroups" "ExerciseMuscleGroup"[],
    "exerciseType" "ExerciseType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleDay" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nickname" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduleDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseInSchedule" (
    "exerciseId" UUID NOT NULL,
    "scheduleDayUser" STRING NOT NULL,
    "scheduleDayOrderNumber" INT4 NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "setCount" INT4 NOT NULL,
    "timePerSetInSeconds" INT4,
    "recommendedRepetitions" INT4,

    CONSTRAINT "ExerciseInSchedule_pkey" PRIMARY KEY ("scheduleDayUser","scheduleDayOrderNumber","orderNumber")
);

-- CreateTable
CREATE TABLE "Workout" (
    "userId" STRING NOT NULL,
    "dayNumber" INT4 NOT NULL,
    "nickname" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "exerciseType" "ExerciseType" NOT NULL,
    "primaryMuscleGroup" "ExerciseMuscleGroup" NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "workoutUserId" STRING NOT NULL,
    "exerciseId" UUID NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("workoutUserId","orderNumber")
);

-- CreateTable
CREATE TABLE "WorkoutExerciseSet" (
    "workoutExerciseUserId" STRING NOT NULL,
    "workoutExerciseOrderNumber" INT4 NOT NULL,
    "resistanceInPounds" INT4,
    "repetitions" INT4,
    "timeInSeconds" INT4,
    "complete" BOOL NOT NULL,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "WorkoutExerciseSet_pkey" PRIMARY KEY ("workoutExerciseUserId","workoutExerciseOrderNumber","orderNumber")
);

-- CreateTable
CREATE TABLE "WorkoutCheckin" (
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutUserId" STRING NOT NULL,

    CONSTRAINT "WorkoutCheckin_pkey" PRIMARY KEY ("at")
);

-- CreateTable
CREATE TABLE "FinishedWorkout" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" STRING NOT NULL,
    "dayNumber" INT4 NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "nickname" STRING NOT NULL,
    "durationInSeconds" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_userId_name_key" ON "Exercise"("userId", "name" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleDay_userId_orderNumber_key" ON "ScheduleDay"("userId", "orderNumber");

-- CreateIndex
CREATE INDEX "WorkoutCheckin_at_idx" ON "WorkoutCheckin"("at" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "FinishedWorkout_endedAt_key" ON "FinishedWorkout"("endedAt");

-- CreateIndex
CREATE UNIQUE INDEX "FinishedWorkout_createdAt_key" ON "FinishedWorkout"("createdAt");

-- CreateIndex
CREATE INDEX "FinishedWorkout_createdAt_idx" ON "FinishedWorkout"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDay" ADD CONSTRAINT "ScheduleDay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInSchedule" ADD CONSTRAINT "ExerciseInSchedule_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInSchedule" ADD CONSTRAINT "ExerciseInSchedule_scheduleDayUser_scheduleDayOrderNumber_fkey" FOREIGN KEY ("scheduleDayUser", "scheduleDayOrderNumber") REFERENCES "ScheduleDay"("userId", "orderNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutUserId_fkey" FOREIGN KEY ("workoutUserId") REFERENCES "Workout"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseSet" ADD CONSTRAINT "WorkoutExerciseSet_workoutExerciseUserId_workoutExerciseOr_fkey" FOREIGN KEY ("workoutExerciseUserId", "workoutExerciseOrderNumber") REFERENCES "WorkoutExercise"("workoutUserId", "orderNumber") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutCheckin" ADD CONSTRAINT "WorkoutCheckin_workoutUserId_fkey" FOREIGN KEY ("workoutUserId") REFERENCES "Workout"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkout" ADD CONSTRAINT "FinishedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExercise" ADD CONSTRAINT "FinishedWorkoutExercise_finishedWorkoutId_fkey" FOREIGN KEY ("finishedWorkoutId") REFERENCES "FinishedWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExercise" ADD CONSTRAINT "FinishedWorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExerciseSet" ADD CONSTRAINT "FinishedWorkoutExerciseSet_finishedWorkoutExerciseId_fkey" FOREIGN KEY ("finishedWorkoutExerciseId") REFERENCES "FinishedWorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
