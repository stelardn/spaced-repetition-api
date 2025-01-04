/*
  Warnings:

  - You are about to drop the column `lessonId` on the `Revision` table. All the data in the column will be lost.
  - Added the required column `lesson_id` to the `Revision` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Revision" DROP CONSTRAINT "Revision_lessonId_fkey";

-- AlterTable
ALTER TABLE "Revision" RENAME COLUMN "lessonId" TO "lesson_id";

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
