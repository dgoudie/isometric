/*
  Warnings:

  - Made the column `scheduleId` on table `ScheduleDay` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ScheduleDay" DROP CONSTRAINT "ScheduleDay_scheduleId_fkey";

-- AlterTable
ALTER TABLE "ScheduleDay" ALTER COLUMN "scheduleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ScheduleDay" ADD CONSTRAINT "ScheduleDay_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
