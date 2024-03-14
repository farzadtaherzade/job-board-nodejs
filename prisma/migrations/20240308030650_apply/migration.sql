/*
  Warnings:

  - You are about to drop the column `company_image` on the `company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "company" DROP COLUMN "company_image",
ADD COLUMN     "logo" TEXT;
