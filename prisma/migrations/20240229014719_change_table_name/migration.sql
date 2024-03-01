/*
  Warnings:

  - You are about to drop the `job_seeker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "job_seeker" DROP CONSTRAINT "job_seeker_userId_fkey";

-- DropTable
DROP TABLE "job_seeker";

-- CreateTable
CREATE TABLE "resume" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "eduction" TEXT,
    "profile_image" TEXT,
    "resume" TEXT,
    "skills" TEXT[],
    "address" TEXT,
    "projects" TEXT[],
    "desired_job_title" TEXT,
    "location" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "resume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resume_userId_key" ON "resume"("userId");

-- AddForeignKey
ALTER TABLE "resume" ADD CONSTRAINT "resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
