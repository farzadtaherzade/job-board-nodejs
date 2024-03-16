/*
  Warnings:

  - You are about to drop the column `education_required` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `instantaneous` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `open` on the `job` table. All the data in the column will be lost.
  - Added the required column `experience` to the `job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_desc` to the `job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `job` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `salary` on the `job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('FULLTIME', 'PARTTIME', 'INTERSHIP', 'JOBSEEKER');

-- CreateEnum
CREATE TYPE "Experience" AS ENUM ('JUNIOR', 'MIDLEVEL', 'SENIOR');

-- AlterTable
ALTER TABLE "job" DROP COLUMN "education_required",
DROP COLUMN "instantaneous",
DROP COLUMN "open",
ADD COLUMN     "experience" "Experience" NOT NULL,
ADD COLUMN     "short_desc" VARCHAR(150) NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL,
DROP COLUMN "salary",
ADD COLUMN     "salary" INTEGER NOT NULL;
