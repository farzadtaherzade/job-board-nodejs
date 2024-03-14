/*
  Warnings:

  - The `status` column on the `job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `userId` on the `job_resume` table. All the data in the column will be lost.
  - The `status` column on the `job_resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `employerId` to the `job_resume` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "JobRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "job_resume" DROP CONSTRAINT "job_resume_userId_fkey";

-- AlterTable
ALTER TABLE "job" DROP COLUMN "status",
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'OPEN',
ALTER COLUMN "salary" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "job_resume" DROP COLUMN "userId",
ADD COLUMN     "employerId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "JobRequestStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "CompanyRequestResponse" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "companyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyRequestResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyRequestResponse" ADD CONSTRAINT "CompanyRequestResponse_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_resume" ADD CONSTRAINT "job_resume_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
