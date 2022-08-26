-- CreateEnum
CREATE TYPE "ExerciseMuscleGroup" AS ENUM ('shoulders', 'chest', 'forearms', 'obliques', 'quads', 'cardio', 'biceps', 'abs', 'adductors', 'traps', 'triceps', 'abductors', 'hamstrings', 'calves', 'lats', 'glutes', 'lower_back');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('weighted', 'assisted', 'rep_based', 'timed');

-- CreateTable
CREATE TABLE "User" (
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutId" INT4 NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "userId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "breakTimeInSeconds" INT4 NOT NULL,
    "setCount" INT4 NOT NULL,
    "timePerSetInSeconds" INT4,
    "minimumRecommendedRepetitions" INT4,
    "maximumRecommendedRepetitions" INT4,
    "primaryMuscleGroup" "ExerciseMuscleGroup" NOT NULL,
    "secondaryMuscleGroups" "ExerciseMuscleGroup"[],
    "exerciseType" "ExerciseType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "userId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleDay" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "nickname" STRING NOT NULL,
    "scheduleId" INT4,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "ScheduleDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseInSchedule" (
    "exerciseId" INT4 NOT NULL,
    "scheduleDayId" INT4 NOT NULL,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "ExerciseInSchedule_pkey" PRIMARY KEY ("exerciseId","scheduleDayId")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "userId" STRING NOT NULL,
    "dayNumber" INT4 NOT NULL,
    "nickname" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "workoutId" INT4 NOT NULL,
    "exerciseId" INT4 NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL,
    "primaryMuscleGroup" "ExerciseMuscleGroup" NOT NULL,
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutExerciseSet" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "workoutExerciseId" INT4 NOT NULL,
    "resistanceInPounds" INT4,
    "repetitions" INT4,
    "timeInSeconds" INT4,
    "complete" BOOL NOT NULL,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "WorkoutExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutCheckin" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutId" INT4 NOT NULL,

    CONSTRAINT "WorkoutCheckin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedWorkout" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "userId" STRING NOT NULL,
    "dayNumber" INT4 NOT NULL,
    "endedAt" TIMESTAMP(3) NOT NULL,
    "nickname" STRING NOT NULL,
    "durationInSeconds" INT4,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FinishedWorkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedWorkoutExercise" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "finishedWorkoutId" INT4 NOT NULL,
    "name" STRING NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL,
    "primaryMuscleGroup" "ExerciseMuscleGroup" NOT NULL,
    "orderNumber" INT4 NOT NULL,
    "workoutId" INT4,

    CONSTRAINT "FinishedWorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinishedWorkoutExerciseSet" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "finishedWorkoutExerciseId" INT4 NOT NULL,
    "resistanceInPounds" INT4,
    "repetitions" INT4,
    "timeInSeconds" INT4,
    "orderNumber" INT4 NOT NULL,

    CONSTRAINT "FinishedWorkoutExerciseSet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_key" ON "Exercise"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_userId_key" ON "Schedule"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ScheduleDay_scheduleId_orderNumber_key" ON "ScheduleDay"("scheduleId", "orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseInSchedule_exerciseId_orderNumber_key" ON "ExerciseInSchedule"("exerciseId", "orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_userId_key" ON "Workout"("userId");

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleDay" ADD CONSTRAINT "ScheduleDay_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInSchedule" ADD CONSTRAINT "ExerciseInSchedule_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseInSchedule" ADD CONSTRAINT "ExerciseInSchedule_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "ScheduleDay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseSet" ADD CONSTRAINT "WorkoutExerciseSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutCheckin" ADD CONSTRAINT "WorkoutCheckin_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkout" ADD CONSTRAINT "FinishedWorkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExercise" ADD CONSTRAINT "FinishedWorkoutExercise_finishedWorkoutId_fkey" FOREIGN KEY ("finishedWorkoutId") REFERENCES "FinishedWorkout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExercise" ADD CONSTRAINT "FinishedWorkoutExercise_name_fkey" FOREIGN KEY ("name") REFERENCES "Exercise"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExerciseSet" ADD CONSTRAINT "FinishedWorkoutExerciseSet_finishedWorkoutExerciseId_fkey" FOREIGN KEY ("finishedWorkoutExerciseId") REFERENCES "FinishedWorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;