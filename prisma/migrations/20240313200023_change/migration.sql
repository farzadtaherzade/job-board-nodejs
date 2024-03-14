/*
  Warnings:

  - Added the required column `work_days` to the `job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `salary` on the `job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `companyId` to the `job_resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `job_resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job" ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "open" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "work_days" TEXT NOT NULL,
DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT false;

-- AlterTable
ALTER TABLE "job_resume" ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "message" TEXT,
ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "job_resume" ADD CONSTRAINT "job_resume_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
