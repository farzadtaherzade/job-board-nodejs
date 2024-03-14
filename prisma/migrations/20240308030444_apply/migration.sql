/*
  Warnings:

  - You are about to drop the column `short_description` on the `company` table. All the data in the column will be lost.
  - Added the required column `description` to the `company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `job_resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "short_description",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "job_resume" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "job_resume" ADD CONSTRAINT "job_resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
