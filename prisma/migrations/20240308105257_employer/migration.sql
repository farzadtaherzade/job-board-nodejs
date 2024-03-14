/*
  Warnings:

  - Added the required column `age` to the `employer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employer" ADD COLUMN     "age" INTEGER NOT NULL;
