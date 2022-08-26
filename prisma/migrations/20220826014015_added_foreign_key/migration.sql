-- AlterTable
ALTER TABLE "FinishedWorkoutExercise" ADD COLUMN     "exerciseId" INT4;

-- AddForeignKey
ALTER TABLE "FinishedWorkoutExercise" ADD CONSTRAINT "FinishedWorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
