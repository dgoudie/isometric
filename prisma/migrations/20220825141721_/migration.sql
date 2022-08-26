/*
  Warnings:

  - Made the column `durationInSeconds` on table `FinishedWorkout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FinishedWorkout" ALTER COLUMN "durationInSeconds" SET NOT NULL;
