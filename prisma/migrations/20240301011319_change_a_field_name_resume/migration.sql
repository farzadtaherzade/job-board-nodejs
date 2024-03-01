/*
  Warnings:

  - You are about to drop the column `address` on the `resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resume" DROP COLUMN "address",
ADD COLUMN     "neighbourhood" TEXT;
