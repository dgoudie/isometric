/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "FinishedWorkoutExercise" DROP CONSTRAINT "FinishedWorkoutExercise_name_fkey";

-- DropIndex
DROP INDEX "Exercise_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_userId_name_key" ON "Exercise"("userId", "name" ASC);
