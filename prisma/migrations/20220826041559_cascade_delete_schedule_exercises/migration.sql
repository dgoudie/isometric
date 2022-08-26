-- DropForeignKey
ALTER TABLE "ExerciseInSchedule" DROP CONSTRAINT "ExerciseInSchedule_scheduleDayId_fkey";

-- AddForeignKey
ALTER TABLE "ExerciseInSchedule" ADD CONSTRAINT "ExerciseInSchedule_scheduleDayId_fkey" FOREIGN KEY ("scheduleDayId") REFERENCES "ScheduleDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
