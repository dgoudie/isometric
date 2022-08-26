-- DropForeignKey
ALTER TABLE "FinishedWorkoutExercise" DROP CONSTRAINT "FinishedWorkoutExercise_finishedWorkoutId_fkey";

-- DropForeignKey
ALTER TABLE "FinishedWorkoutExerciseSet" DROP CONSTRAINT "FinishedWorkoutExerciseSet_finishedWorkoutExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutCheckin" DROP CONSTRAINT "WorkoutCheckin_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutExerciseSet" DROP CONSTRAINT "WorkoutExerciseSet_workoutExerciseId_fkey";

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExerciseSet" ADD CONSTRAINT "WorkoutExerciseSet_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutCheckin" ADD CONSTRAINT "WorkoutCheckin_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExercise" ADD CONSTRAINT "FinishedWorkoutExercise_finishedWorkoutId_fkey" FOREIGN KEY ("finishedWorkoutId") REFERENCES "FinishedWorkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExerciseSet" ADD CONSTRAINT "FinishedWorkoutExerciseSet_finishedWorkoutExerciseId_fkey" FOREIGN KEY ("finishedWorkoutExerciseId") REFERENCES "FinishedWorkoutExercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
